<template>
  <div
    class="avatar"
    :class="`avatar--${size}`"
  >
    <img
      class="avatar__img"
      :src="avatarPath"
    >
  </div>
</template>

<script lang="ts" setup>
//vue
import { ref } from "vue";
import { defineProps } from "vue";

defineProps({
  size: {
    type: String,
    default: "medium",
  },
});

const avatarPath = ref("");

avatarPath.value = require("@/assets/avatar.jpg");
</script>

<style lang="less" scoped>
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;

  &--big {
    height: 52px;
    width: 52px;

    & .avatar__img {
      width: 52px;
      height: 52px;
    }
  }

  &__img {
    width: 44px;
    height: 44px;
    object-fit: cover;
  }
}
</style>
