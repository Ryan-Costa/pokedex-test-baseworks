import { defineStore } from "pinia";

export const useToggleStore = defineStore("toggle", {
  state: () => ({
    state: false,
  }),

  actions: {
    toggleState() {
      this.state = !this.state;
    },
  },

  getters: {
    showState: (state): boolean => {
      return state.state;
    },
  },
});
