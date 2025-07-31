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
//vue
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
//components
import LoginHeader from "./components/LoginHeader.vue";
import VueInput from "@/ui/VueInput.vue";
import VueButton from "@/ui/VueButton.vue";
//store
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const login = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const disabledBtn = computed(() => {
  return !login.value.length || !password.value.length;
});

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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('uid', response.data.user._id);
      userStore.setUser(response.data.user);
      error.value = '';
      router.push('/');
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
  background-color: #fff;

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>
