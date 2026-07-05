export interface UploadItem {
  id: string
  file: File
  previewUrl: string
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
  url: string | null
  path: string | null
  altText: string
  error: string | null
}

export const useUploadStore = defineStore('upload', {
  state: () => ({
    items: [] as UploadItem[],
  }),
  getters: {
    isUploading: (state) => state.items.some((item) => item.status === 'uploading'),
    orderedItems: (state) => state.items,
  },
  actions: {
    addFiles(files: File[]) {
      const newItems: UploadItem[] = files.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        status: 'pending',
        url: null,
        path: null,
        altText: '',
        error: null,
      }))
      this.items.push(...newItems)
      return newItems
    },
    setItems(items: UploadItem[]) {
      this.items = items
    },
    updateItem(id: string, patch: Partial<UploadItem>) {
      const item = this.items.find((i) => i.id === id)
      if (item) Object.assign(item, patch)
    },
    removeItem(id: string) {
      const item = this.items.find((i) => i.id === id)
      if (item) URL.revokeObjectURL(item.previewUrl)
      this.items = this.items.filter((i) => i.id !== id)
    },
    reorder(fromIndex: number, toIndex: number) {
      const items = [...this.items]
      const [moved] = items.splice(fromIndex, 1)
      if (!moved) return
      items.splice(toIndex, 0, moved)
      this.items = items
    },
    reset() {
      for (const item of this.items) URL.revokeObjectURL(item.previewUrl)
      this.items = []
    },
  },
})
