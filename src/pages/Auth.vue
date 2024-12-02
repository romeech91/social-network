<template>
  <div class="auth">
    <input type="text" placeholder="login" v-model="login" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="submit">log in</button>
    <b class="error" v-if="error">{{ error }}</b>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from "vue-router";

const login = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
// Store
const authStore = useAuthStore();

// Methods
const submit = () => {
  axios({
    method: "post",
    url: "/api/login",
    data: {
      username: login.value,
      password: password.value,
    },
  })
    .then((response) => {
      authStore.wsToken = response.data.token;
      localStorage.setItem("ws-token", response.data.token);
      error.value = "";
      router.push("direct");
    })
    .catch((err) => {
      error.value = err.response?.data?.message || "An error occurred";
    });
};
</script>

<style>
.auth {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

input {
  height: 20px;
  padding: 5px;
}
</style>
