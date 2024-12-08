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
import ChatWindow from "./components/ChatWindow.vue";
import VueInput from "@/ui/VueInput.vue";
import VueButton from "@/ui/VueButton.vue";
//vue
import { ref, Ref, onMounted, onBeforeUnmount, defineProps } from "vue";
import { useRouter } from "vue-router";
//stores
import { useAuthStore } from "@/stores/auth";
//libs
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
//ts
import { User } from "./types/User";

const props = defineProps({
  personId: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const authStore = useAuthStore();
const message = ref("");
const token = ref("");
const socket = ref<WebSocket | null>(null);
const messages: Ref<string[]> = ref([]);

let userName = ref("");
const userId = localStorage.getItem("userId");

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
  socket.value = new WebSocket("ws://localhost:7777", token.value);

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

const apiUrl = `/api/conversation/${props.personId}`;

const getMessages = async () => {
  try {
    const response = await axios.post(
      apiUrl,
      { userId: userId },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Детализация переписки:", response.data);
  } catch (error) {
    console.error("Ошибка получения данных:", error.response?.data || error);
  }
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
  token.value = localStorage.getItem("token") ?? authStore.token;

  if (!token.value) {
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
