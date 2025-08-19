<template>
  <nav class="nav-bar">
    <Menubar
      :model="items"
      breakpoint="400px"
    >
      <template #item="{ item }">
        <Button
          :icon="item.icon"
          :label="item.label"
          severity="secondary"
          variant="text"
          @click="router.push(item.to)"
        />
      </template>
    </Menubar>
  </nav>
</template>

<script setup lang="ts">
//vue
import { useRouter } from "vue-router";
//components
import Menubar from 'primevue/menubar';
import Button from "primevue/button";
//ts
import { ref } from "vue";
const router = useRouter();

const items = ref([
  {
    label: 'Posts',
    icon: 'pi pi-home',
    to: '/'
  },
  {
    label: 'Chats',
    icon: 'pi pi-send',
    to: '/chat-list',
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    to: '/settings',
  },
]);
</script>

<style lang="less">
.nav-bar  {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
 
  & .p-menubar-root-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>