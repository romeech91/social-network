<template>
  <div class="message" :class="messageType">
    <!-- <span class="message-user">{{ item.user }}</span> -->
    <span class="message-text">{{ item.message }}</span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  userName: {
    type: String,
    required: true,
  },
});

const messageType = computed(() => {
  return props.item.sender === props.userName
    ? "message--my"
    : "message--remote";
});
</script>

<style lang="less" scoped>
.message {
  padding: 16px;
  max-width: 70%;

  &--my {
    background-color: #1565c0;
    color: #fff;
    border-radius: 16px 16px 0px 16px;
    margin-left: auto;
  }

  &--remote {
    background-color: #fff;
    color: #2c2d3a;
    border-radius: 16px 16px 16px 0;
    margin-right: auto;
  }
}
</style>
