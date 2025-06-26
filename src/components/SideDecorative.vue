<template>
  <aside class="relative w-64 min-h-screen p-4 bg-base-300">
    <h2 class="text-lg font-bold mb-2">Proyectos</h2>
    <p v-if="!projects.length" class="text-sm text-gray-400 mb-4">No hay proyectos</p>

    <ul class="menu bg-base-100 rounded-box w-full">
      <li v-for="p in projects" :key="p.id" class="mb-2">
        <details :open="isOpen(p.id)" @click="selectAndNavigate(p.id)">
          <summary class="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-base-200">
            <span class="flex-1">{{ p.name }} ({{ projectProgress(p) }}%)</span>
            <span class="flex-shrink-0">
              <svg v-if="isOpen(p.id)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>

          <ul class="pl-4 mt-2 space-y-1">
            <li v-for="t in p.tasks" :key="t.id" class="flex items-center">
              <input type="checkbox" class="checkbox checkbox-sm mr-2" :checked="t.completed" @change.stop="toggleTask(p.id, t.id)" />
              <span :class="{ 'line-through text-gray-500': t.completed }">{{ t.name }}</span>
            </li>
          </ul>
        </details>
      </li>

      <li class="mt-4">
        <button class="btn btn-sm btn-primary w-full" @click="openProjectModal">+ Proyecto</button>
      </li>

      <li class="mt-2">
        <router-link to="/resumen" class="btn btn-sm btn-outline btn-info w-full">Ver Resumen</router-link>
      </li>
    </ul>

    <FloatingButton @click="openProjectModal" />

    <ProjectModal ref="projectModal">
      <template #title><h3 class="text-lg font-bold">Nuevo Proyecto</h3></template>
      <template #default>
        <input v-model="newProjectName" type="text" placeholder="Nombre del proyecto" class="input input-bordered w-full" />
      </template>
      <template #footer>
        <button class="btn mr-2" @click="closeProjectModal">Cancelar</button>
        <button class="btn btn-primary" @click="submitProject">Agregar</button>
      </template>
    </ProjectModal>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import FloatingButton from '@/components/FloatingButton.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import { computed } from 'vue'
//const projects = computed(() => store.projects)

const store = useProjectsStore()
const router = useRouter()
const projects = computed(() => store.projects)
const openList = ref<number[]>([])
const newProjectName = ref('')
const projectModal = ref<InstanceType<typeof ProjectModal> | null>(null)

function isOpen(id: number) {
  return openList.value.includes(id)
}

function selectAndNavigate(id: number) {
  store.selectProject(id)
  openList.value = isOpen(id) ? openList.value.filter(x => x !== id) : [...openList.value, id]
  router.push('/') // Ruta principal donde se ve el proyecto
}

function toggleTask(pid: number, tid: number) {
  store.toggleTask(pid, tid)
}

function openProjectModal() {
  projectModal.value?.open()
}

function closeProjectModal() {
  projectModal.value?.close()
}

function submitProject() {
  const name = newProjectName.value.trim()
  if (!name) return
  store.addProject(name)
  newProjectName.value = ''
  closeProjectModal()
}

function projectProgress(p: { tasks: { completed: boolean }[] }) {
  if (!p.tasks.length) return 0
  const done = p.tasks.filter(t => t.completed).length
  return Math.round((done / p.tasks.length) * 100)
}
</script>
