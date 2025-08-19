<template>
  <div class="login">
    <login-header />
    <div class="login__fields">
      <FloatLabel>
        <InputText
          id="login"
          v-model="login"
          class="login__input"
        />
        <label for="login">Your login</label>
      </FloatLabel>
      <FloatLabel>
        <Password
          v-model="password"
          :feedback="false"
          class="login__input"
        />
        <label for="login">Your password</label>
      </FloatLabel>
    </div>
    <Button
      :disabled="disabledBtn"
      label="Log in"
      @click="logIn"
    />
  </div>
</template>

<script lang="ts" setup>
//vue
import { ref, computed } from "vue";
import axiosApi from '@/plugins/axios';
import { useRouter } from "vue-router";
//components
import LoginHeader from "./components/LoginHeader.vue";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
//store
import { useUserStore } from "@/stores/user";
//ts
import { useEnterKey } from "@/composables/useEnterKey";

useEnterKey(logIn);

const userStore = useUserStore();
const login = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const disabledBtn = computed(() => {
  return !login.value.length || !password.value.length;
});

function logIn() {
  axiosApi.post("/login", {
    login: login.value,
    password: password.value,
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
  height: 100vh;
  justify-content: space-between;
  background-color: #fff;

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__input,
  :deep(.p-inputtext) {
    width: 100%;
  }
}
</style>
