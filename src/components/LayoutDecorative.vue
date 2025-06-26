<template>
  <div class="min-h-screen flex flex-col bg-base-200">
    <TopDecorative />
    <div class="flex flex-1 overflow-hidden">
      <div class="w-64 bg-base-300 p-4">
        <SideDecorative />
      </div>
      <div class="flex-1 overflow-auto bg-base-100 p-6 relative">
        <slot />
      </div>
    </div>
  </div>
</template>
