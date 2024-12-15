<template>
  <div class="login">
    <login-header />
    <div class="login__fields">
      <vue-input
        v-model="login"
        type="text"
        flat
        label="Your email"
      />
      <vue-input
        v-model="password"
        type="password"
        flat
        label="Password"
      />
    </div>
    <vue-button
      :disabled="disabledBtn"
      @click="submit"
    >
      Log in
    </vue-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
//components
import LoginHeader from "./components/LoginHeader.vue";
import VueInput from "@/ui/VueInput.vue";
import VueButton from "@/ui/VueButton.vue";
// Store
const authStore = useAuthStore();

const login = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const disabledBtn = computed(() => {
  return !login.value.length || !password.value.length;
});

// Methods
const submit = () => {
  axios({
    method: "post",
    url: "/api/login",
    data: {
      login: login.value,
      password: password.value,
    },
  })
    .then((response) => {
      authStore.token = response.data.token;
      localStorage.setItem("token", response.data.token);

      console.log(response);
      error.value = "";
      router.push("chat-list");
    })
    .catch((err) => {
      error.value = err.response?.data;
    });
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  height: 100%;
  justify-content: space-between;

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>
