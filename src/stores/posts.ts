import { defineStore } from "pinia";
import axios from "../plugins/axios";
import { Post } from '@/globalTypes/post'

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    getPosts() {
      axios.get('/posts').then((response) => {
        this.posts = response.data
      })
    },
  },
});
