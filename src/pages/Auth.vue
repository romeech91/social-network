<template>
  <div class="auth">
    <input type="text" placeholder="login" v-model="login" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="submit">log in</button>
    <b class="error" v-if="error">{{ error }}</b>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
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
      authStore.token = response.data.token;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      error.value = "";
      router.push("chat-list");
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
