<template>
  <top-panel
    title="News feed"
    @click="createPost"
  />
  <div
    v-if="posts"
    class="feed rounded-container"
  >
    <feed-item
      v-for="post in posts"
      :key="post._id"
      :post="post"
    />
  </div>
</template>

<script lang="ts" setup>
//vue
import { onMounted, computed } from "vue";
//components
import TopPanel from "@/components/TopPanel.vue";
import FeedItem from "./components/FeedItem.vue";
//store
import { usePostsStore } from "@/stores/posts";

const postsStore = usePostsStore()
const posts = computed(() => postsStore.posts)
const getPosts = () => {
  postsStore.getPosts()
}

onMounted(() => {
  getPosts()
});

function createPost() {
  console.log('create post event')
}
</script>

<style lang="less" scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 92px - 83px);
  overflow: scroll;
  padding: 20px;
  background-color: #fff;
  height: 100vh;
}
</style>