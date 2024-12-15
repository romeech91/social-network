<template>
  <div class="conversations-header">
    <div class="conversations-header__search">
      <span v-html="searchIcon" />
    </div>
    <span class="conversations-header__title">Conversations</span>
    <avatar />
  </div>
</template>

<script lang="ts" setup>
//components
import Avatar from "@/ui/Avatar.vue";
import { search as searchIcon } from "@/assets/svg-icons";
</script>

<style lang="less" scoped>
.conversations-header {
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__search {
    border: 1px solid #363f3b;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
