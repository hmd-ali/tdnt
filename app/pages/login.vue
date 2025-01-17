<script setup lang="ts">
import { toast } from "vue-sonner"
import { z } from "zod"

definePageMeta({
  middleware: ["guest"],
})

const { $api, $localePath, $supabase } = useNuxtApp()

const { t } = useI18n()

const { handleSubmit, isSubmitting, submitCount } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z
        .string({
          required_error: t("form.field_is_required", [t("form.email")]),
        })
        .email(t("form.email_must_be_valid")),
      password: z
        .string({
          required_error: t("form.field_is_required", [t("form.password")]),
        })
        .min(1, {
          message: t("form.field_is_required", [t("form.password")]),
        }),
    }),
  ),
  initialValues: {
    email: "",
    password: "",
  },
})

const userStore = useUserStore()

const onSubmit = handleSubmit(
  async (values) => {
    try {
      const response = await $api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      })
      userStore.setUser(response.user)
      toast.success(t("login_success"))
      await navigateTo($localePath("/"))
    } catch (_error: unknown) {
      const error = _error as Error
      toast.error(error.message)
    }
  },
  ({ errors }) => {
    const firstError = Object.keys(errors)[0]
    const el = document.querySelector(`[name=${firstError}]`)
    el?.scrollIntoView({ behavior: "smooth" })
    if (el instanceof HTMLElement) {
      el.focus()
    }
  },
)
const tooManySubmissions = computed(() => submitCount.value > 5)

const signInWithOAuth = async () => {
  isSubmitting.value = true
  const { error } = await $supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "https://localhost:3000",
    },
  })
  if (error) {
    toast.error(error.message)
  }
  isSubmitting.value = false
}

watch(tooManySubmissions, () => {
  showError({
    statusCode: 429,
    statusMessage: "Too many submissions",
  })
})
</script>

<template>
  <div
    class="container mx-auto flex h-screen w-full max-w-xl items-center justify-center p-2"
  >
    <form class="w-full" @submit.prevent="onSubmit">
      <UiCard class="relative p-2">
        <UiCardHeader as="h1">
          <UiCardTitle>
            {{ $t("login") }}
          </UiCardTitle>
          <UiCardDescription>
            {{ $t("enter_username_and_pass") }}
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="grid gap-4 lg:grid-cols-2">
          <UiFormField
            v-slot="{ field, errorMessage, handleChange }"
            name="email"
          >
            <UiFormItem>
              <UiFormLabel class="animate-spin">{{
                $t("form.email")
              }}</UiFormLabel>
              <UiFormControl>
                <UiInput
                  autofocus
                  autocomplete="username"
                  name="email"
                  type="text"
                  :model-value="field.value"
                  :class="{
                    'border-destructive': errorMessage,
                  }"
                  @input="handleChange"
                />
              </UiFormControl>
              <UiFormMessage> hello </UiFormMessage>
            </UiFormItem>
          </UiFormField>
          <UiFormField
            v-slot="{ field, errorMessage, handleChange }"
            name="password"
          >
            <UiFormItem>
              <UiFormLabel>{{ $t("form.password") }}</UiFormLabel>
              <UiFormControl>
                <UiInput
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  :model-value="field.value"
                  :class="{
                    'border-destructive': errorMessage,
                  }"
                  @input="handleChange"
                />
              </UiFormControl>
              <UiFormMessage> hello </UiFormMessage>
            </UiFormItem>
          </UiFormField>
        </UiCardContent>
        <UiCardFooter>
          <UiButton
            type="submit"
            :disabled="isSubmitting || tooManySubmissions"
          >
            {{ $t("login") }}
          </UiButton>
        </UiCardFooter>
        <div
          v-if="isSubmitting"
          class="absolute inset-0 flex items-center justify-center bg-white/40"
        >
          <div
            class="size-6 animate-spin rounded-full border-2 border-black border-t-transparent"
          ></div>
        </div>
        <p v-if="tooManySubmissions">You submitted too many times!</p>
        <div class="flex flex-col items-center">
          <p
            class="mx-auto flex w-full items-center gap-x-2 px-6 before:h-px before:w-full before:bg-border after:h-px after:w-full after:bg-border"
          >
            or
          </p>
          <p class="my-2 text-sm">Sign in with:</p>
          <button
            class="mx-auto block"
            title="Github"
            type="button"
            @click="signInWithOAuth"
          >
            <span class="sr-only">Github</span>
            <svg
              height="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              version="1.1"
              width="32"
              alt="GitHub"
            >
              <path
                d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"
              ></path>
            </svg>
          </button>
        </div>
      </UiCard>
    </form>
  </div>
</template>
