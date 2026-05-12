<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

// Initialize theme on app mount
const { initTheme } = useTheme()
initTheme()
</script>

<template>
  <RouterView />
</template>
