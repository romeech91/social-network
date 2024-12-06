<template>
  <div class="chat-window">
    <template v-for="message in props.messages" :key="message.id">
      <chat-message :item="message" :user-name="userName" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import ChatMessage from "./elements/ChatMessage.vue";
import { defineProps } from "vue";

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  userName: {
    type: String,
    required: true,
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
  overflow: scroll;
}
</style>
