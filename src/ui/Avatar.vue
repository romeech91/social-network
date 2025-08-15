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
import { computed } from "vue";
import defaultAvatar from '@/assets/avatar-default.svg';

type Props = {
  size?: 'big' | 'small';
  path?: string;
};

const props = defineProps<Props>();

const avatarPath = computed(() =>
  props.path
    ? `${import.meta.env.VITE_STATIC}/${props.path}`
    : defaultAvatar
);
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
