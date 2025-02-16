<template>
  <top-panel />
  <div
    v-if="posts"
    class="feed"
  >
    <feed-item
      v-for="post in posts"
      :key="post._id"
      :post="post"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import TopPanel from "@/components/TopPanel.vue";
import FeedItem from "./components/FeedItem.vue";
import { usePostsStore } from "@/stores/posts";

const postsStore = usePostsStore()

const posts = computed(() => postsStore.posts)

const getPosts = () => {
  postsStore.getPosts()
}

onMounted(() => {
  getPosts()
});
</script>

<style lang="less" scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 14px;
}
</style>