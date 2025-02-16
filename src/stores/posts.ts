import { defineStore } from "pinia";
import axios from "../plugins/axios";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as any,
  }),
  actions: {
    getPosts() {
      axios.get('/posts').then((response) => {
        this.posts = response.data
      })
    },
  },
});
