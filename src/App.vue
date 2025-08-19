<template>
  <div
    v-if="loaded"
    class="app-main"
  >
    <RouterView />
    <notifications />
    <nav-bar v-if="showNavBar" />
  </div>
</template>

<script lang="ts" setup>
//vue
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
//components
import NavBar from "@/shared-components/NavBar.vue";
import Notifications from "@/modules/Notifications/index";
//store
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const loaded = ref(false);

const showNavBar = computed(() => {
  return route.name !== 'login'
})

const uid = localStorage.getItem('uid')

onMounted(async () => {
  if (!userStore.userModel && uid?.length) {
    userStore.getUser(uid)
      .then(() => {
        if (route.name !== 'main') {
          router.push({ name: 'main' })
        }
      })

      loaded.value = true
  } else {
    router.push({ name: 'login' })
    loaded.value = true
  }
})
</script>

<style lang="less" src="@/assets/main.less"></style>
