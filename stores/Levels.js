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
      let hard = []
      let soft = []
      item.forEach((level) => {
        if (level.levelId <= 6) {
          hard.push(level)
        } else {
          soft.push(level)
        }
      })
      this.levels = {
        hard,
        soft
      }
    },
  },
})
