<template>
  <div
    v-if="loaded"
    class="app-main"
  >
    <RouterView />
    <notificatios-popup />
    <nav-bar v-if="showNavBar" />
  </div>
</template>

<script lang="ts" setup>
//vue
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
//components
import NavBar from "./components/NavBar.vue";
import NotificatiosPopup from "./modules/NotificatiosPopup/index";
//store
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const route = useRoute();
const loaded = ref(false);
const showNavBar = computed(() => {
  return route.name !== 'login'
})

const uid = localStorage.getItem('uid')

onMounted(async () => {
  if (!userStore.userModel && uid) {
    await userStore.getUser(uid);
    loaded.value = true
  }
})
</script>

<style lang="less" src="@/assets/main.less"></style>
