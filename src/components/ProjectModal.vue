<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box">
      <!-- slot para el título -->
      <slot name="title">
        <h3 class="text-lg font-bold">Modal</h3>
      </slot>

      <!-- slot por defecto para el contenido -->
      <div class="py-4">
        <slot>
          <p class="text-sm text-gray-400">Contenido del modal</p>
        </slot>
      </div>

      <!-- slot para los botones de acción -->
      <div class="modal-action">
        <slot name="footer">
          <button class="btn" @click="close">Cerrar</button>
        </slot>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const dialogRef = ref<HTMLDialogElement | null>(null)

function open() {
  dialogRef.value?.showModal()
}

function close() {
  dialogRef.value?.close()
}

// Exponemos ambos métodos al padre
defineExpose({ open, close })
</script>
