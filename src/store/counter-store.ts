import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state() {
    return {
      count: 0,
    };
  },

  actions: {
    increment() {
      this.count++;
    },
  },

  getters: {
    showCount: (state): string => {
      return "O valor é: " + state.count;
    },
  },
});
