<script lang="ts" setup>
// import DashboardSidebar from '@/shared/components/nav/DashboardSidebar.vue'
// import DashboardTopbar from '@/shared/components/nav/DashboardTopbar.vue'
</script>
<template>
  <div class="min-h-screen grid grid-cols-[16rem_1fr]">
    <DashboardSidebar />
    <div class="flex flex-col">
      <DashboardTopbar />
      <main class="p-6"><slot /></main>
    </div>
  </div>
</template>
