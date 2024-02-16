import { defineStore } from 'pinia'

export const useLevelStore = defineStore('level', {
  state: () => ({
    levels: {
      hard: [],
      soft: []
    },
  }),

  getters: {
    level: (state) => state.levels,
  },

  actions: {
    setLevel(item) {
      item.forEach((level) => {
        if (level.levelId <= 6) {
          this.levels.hard.push(level)
        } else {
          this.levels.soft.push(level)
        }
      })
    },
  },
})
