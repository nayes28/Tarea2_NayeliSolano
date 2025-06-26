import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as {
      id: number
      name: string
      tasks: {
        id: number
        name: string
        completed: boolean
      }[]
    }[],
    selectedId: null as number | null,
    _nextProjectId: 1,
    _nextTaskId: 1,
  }),
  getters: {
    selectedProject(state) {
      return state.projects.find(p => p.id === state.selectedId) || null
    },
    projectProgress(state) {
      const p = state.projects.find(x => x.id === state.selectedId)
      if (!p || p.tasks.length === 0) return 0
      const done = p.tasks.filter(t => t.completed).length
      return Math.round((done / p.tasks.length) * 100)
    }
  },
  actions: {
    load() {
      const data = localStorage.getItem('lab8-projects')
      if (data) {
        const parsed = JSON.parse(data)
        this.projects = parsed.projects || []
        this._nextProjectId = parsed._nextProjectId || 1
        this._nextTaskId = parsed._nextTaskId || 1
      }
    },
    save() {
      localStorage.setItem('lab8-projects', JSON.stringify({
        projects: this.projects,
        _nextProjectId: this._nextProjectId,
        _nextTaskId: this._nextTaskId,
      }))
    },
    addProject(name: string) {
      this.projects.push({
        id: this._nextProjectId++,
        name,
        tasks: []
      })
      this.selectedId = this._nextProjectId - 1
      this.save()
    },
    selectProject(id: number) {
      this.selectedId = id
    },
    addTask(projectId: number, name: string) {
      const p = this.projects.find(x => x.id === projectId)
      if (!p) return
      p.tasks.push({
        id: this._nextTaskId++,
        name,
        completed: false
      })
      this.save()
    },
    toggleTask(projectId: number, taskId: number) {
      const p = this.projects.find(x => x.id === projectId)
      const t = p?.tasks.find(t => t.id === taskId)
      if (t) t.completed = !t.completed
      this.save()
    },
    deleteTask(projectId: number, taskId: number) {
      const p = this.projects.find(x => x.id === projectId)
      if (!p) return
      p.tasks = p.tasks.filter(t => t.id !== taskId)
      this.save()
    },
    deleteProject(projectId: number) {
      this.projects = this.projects.filter(p => p.id !== projectId)
      if (this.selectedId === projectId) this.selectedId = null
      this.save()
    },
    renameProject(projectId: number, newName: string) {
      const p = this.projects.find(p => p.id === projectId)
      if (p) p.name = newName
      this.save()
    },
    renameTask(projectId: number, taskId: number, newName: string) {
      const p = this.projects.find(p => p.id === projectId)
      const t = p?.tasks.find(t => t.id === taskId)
      if (t) t.name = newName
      this.save()
    }
  }
})
