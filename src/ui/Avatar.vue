<template>
  <div
    class="avatar"
    :class="`avatar--${props.size}`"
  >
    <img
      class="avatar__img"
      :src="avatarPath"
    >
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "big",
  },
  path: {
    type: String,
    default: '',
  },
});

const avatarPath = props.path ? `${process.env.VUE_APP_STATIC}/${props.path}` : require('@/assets/avatar-default.svg')
</script>

<style lang="less" scoped>
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
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
