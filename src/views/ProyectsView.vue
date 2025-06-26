<template>
  <div class="p-6 flex-1 bg-base-100 text-white">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-semibold">
      <span v-if="!editProjectName" @dblclick="startEditingProject">{{ project?.name || 'Seleccione un proyecto' }}</span>

        <input
          v-else
          v-model="editedProjectName"
          @blur="saveProjectName"
          @keyup.enter="saveProjectName"
          class="input input-sm text-black"
        />
      </h2>
      <div v-if="project" class="text-lg">Progreso: {{ progress }}%</div>
    </div>

    <div v-if="project">
      <button
  class="btn btn-sm btn-error ml-4"
  v-if="project"
  @click="eliminarProyecto(project.id)"
>
  Eliminar proyecto
</button>

      <table class="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th class="text-center">Completado</th>
            <th class="text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in project.tasks" :key="t.id">
            <td>{{ i + 1 }}</td>
            <td @dblclick="startEditingTask(t.id, t.name)">
              <span v-if="editingTaskId !== t.id" :class="{ 'line-through text-gray-500': t.completed }">{{ t.name }}</span>
              <input
                v-else
                v-model="editedTaskName"
                @blur="saveTaskName(t.id)"
                @keyup.enter="saveTaskName(t.id)"
                class="input input-sm text-black"
              />
            </td>
            <td class="text-center">
              <input type="checkbox" :checked="t.completed" @change="toggleTask(project.id, t.id)" />
            </td>
            <td class="text-center">
              <button class="btn btn-xs btn-error" @click="deleteTask(project.id, t.id)">🗑️</button>
            </td>
          </tr>
          <tr>
            <td>{{ project.tasks.length + 1 }}</td>
            <td colspan="3">
              <input
                v-model="newTaskName"
                type="text"
                placeholder="Escriba nueva tarea y presione Enter"
                class="input input-bordered input-sm w-full text-black"
                @keydown.enter.prevent="addTask"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-gray-400">Seleccione un proyecto en el menú lateral y luego vuelva aquí.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const project = computed(() => store.selectedProject)
const progress = computed(() => store.projectProgress)

const newTaskName = ref('')
const editingTaskId = ref<number | null>(null)
const editedTaskName = ref('')
const editProjectName = ref(false)
const editedProjectName = ref('')

function addTask() {
  const name = newTaskName.value.trim()
  if (!name || !project.value) return
  store.addTask(project.value.id, name)
  newTaskName.value = ''
}

function toggleTask(pid: number, tid: number) {
  store.toggleTask(pid, tid)
}

function deleteTask(pid: number, tid: number) {
  store.deleteTask(pid, tid)
}

function startEditingTask(id: number, name: string) {
  editingTaskId.value = id
  editedTaskName.value = name
}

function saveTaskName(id: number) {
  if (!project.value) return
  store.renameTask(project.value.id, id, editedTaskName.value.trim())
  editingTaskId.value = null
}

function saveProjectName() {
  if (!project.value) return
  store.renameProject(project.value.id, editedProjectName.value.trim())
  editProjectName.value = false
}
function eliminarProyecto(id: number) {
  store.deleteProject(id)
}
function startEditingProject() {
  editProjectName.value = true
  editedProjectName.value = project.value?.name || ''
}

</script>
