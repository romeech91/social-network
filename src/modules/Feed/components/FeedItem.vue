<template>
  <div class="feed-item">
    <avatar :path="post.author.avatar ?? ''" />
    <div class="feed-item__main">
      <div class="feed-item__heading">
        <span class="feed-item__name">{{ post.author.name }}</span>
      </div>
      <div class="feed-item__text">
        {{ post.content }}
      </div>
      <div class="feed-item__controls">
        <button><icon-svg name="like" /></button>
        <button><icon-svg name="comments" /></button>
        <button><icon-svg name="repost" /></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { computed } from "vue";
import Avatar from "@/ui/Avatar.vue";
import IconSvg from "@/ui/IconSvg.vue";

const props = defineProps({
  post: {
    type: Object,
    default: () => {},
  },
});

const post = computed(() => props.post);
</script>

<style lang="less" scoped>
.feed-item {
  display: flex;
  gap: 12px;
  border-bottom: 1px solid #6d6d6d4a;
  padding: 14px;

  &__name {
    font-size: 19px;
    font-weight: 700;
  }
  &__text {
    font-size: 19px;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    max-width: 150px;
    margin-top: 20px;

    & button {
      border: none;
      background-color: transparent;
    }
  }
}
</style>