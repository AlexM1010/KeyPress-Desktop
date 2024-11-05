// app.go

package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/go-vgo/robotgo"
	"github.com/supabase-community/auth-go"
	"github.com/supabase-community/auth-go/types"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// AuthStore manages authentication state
type AuthStore struct {
	mu            sync.RWMutex
	currentUser   *types.UserResponse
	isInitialized bool
}

// App represents the Wails application.
type App struct {
	ctx          context.Context
	authClient   auth.Client
	authStore    *AuthStore
	taskQueue    *TaskQueue
	isExecuting  bool
	execMutex    sync.Mutex
	completed    map[string]bool
	completedMux sync.Mutex
	dependencies map[string][]string
	nodeMap      map[string]Node
	notifyCh     chan string
}

// Node represents a single node in the flowchart.
type Node struct {
	ID       string                 `json:"id"`
	Type     string                 `json:"type"` // "Start", "MoveMouse", "Click"
	Data     map[string]interface{} `json:"data"`
	Position map[string]float64     `json:"position"`
}

// Edge represents a connection between two nodes.
type Edge struct {
	ID     string `json:"id"`
	Source string `json:"source"`
	Target string `json:"target"`
}

// Flowchart represents the entire flowchart with nodes and edges.
type Flowchart struct {
	Nodes []Node `json:"nodes"`
	Edges []Edge `json:"edges"`
}

// Task represents a single executable task.
type Task struct {
	ID   string
	Type string
	Data map[string]interface{}
}

// TaskQueue manages the queue of tasks to be executed.
type TaskQueue struct {
	tasks   chan Task
	wg      sync.WaitGroup
	ctx     context.Context
	cancel  context.CancelFunc
	started bool
	mutex   sync.Mutex
	app     *App
}

// NewApp creates a new App application struct with AuthStore
func NewApp() *App {
	authClient := auth.New(
		"fuobfyypdlixgvwzrvoy", // Supabase URL
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1b2JmeXlwZGxpeGd2d3pydm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MjAyOTQsImV4cCI6MjA0Mzk5NjI5NH0.qJv20Jw7E8F0OJR_-AwWOw8Mal0pbthtHddKhzo3afk",
	)
	return &App{
		authClient:   authClient,
		authStore:    &AuthStore{},
		taskQueue:    NewTaskQueue(nil, 100),
		completed:    make(map[string]bool),
		notifyCh:     make(chan string, 100),
		dependencies: make(map[string][]string),
	}
}

// EmitAuthState sends the current auth state to frontend
func (a *App) emitAuthState() {
	a.authStore.mu.RLock()
	defer a.authStore.mu.RUnlock()

	authState := map[string]interface{}{
		"user":          a.authStore.currentUser,
		"isInitialized": a.authStore.isInitialized,
	}

	// Emit the auth state change event to frontend
	runtime.EventsEmit(a.ctx, "auth:stateChange", authState)
}

// Initialize auth state on startup
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.authStore.isInitialized = true
	a.emitAuthState()
	a.taskQueue.app = a  // Set the app reference in TaskQueue
	a.taskQueue.Start(3) // Start 3 workers by default
}

// SignIn with updated store management
func (a *App) SignIn(email, password string) (*types.TokenResponse, error) {
	response, err := a.authClient.SignInWithEmailPassword(email, password)
	if err != nil {
		return nil, fmt.Errorf("signin failed: %w", err)
	}

	// Get user details with the new token
	authedClient := a.authClient.WithToken(response.AccessToken)
	user, err := authedClient.GetUser()
	if err != nil {
		return nil, fmt.Errorf("get user failed: %w", err)
	}

	// Update store
	a.authStore.mu.Lock()
	a.authStore.currentUser = user
	a.authStore.mu.Unlock()

	// Emit state change
	a.emitAuthState()

	return response, nil
}

// SignOut with store update
func (a *App) SignOut(token string) error {
	authedClient := a.authClient.WithToken(token)

	err := authedClient.Logout()
	if err != nil {
		return fmt.Errorf("signout failed: %w", err)
	}

	// Clear store
	a.authStore.mu.Lock()
	a.authStore.currentUser = nil
	a.authStore.mu.Unlock()

	// Emit state change
	a.emitAuthState()

	return nil
}

// GetAuthState returns current auth state
func (a *App) GetAuthState() map[string]interface{} {
	a.authStore.mu.RLock()
	defer a.authStore.mu.RUnlock()

	return map[string]interface{}{
		"user":          a.authStore.currentUser,
		"isInitialized": a.authStore.isInitialized,
	}
}

// InitializeFromToken initializes the auth state from a stored token
func (a *App) InitializeFromToken(token string) error {
	if token == "" {
		a.authStore.mu.Lock()
		a.authStore.currentUser = nil
		a.authStore.mu.Unlock()
		a.emitAuthState()
		return nil
	}

	authedClient := a.authClient.WithToken(token)
	user, err := authedClient.GetUser()
	if err != nil {
		return fmt.Errorf("initialize from token failed: %w", err)
	}

	a.authStore.mu.Lock()
	a.authStore.currentUser = user
	a.authStore.mu.Unlock()

	a.emitAuthState()
	return nil
}

//=============================================== Flow Execution ===============================================

// NewTaskQueue initializes a new TaskQueue.
func NewTaskQueue(app *App, bufferSize int) *TaskQueue {
	ctx, cancel := context.WithCancel(context.Background())
	return &TaskQueue{
		tasks:  make(chan Task, bufferSize),
		ctx:    ctx,
		cancel: cancel,
		app:    app,
	}
}

// Start initializes worker goroutines to process tasks.
func (q *TaskQueue) Start(workerCount int) {
	q.mutex.Lock()
	defer q.mutex.Unlock()
	if q.started {
		return
	}
	q.started = true
	for i := 0; i < workerCount; i++ {
		q.wg.Add(1)
		go q.worker(i)
	}
	log.Printf("TaskQueue started with %d workers", workerCount)
}

// worker processes tasks from the queue.
func (q *TaskQueue) worker(workerID int) {
	defer q.wg.Done()
	log.Printf("Worker %d started", workerID)
	for {
		select {
		case task, ok := <-q.tasks:
			if !ok {
				log.Printf("Worker %d stopping: task channel closed", workerID)
				return
			}
			log.Printf("Worker %d processing task %s of type %s", workerID, task.ID, task.Type)
			q.app.emitEvent("task-started", task.ID)
			executeTask(task, q.app)
			q.app.emitEvent("task-completed", task.ID)
			// Notify task completion for dependency handling
			q.app.notifyTaskCompletion(task.ID)
		case <-q.ctx.Done():
			log.Printf("Worker %d stopping: context canceled", workerID)
			return
		}
	}
}

// Enqueue adds a task to the queue.
func (q *TaskQueue) Enqueue(task Task) {
	select {
	case q.tasks <- task:
		log.Printf("Enqueued task %s of type %s", task.ID, task.Type)
	case <-q.ctx.Done():
		log.Println("Task queue is closed. Cannot enqueue task:", task.ID)
	}
}

// Stop gracefully shuts down the task queue.
func (q *TaskQueue) Stop() {
	q.mutex.Lock()
	defer q.mutex.Unlock()
	if !q.started {
		return
	}
	q.cancel()
	close(q.tasks)
	q.wg.Wait()
	q.started = false
	log.Println("TaskQueue has been stopped")
}

// executeTask performs the action based on the task type.
func executeTask(task Task, app *App) {
	log.Printf("Starting execution of task ID: %s, Type: %s", task.ID, task.Type)
	defer func() {
		if r := recover(); r != nil {
			log.Printf("Recovered from panic in task %s: %v", task.ID, r)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  fmt.Sprintf("panic: %v", r),
			})
		}
		log.Printf("Completed execution of task ID: %s", task.ID)
	}()

	switch task.Type {
	case "Start":
		log.Printf("Flow Started - Task ID: %s", task.ID)
		app.emitEvent("task-success", map[string]interface{}{
			"taskID": task.ID,
			"type":   "Start",
		})

	case "MoveMouse":
		log.Printf("MoveMouse task starting - Data: %+v", task.Data)
		x, ok1 := task.Data["x"].(float64)
		y, ok2 := task.Data["y"].(float64)
		if !ok1 || !ok2 {
			err := fmt.Sprintf("Invalid coordinates - x: %v, y: %v", task.Data["x"], task.Data["y"])
			log.Printf("MoveMouse error: %s for task %s", err, task.ID)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  err,
			})
			return
		}
		log.Printf("Moving mouse to x: %v, y: %v", x, y)
		robotgo.Move(int(x), int(y))
		time.Sleep(100 * time.Millisecond)
		app.emitEvent("task-success", map[string]interface{}{
			"taskID": task.ID,
			"type":   "MoveMouse",
		})

	case "Click":
		log.Printf("Click task starting - Data: %+v", task.Data)

		// Get buttonType
		buttonType, ok := task.Data["buttonType"].(string)
		if !ok {
			err := fmt.Sprintf("Invalid buttonType value: %v", task.Data["buttonType"])
			log.Printf("Click error: %s for task %s", err, task.ID)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  err,
			})
			return
		}

		// Map buttonType to robotgo button
		var button string
		switch buttonType {
		case "Left Click":
			button = "left"
		case "Right Click":
			button = "right"
		case "Middle Click":
			button = "middle"
		default:
			err := fmt.Sprintf("Unsupported buttonType: %s", buttonType)
			log.Printf("Click error: %s for task %s", err, task.ID)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  err,
			})
			return
		}

		// Get actionType
		actionType, ok := task.Data["actionType"].(string)
		if !ok {
			err := fmt.Sprintf("Invalid actionType value: %v", task.Data["actionType"])
			log.Printf("Click error: %s for task %s", err, task.ID)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  err,
			})
			return
		}

		// Get clickDuration
		clickDurationFloat, ok := task.Data["clickDuration"].(float64)
		if !ok {
			err := fmt.Sprintf("Invalid clickDuration value: %v", task.Data["clickDuration"])
			log.Printf("Click error: %s for task %s", err, task.ID)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  err,
			})
			return
		}
		clickDuration := time.Duration(clickDurationFloat) * time.Millisecond

		// Perform the click action
		switch actionType {
		case "Single":
			log.Printf("Performing single %s click with duration %v", buttonType, clickDuration)
			robotgo.Click(button)
			time.Sleep(clickDuration)
		case "Double":
			log.Printf("Performing double %s click with duration %v", buttonType, clickDuration)
			for i := 0; i < 2; i++ {
				robotgo.Click(button)
				time.Sleep(clickDuration)
			}
		case "Triple":
			log.Printf("Performing triple %s click with duration %v", buttonType, clickDuration)
			for i := 0; i < 3; i++ {
				robotgo.Click(button)
				time.Sleep(clickDuration)
			}
		case "Hold":
			log.Printf("Performing %s hold with duration %v", buttonType, clickDuration)
			robotgo.MouseDown(button)
			time.Sleep(clickDuration)
			robotgo.MouseUp(button)
		default:
			err := fmt.Sprintf("Unsupported actionType: %s", actionType)
			log.Printf("Click error: %s for task %s", err, task.ID)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  err,
			})
			return
		}

		app.emitEvent("task-success", map[string]interface{}{
			"taskID": task.ID,
			"type":   "Click",
		})

	case "TypeString":
		log.Printf("TypeString task starting - Data: %+v", task.Data)
		text, ok := task.Data["text"].(string)
		if !ok {
			err := fmt.Sprintf("Invalid text value: %v", task.Data["text"])
			log.Printf("TypeString error: %s for task %s", err, task.ID)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  err,
			})
			return
		}
		log.Printf("Typing text: %s", text)
		robotgo.TypeStr(text)
		time.Sleep(100 * time.Millisecond)
		app.emitEvent("task-success", map[string]interface{}{
			"taskID": task.ID,
			"type":   "TypeString",
		})

	case "KeyTap":
		log.Printf("KeyTap task starting - Data: %+v", task.Data)
		key, ok := task.Data["key"].(string)
		if !ok {
			err := fmt.Sprintf("Invalid key value: %v", task.Data["key"])
			log.Printf("KeyTap error: %s for task %s", err, task.ID)
			app.emitEvent("task-error", map[string]interface{}{
				"taskID": task.ID,
				"error":  err,
			})
			return
		}
		log.Printf("Tapping key: %s", key)
		robotgo.KeyTap(key)
		time.Sleep(100 * time.Millisecond)
		app.emitEvent("task-success", map[string]interface{}{
			"taskID": task.ID,
			"type":   "KeyTap",
		})

	default:
		err := fmt.Sprintf("Unknown task type: %s", task.Type)
		log.Printf("%s for task %s", err, task.ID)
		app.emitEvent("task-error", map[string]interface{}{
			"taskID": task.ID,
			"error":  err,
		})
	}
}

// StartExecution receives the flowchart data and starts execution.
func (a *App) StartExecution(flow string) error {
	a.execMutex.Lock()
	defer a.execMutex.Unlock()

	if a.isExecuting {
		log.Println("StartExecution called but execution is already in progress")
		return errors.New("execution already in progress")
	}
	a.isExecuting = true
	log.Println("Execution started")
	defer func() {
		if r := recover(); r != nil {
			a.setExecuting(false)
			log.Printf("Recovered from panic in StartExecution: %v", r)
			a.emitEvent("execution-error", fmt.Sprintf("panic: %v", r))
		}
	}()

	var flowchart Flowchart
	err := json.Unmarshal([]byte(flow), &flowchart)
	if err != nil {
		a.isExecuting = false
		log.Printf("Failed to unmarshal flowchart: %v", err)
		return fmt.Errorf("invalid flowchart data: %w", err)
	}

	// Validate flowchart
	if len(flowchart.Nodes) == 0 {
		a.isExecuting = false
		log.Println("Flowchart validation failed: no nodes found")
		return errors.New("flowchart must contain at least one node")
	}

	// Build node map for easy access
	a.nodeMap = make(map[string]Node)
	for _, node := range flowchart.Nodes {
		a.nodeMap[node.ID] = node
	}

	// Filter out unconnected nodes
	connectedNodeIDs := make(map[string]bool)
	for _, edge := range flowchart.Edges {
		connectedNodeIDs[edge.Source] = true
		connectedNodeIDs[edge.Target] = true
	}

	connectedNodeMap := make(map[string]Node)
	for id := range connectedNodeIDs {
		if node, exists := a.nodeMap[id]; exists {
			connectedNodeMap[id] = node
		}
	}
	a.nodeMap = connectedNodeMap

	// Build dependencies
	a.dependencies = make(map[string][]string)
	for _, edge := range flowchart.Edges {
		a.dependencies[edge.Source] = append(a.dependencies[edge.Source], edge.Target)
	}

	// Initialize completed map
	a.completedMux.Lock()
	a.completed = make(map[string]bool)
	a.completedMux.Unlock()

	// Enqueue initial tasks (StartNode)
	startNode, err := a.findStartNode(flowchart.Nodes)
	if err != nil {
		a.isExecuting = false
		log.Printf("StartExecution failed: %v", err)
		return err
	}

	task := Task{
		ID:   startNode.ID,
		Type: startNode.Type,
		Data: startNode.Data,
	}
	a.taskQueue.Enqueue(task)

	// Start a goroutine to handle task completions
	go a.handleCompletions()

	return nil
}

// findStartNode locates the StartNode in the flowchart.
func (a *App) findStartNode(nodes []Node) (Node, error) {
	for _, node := range nodes {
		if node.Type == "Start" {
			return node, nil
		}
	}
	return Node{}, errors.New("no Start node found in flowchart")
}

// notifyTaskCompletion is called by TaskQueue workers when a task is completed.
func (a *App) notifyTaskCompletion(taskID string) {
	select {
	case a.notifyCh <- taskID:
		log.Printf("Task %s completion notified", taskID)
	default:
		log.Printf("Notification channel full. Unable to notify completion of task %s", taskID)
	}
}

// handleCompletions listens for completed tasks and enqueues dependent tasks.
func (a *App) handleCompletions() {
	for {
		select {
		case taskID := <-a.notifyCh:
			a.completedMux.Lock()
			a.completed[taskID] = true
			a.completedMux.Unlock()
			log.Printf("Task %s marked as completed", taskID)

			// Find dependent tasks
			dependents := a.dependencies[taskID]
			for _, depID := range dependents {
				if a.canEnqueue(depID) {
					node, exists := a.nodeMap[depID]
					if !exists {
						log.Printf("Node ID %s not found in nodeMap", depID)
						continue
					}
					task := Task{
						ID:   node.ID,
						Type: node.Type,
						Data: node.Data,
					}
					a.taskQueue.Enqueue(task)
				}
			}

			// Check if all tasks are completed
			a.completedMux.Lock()
			allCompleted := len(a.completed) == len(a.nodeMap)
			a.completedMux.Unlock()

			if allCompleted {
				a.setExecuting(false)
				a.emitEvent("execution-completed", nil)
				log.Println("All tasks completed. Execution finished.")
				return
			}
		case <-a.taskQueue.ctx.Done():
			a.setExecuting(false)
			log.Println("Execution stopped due to task queue cancellation")
			a.emitEvent("execution-stopped", nil)
			return
		case <-time.After(10 * time.Minute):
			// Optional: Timeout to prevent indefinite waiting
			a.setExecuting(false)
			a.taskQueue.Stop()
			log.Println("Execution timed out after 10 minutes")
			a.emitEvent("execution-timed-out", nil)
			return
		}
	}
}

// canEnqueue checks if all dependencies of a node are met.
func (a *App) canEnqueue(nodeID string) bool {
	// Find all nodes that this node depends on
	var dependencies []string
	for source, targets := range a.dependencies {
		for _, target := range targets {
			if target == nodeID {
				dependencies = append(dependencies, source)
			}
		}
	}

	// Check if all dependencies are completed
	for _, dep := range dependencies {
		a.completedMux.Lock()
		if !a.completed[dep] {
			a.completedMux.Unlock()
			return false
		}
		a.completedMux.Unlock()
	}
	return true
}

// StopExecution stops the ongoing execution.
func (a *App) StopExecution() {
	a.execMutex.Lock()
	defer a.execMutex.Unlock()

	if !a.isExecuting {
		log.Println("StopExecution called but no execution is in progress")
		return
	}

	a.taskQueue.Stop()
	a.setExecuting(false)
	a.emitEvent("execution-stopped", nil)
	log.Println("Execution has been stopped by the user")
}

// setExecuting updates the execution state.
func (a *App) setExecuting(state bool) {
	a.execMutex.Lock()
	a.isExecuting = state
	a.execMutex.Unlock()
	log.Printf("Execution state set to: %v", state)
}

// emitEvent emits an event to the frontend.
func (a *App) emitEvent(event string, payload interface{}) {
	runtime.EventsEmit(a.ctx, event, payload)
}

// GetIsExecuting returns the current execution state.
func (a *App) GetIsExecuting() bool {
	a.execMutex.Lock()
	defer a.execMutex.Unlock()
	return a.isExecuting
}
