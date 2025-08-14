import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import type { User } from "@/globalTypes/user";

export const useUserStore = defineStore("users", {
  state: () => ({
    userModel: null as User | null,
  }),
  actions: {
     getUser(uid: string) {
      return new Promise((resolve, reject) => {
        axios.get(`/user/${uid}`)
          .then((response) => {
            this.userModel = response.data;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      })
    },
    setUser(data: User) {
      this.userModel = data;
    },
  }
});
