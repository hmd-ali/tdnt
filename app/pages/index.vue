<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
})
</script>

<template>
  <div class="flex items-center justify-center py-20 text-2xl font-medium">
    {{ $t("logged_in_route") }}
  </div>
</template>
