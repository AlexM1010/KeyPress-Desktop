// Code generated from JSON Schema using quicktype. DO NOT EDIT.
// To parse and unparse this JSON data, add this code to your project and do:
//
//    generated, err := UnmarshalGenerated(bytes)
//    bytes, err = generated.Marshal()

package schema

import "time"

import "encoding/json"

func UnmarshalGenerated(data []byte) (Generated, error) {
	var r Generated
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Generated) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Generated struct {
	Nodes    []Node   `json:"nodes"`
	Edges    []Edge   `json:"edges"`
	Metadata Metadata `json:"metadata"`
}

type Edge struct {
	ID     string `json:"id"`
	Source string `json:"source"`
	Target string `json:"target"`
}

type Metadata struct {
	Version     string    `json:"version"`
	Created     time.Time `json:"created"`
	Modified    time.Time `json:"modified"`
	Name        *string   `json:"name,omitempty"`
	Description string    `json:"description"`
	Label       *string   `json:"label,omitempty"`
}

type Node struct {
	ID       string   `json:"id"`
	Type     string   `json:"type"`
	Position Position `json:"position"`
	Metadata Metadata `json:"metadata"`
	Config   Config   `json:"config"`
}

type Config struct {
	ButtonType        *string       `json:"buttonType,omitempty"`
	ClickCount        *int64        `json:"clickCount,omitempty"`
	ClickDelay        *ClickDelay   `json:"clickDelay,omitempty"`
	PressReleaseDelay *ClickDelay   `json:"pressReleaseDelay,omitempty"`
	ReleaseAfterPress *bool         `json:"releaseAfterPress,omitempty"`
	ScrollConfig      *ScrollConfig `json:"scrollConfig,omitempty"`
	DelayType         *string       `json:"delayType,omitempty"`
	Duration          *ClickDelay   `json:"duration,omitempty"`
	MoveType          *string       `json:"moveType,omitempty"`
	Coordinate        *Position     `json:"coordinate,omitempty"`
	Smooth            *bool         `json:"smooth,omitempty"`
	Keys              []Key         `json:"keys,omitempty"`
	Sequential        *bool         `json:"sequential,omitempty"`
	Interval          *ClickDelay   `json:"interval,omitempty"`
	Text              *string       `json:"text,omitempty"`
	TypingSpeed       *ClickDelay   `json:"typingSpeed,omitempty"`
	ClearBefore       *bool         `json:"clearBefore,omitempty"`
	PressEnter        *bool         `json:"pressEnter,omitempty"`
}

type ClickDelay struct {
	Value int64  `json:"value"`
	Unit  string `json:"unit"`
}

type Position struct {
	X int64 `json:"x"`
	Y int64 `json:"y"`
}

type Key struct {
	Key       string     `json:"key"`
	Modifiers []string   `json:"modifiers"`
	Duration  ClickDelay `json:"duration"`
}

type ScrollConfig struct {
	Directions []string `json:"directions"`
	Lines      int64    `json:"lines"`
}
