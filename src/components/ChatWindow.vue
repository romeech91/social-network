<template>
  <div class="chat-window">
    <template v-for="message in messages">
      <ChatMessage :item="message" />
    </template>
  </div>
</template>

<script setup>
import ChatMessage from "@/components/elements/ChatMessage.vue";
import { defineProps } from "vue";

defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="less" scoped>
.chat-window {
  margin: 0 10px;
  height: 80vh;
  background-color: #f0f0f3;
  padding: 24px;
  gap: 12px;
  display: flex;
  flex-direction: column;
}
</style>
