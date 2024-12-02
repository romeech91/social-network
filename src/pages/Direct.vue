<template>
  <div class="chat">
    <h1>Chat</h1>
    <input type="text" v-model="message" />
    <button @click="sendMessage">Send</button>
    <div class="messages">{{ messages }}</div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth.js";
export default {
  data() {
    return {
      message: "",
      wsToken: "",
      socket: null,
      messages: [],
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  created() {
    this.wsToken = this.authStore.wsToken;

    if (!this.wsToken) {
      this.$router.push("/login");
      return;
    }

    this.socket = new WebSocket("ws://localhost:7777", this.wsToken);

    this.socket.onopen = () => {
      console.log("Соединение установлено");
    };
  },
  beforeUnmount() {
    this.socket.close();
  },
  methods: {
    sendMessage() {
      this.socket.send(this.message);
      let arr = [];
      this.socket.onmessage = function (event) {
        arr.push(event.data);
      };
      this.messages = arr;
    },
  },
};
</script>
