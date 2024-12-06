<template>
  <div class="chat-list">
    <div class="chat-list__header">
      <div class="chat-list__search">
        <span v-html="searchIcon"></span>
      </div>
      <span class="chat-list__title">Conversations</span>
      <avatar />
    </div>
    <div class="chat-list__items">
      <conversation-item
        v-for="item in conversations"
        :key="item.id"
        :item="item"
      ></conversation-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
//components
import Avatar from "@/components/shared/Avatar.vue";
import ConversationItem from "@/components/ConversationItem.vue";
//vue
import { ref, onMounted } from "vue";
//libs
import axios from "axios";
//ts
import { ConversationItem as ConversationItemType } from "@/globalTypes/ConversationItem";
import { search as searchIcon } from "@/assets/svg-icons";

const conversations = ref<ConversationItemType[]>([]);
let userId = ref("");

userId.value = localStorage.getItem("userId") ?? "";

const getConversations = () => {
  axios
    .get(`/api/conversations`, {
      headers: {
        Authorization: localStorage.getItem("ws-token"),
      },
      params: {
        userId: userId.value,
      },
    })
    .then((response) => {
      console.log(response);
      conversations.value = response.data.conversations;
    });
};
onMounted(() => {
  getConversations();
});
</script>

<style lang="less" scoped>
.chat-list {
  background-color: #000e08;
  height: 100vh;

  &__items {
    background: #fff;
    height: calc(100vh - 84px);
    padding: 40px 9px;
    border-radius: 42px 42px 0 0;
    gap: 7px;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
  }

  &__header {
    color: #fff;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__search {
    border: 1px solid #363f3b;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
