<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
})
</script>

<template>
  <div>{{ $t("logged_in_route") }}</div>
</template>
