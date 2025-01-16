<script setup lang="ts">
import { toast } from "vue-sonner"
import { z } from "zod"

definePageMeta({
  middleware: () => {
    const userStore = useUserStore()
    const localPath = useLocalePath()
    if (userStore.isLoggedIn) {
      return navigateTo(localPath("/"))
    }
  },
})

const { $api, $localePath } = useNuxtApp()

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
      </UiCard>
    </form>
  </div>
</template>
