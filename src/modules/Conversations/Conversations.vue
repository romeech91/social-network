<template>
  <div class="conversations">
    <conversations-header></conversations-header>
    <div class="conversations__items">
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
import ConversationItem from "./components/ConversationItem.vue";
import ConversationsHeader from "./components/ConversationsHeader.vue";
//ts
import { ConversationModel } from "./types/ConversationModel";

//vue
import { ref, onMounted } from "vue";
//libs
import axios from "axios";

const conversations = ref<ConversationModel[]>([]);
let userId = ref("");

userId.value = localStorage.getItem("userId") ?? "";

const getConversations = () => {
  axios
    .get(`/api/conversations`, {
      headers: {
        Authorization: localStorage.getItem("token"),
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
.conversations {
  background-color: #000e08;
  height: 100vh;

  &__items {
    background: #fff;
    height: calc(100vh - 84px);
    padding: 35px 9px;
    border-radius: 42px 42px 0 0;
    gap: 7px;
    display: flex;
    flex-direction: column;
  }
}
</style>
