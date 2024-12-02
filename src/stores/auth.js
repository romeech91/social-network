import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ wsToken: "" }),
  getters: {
    getWsToken: (state) => state.wsToken,
  },
  actions: {
    setWsToken(value) {
      this.wsToken = value;
    },
  },
});
