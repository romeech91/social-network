<template>
  <div class="chat">
    <ChatWindow :messages="messages" />
    <div class="chat__control">
      <VueInput
        class="chat__input"
        v-model="message"
        @update:model-value="message = $event"
      />
      <VueButton @click="sendMessage" icon-name="letter">Send</VueButton>
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
const messages = ref([]);

// Dependencies
const authStore = useAuthStore();
const router = useRouter();

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

// Message sending
const sendMessage = () => {
  if (!socket.value) return;

  socket.value.send(message.value);
  messages.value.push({
    user: "You",
    message: message.value,
  });
  message.value = "";
  console.log(message);
};

// Lifecycle hooks
onMounted(() => {
  wsToken.value = localStorage.getItem("ws-token") ?? authStore.wsToken;

  if (!wsToken.value) {
    router.push("/login");
    return;
  }

  connect();
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
