<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{
  error: NuxtError
}>()

const localePath = useLocalePath()
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <UiCard class="container mx-auto w-full max-w-lg">
      <UiCardHeader>
        <UiCardTitle class="text-center text-4xl">{{
          error.statusCode
        }}</UiCardTitle>
      </UiCardHeader>
      <UiCardContent class="text-center">
        {{ error.statusMessage }}
      </UiCardContent>
      <UiCardFooter>
        <UiButton class="mx-auto" as-child>
          <NuxtLink :to="localePath('/')">
            {{ $t("back_home") }}
          </NuxtLink>
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
