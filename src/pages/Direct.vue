<template>
  <div class="chat">
    <chat-window :messages="messages" :user-name="userName" />
    <div class="chat__control">
      <vue-input
        class="chat__input"
        v-model="message"
        @update:model-value="message = $event"
      />
      <vue-button @click="sendMessage" icon-name="letter">Send</vue-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
//components
import ChatWindow from "@/components/ChatWindow.vue";
import VueInput from "@/components/base/VueInput.vue";
import VueButton from "@/components/base/VueButton.vue";
//vue
import { ref, Ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
//stores
import { useAuthStore } from "@/stores/auth";
//libs
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
//ts
import { User } from "@/globalTypes/User";

const router = useRouter();
const authStore = useAuthStore();
const message = ref("");
const wsToken = ref("");
const socket = ref<WebSocket | null>(null);
const messages: Ref<string[]> = ref([]);

let userName = ref("");

const sendMessageFn = function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
};

document.addEventListener("keypress", sendMessageFn);

onBeforeUnmount(() => {
  document.removeEventListener("keypress", sendMessageFn);
});

userName.value = localStorage.getItem("username") ?? "";

const connect = () => {
  socket.value = new WebSocket("ws://localhost:7777", wsToken.value);

  socket.value.onopen = () => {
    console.log("Соединение с WebSocket установлено");
  };

  socket.value.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      console.log(message);
      messages.value.push(message);
    } catch (error) {
      console.error("Ошибка при парсинге сообщения:", error);
    }
  };

  socket.value.onclose = () => {
    console.log("Соединение закрыто");
  };
};

const getMessages = () => {
  axios
    .get("/api/messages", {
      headers: {
        Authorization: wsToken.value,
      },
    })
    .then((response) => {
      let sorted = response.data.messages.sort(function (a: User, b: User) {
        return a.id - b.id;
      });
      messages.value = sorted;
    });
};

const sendMessage = () => {
  if (!socket.value) return;

  let messageObj: any = {
    sender: userName.value,
    message: message.value,
    timestamp: Date.now(),
    id: uuidv4(),
  };

  socket.value.send(JSON.stringify(messageObj));
  messages.value.push(messageObj);

  message.value = "";
};

onMounted(() => {
  wsToken.value = localStorage.getItem("ws-token") ?? authStore.wsToken;

  if (!wsToken.value) {
    router.push("/login");
    return;
  }

  connect();
  getMessages();
});

onBeforeUnmount(() => {
  socket.value?.close();
});
</script>

<style lang="less" scoped>
.chat {
  &__control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 24px;
  }

  &__input {
    width: 100%;
  }
}
</style>
