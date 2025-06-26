<template>
  <div class="p-6 flex-1 bg-base-200">
    <h2 class="text-2xl font-bold mb-6">Resumen de Proyectos</h2>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Tareas</th>
            <th>Completado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, index) in projects" :key="p.id">
            <td>{{ index + 1 }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.tasks.length }}</td>
            <td>
              <progress
                class="progress progress-primary w-48"
                :value="calcularProgreso(p)"
                max="100"
              ></progress>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects'
const store = useProjectsStore()
const projects = store.projects

function calcularProgreso(p: { tasks: { completed: boolean }[] }) {
  if (!p.tasks.length) return 0
  const completas = p.tasks.filter(t => t.completed).length
  return Math.round((completas / p.tasks.length) * 100)
}
</script>
