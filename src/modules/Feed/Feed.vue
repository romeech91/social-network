<template>
  <top-panel
    title="News feed"
    @click="createPost"
  />
  <div
    v-if="posts"
    class="feed rounded-container"
  >
    <scroll-bar :options="{ suppressScrollX: true }">
      <feed-item
        v-for="post in posts"
        :key="post._id"
        :post="post"
      />
    </scroll-bar>
  </div>
</template>

<script lang="ts" setup>
//vue
import { onMounted, computed } from "vue";
//components
import TopPanel from "@/shared-components/TopPanel.vue";
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
  height: calc(100vh - 84px - 83px);
  padding: 20px 10px;
  background-color: #fff;
}
</style>