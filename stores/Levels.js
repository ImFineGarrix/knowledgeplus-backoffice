import { defineStore } from 'pinia'

export const useLevelStore = defineStore('level', {
  state: () => ({
    levels: [],
  }),

  getters: {
    level: (state) => state.levels,
  },

  actions: {
    setLevel(item) {
      this.level = item
    },
  },
})
