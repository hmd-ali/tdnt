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
            <UiSheet>
              <UiSheetTrigger as-child>
                <UiButton variant="ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 12h16M4 6h16M4 18h16"
                    />
                  </svg>
                </UiButton>
              </UiSheetTrigger>
              <UiSheetContent side="left">
                <UiSheetHeader class="text-start">
                  <UiSheetTitle>
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
                  </UiSheetTitle>
                </UiSheetHeader>
                <UiButton
                  type="button"
                  variant="destructive"
                  @click="handleLogout"
                >
                  {{ $t("logout") }}
                </UiButton>
              </UiSheetContent>
            </UiSheet>
            <I18nT
              keypath="welcome_name"
              tag="p"
              scope="global"
              class="hidden text-muted-foreground md:block"
            >
              <template #name>
                <span class="font-medium text-primary">{{
                  userStore.user.name
                }}</span>
              </template>
            </I18nT>

            <UiButton
              class="hidden md:block"
              type="button"
              variant="destructive"
              @click="handleLogout"
            >
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
