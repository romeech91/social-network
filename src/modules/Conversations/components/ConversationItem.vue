<template>
  <router-link :to="{ name: 'chat', params: { personId: item.personId } }">
    <div class="conversation-item">
      <div class="conversation-item__main">
        <avatar size="big" />
        <div class="conversation-item__content">
          <span class="conversation-item__name">{{ item.personName }}</span>
          <span class="conversation-item__message">{{ item.lastMessage }}</span>
        </div>
      </div>
      <div class="conversation-item__info">
        <span class="conversation-item__time">2 min ago</span>
        <span class="conversation-item__counter">3</span>
      </div>
    </div>
  </router-link>
</template>

<script lang="js" setup>
//components
import Avatar from "@/ui/Avatar.vue";
//ts
import { defineProps } from "vue";

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less" scoped>
.conversation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 15px;
  border-radius: 30px;

  &:hover {
    background-color: aliceblue;
  }

  &__main {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__name {
    font-size: 20px;
    font-weight: 600;
  }

  &__message {
    color: #797c7b;
    font-size: 14px;
    font-weight: 500;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 7px;
    align-items: end;
  }

  &__time {
    color: #797c7b;
    font-size: 14px;
    font-weight: 500;
  }

  &__counter {
    background-color: #f04a4c;
    font-size: 14px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
