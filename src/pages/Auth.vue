<template>
  <div class="auth">
    <input type="text" placeholder="login" v-model="login" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="submit">log in</button>
    <b class="error" v-if="error">{{ error }}</b>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "../stores/auth.js";

export default {
  name: "Auth",
  data() {
    return {
      login: "",
      password: "",
      error: "",
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    submit() {
      axios({
        method: "post",
        url: "/api/login",
        data: {
          username: this.login,
          password: this.password,
        },
      })
        .then((response) => {
          this.authStore.wsToken = response.data.token;
          this.error = "";
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
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
