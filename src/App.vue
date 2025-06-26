<template>
  <div class="flex h-screen">
    <SideDecorative />
    <router-view class="flex-1" />
  </div>
</template>

<script setup lang="ts">
import SideDecorative from '@/components/SideDecorative.vue'
</script>
