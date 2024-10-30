<script lang="ts">
  import "./login.scss";
  import { z } from "zod";
  import { CircleX } from "lucide-svelte";
  import { onMount } from "svelte";
  import { writable, get } from "svelte/store";
  import type { LoginRequest, LoginResponse } from "../../types"; // Adjust path as needed

  // Define the form schema using Zod
  const formSchema = z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  // Define types based on the schema
  type FormData = z.infer<typeof formSchema>;
  type ErrorsData = Partial<Record<keyof FormData, string>>;

  // Initialize Svelte stores
  const form = writable<FormData>({ email: '', password: '' });
  const errors = writable<ErrorsData>({});
  const message = writable<string>('');

  let modal: HTMLElement;
  let modalButton: HTMLElement;
  let closeButton: HTMLElement;
  let scrollDown: HTMLElement;
  let isOpened = false;

  // Modal control functions
  const openModal = () => {
      if (modal) {
          modal.classList.add("is-open");
          document.body.style.overflow = "hidden";
      }
  };

  const closeModal = () => {
      if (modal) {
          modal.classList.remove("is-open");
          document.body.style.overflow = "initial";
      }
  };

  const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened) {
          isOpened = true;
          if (scrollDown) {
              scrollDown.style.display = "none";
          }
          openModal();
      }
  };

  const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
          closeModal();
      }
  };

  onMount(() => {
      window.addEventListener("scroll", handleScroll);
      document.addEventListener("keydown", handleKeydown);

      return () => {
          window.removeEventListener("scroll", handleScroll);
          document.removeEventListener("keydown", handleKeydown);
      };
  });

  // Form validation function
  const validateForm = (): boolean => {
      const currentForm: FormData = get(form);
      const result = formSchema.safeParse(currentForm);
      if (result.success) {
          errors.set({});
          return true;
      } else {
          const formattedErrors: ErrorsData = {};
          result.error.errors.forEach(err => {
              const field = err.path[0] as keyof FormData;
              formattedErrors[field] = err.message;
          });
          errors.set(formattedErrors);
          return false;
      }
  };

  // Handle form submission
  const handleSubmit = async (event: Event) => {
      event.preventDefault();
      if (validateForm()) {
          const loginRequest: LoginRequest = get(form);
          try {
              const response: LoginResponse = await window.backend.Login(loginRequest);
              if (response.success) {
                  message.set(response.message);
                  // Handle successful login (e.g., close modal, redirect)
                  closeModal();
              } else {
                  message.set(response.message);
              }
          } catch (error) {
              message.set("An error occurred during login.");
              console.error(error);
          }
      }
  };
</script>

<div class="modal" bind:this={modal}>
  <div class="modal-container">
      <div class="modal-left">
          <h1 class="modal-title">Welcome!</h1>
          <p class="modal-desc">
              Fanny pack hexagon food truck, street art waistcoat kitsch.
          </p>

          <form on:submit|preventDefault={handleSubmit}>
              {#if $message}
                  <div class="alert alert-error mb-4">
                      {$message}
                  </div>
              {/if}

              <div class="input-block">
                  <label class="input-label" for="email">Email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      class="input"
                      placeholder="Email"
                      bind:value={$form.email}
                  />
                  {#if $errors.email}
                      <div class="text-red-500 text-sm mt-1">{$errors.email}</div>
                  {/if}
              </div>

              <div class="input-block">
                  <label class="input-label" for="password">Password</label>
                  <input
                      type="password"
                      id="password"
                      name="password"
                      class="input"
                      placeholder="Password"
                      bind:value={$form.password}
                  />
                  {#if $errors.password}
                      <div class="text-red-500 text-sm mt-1">{$errors.password}</div>
                  {/if}
              </div>

              <div class="modal-buttons">
                  <a href="/forgot-password">Forgot your password?</a>
                  <button type="submit" class="input-button">Login</button>
              </div>

              <button class="input-button">Sign In With GitHub</button>
          </form>

          <p class="sign-up">
              Don't have an account? <a href="/register">Sign up now</a>
          </p>
      </div>

      <div class="modal-right">
          <img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5..."
              alt=""
          />
      </div>

      <button
          class="icon-button close-button"
          aria-label="Close"
          on:click={closeModal}
          bind:this={closeButton}
      >
          <CircleX strokeWidth="1.5" size="32" />
      </button>
  </div>
  <button class="modal-button" on:click={openModal} bind:this={modalButton}>
      Click here to login
  </button>
</div>
