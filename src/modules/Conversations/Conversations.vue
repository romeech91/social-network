<template>
  <div class="conversations">
    <top-panel title="Conversations" />
    <div class="conversations__items rounded-container">
      <conversation-item
        v-for="item in conversations"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
//components
import ConversationItem from "./components/ConversationItem.vue";
import TopPanel from "../../components/TopPanel.vue";
//ts
import { ConversationModel } from "./types/ConversationModel";
//vue
import { ref, onMounted } from "vue";
//libs
import axios from "axios";

const conversations = ref<ConversationModel[]>([]);

const getConversations = () => {
  axios({
    method: 'get',
    url: '/api/posts',
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
  .then((response) => {
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
    gap: 7px;
    display: flex;
    flex-direction: column;
  }
}
</style>
