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

<script setup>
import ChatWindow from "@/components/ChatWindow.vue";
import VueInput from "@/components/base/VueInput.vue";
import VueButton from "@/components/base/VueButton.vue";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import axios from "axios";

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("keypress");
});
// State
const message = ref("");
const wsToken = ref("");
const socket = ref(null);
let messages = ref([]);
// Dependencies
const authStore = useAuthStore();
const router = useRouter();
let userName = ref("");
userName = localStorage.getItem("username");
// WebSocket connection
const connect = () => {
  socket.value = new WebSocket("ws://localhost:7777", wsToken.value);

  socket.value.onopen = () => {
    console.log("Соединение с WebSocket установлено");
  };

  socket.value.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
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
      let sorted = response.data.messages.sort(function (a, b) {
        return a.id - b.id;
      });
      messages.value = sorted;
    });
};

// Message sending
const sendMessage = () => {
  if (!socket.value) return;
  let lastId =
    messages.value.reduce((acc, message) => {
      return message.id > acc ? message.id : acc;
    }, 0) + 1;

  let messageObj = {
    sender: userName,
    message: message.value,
    timestamp: Date.now(),
    id: lastId,
  };

  socket.value.send(JSON.stringify(messageObj));
  messages.value.push(messageObj);
  console.log(messages);
  message.value = "";
};

// Lifecycle hooks
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
