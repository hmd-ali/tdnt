<script setup lang="ts">
const localePath = useLocalePath()

const userStore = useUserStore()

// const supabase = useSupabaseClient()
const { $supabase } = useNuxtApp()
const handleLogout = async () => {
  userStore.clearUser()
  await $supabase.auth.signOut()
  return navigateTo(localePath("/login"))
}
</script>

<template>
  <div class="container mx-auto w-full pt-20">
    <header class="fixed left-0 top-0 w-full">
      <div
        class="container mx-auto flex h-20 w-full items-center justify-between border-b"
      >
        <div class="flex items-center gap-x-4">
          <template v-if="userStore.user !== undefined">
            <I18nT
              keypath="welcome_name"
              tag="p"
              scope="global"
              class="text-muted-foreground"
            >
              <template #name>
                <span class="font-medium text-primary">{{
                  userStore.user.name
                }}</span>
              </template>
            </I18nT>
            <UiButton type="button" variant="destructive" @click="handleLogout">
              {{ $t("logout") }}
            </UiButton>
          </template>
        </div>
        <AppLocaleSwitch />
      </div>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>
