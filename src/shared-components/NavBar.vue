<template>
  <nav class="nav">
    <router-link
      to="/"
      class="nav-link"
    >
      <span v-html="home" />
      Posts
    </router-link>

    <router-link
      to="/chat-list"
      class="nav-link"
    >
      <span v-html="chats" />
      Chats
    </router-link>

    <router-link
      to="/settings"
      class="nav-link"
    >
      <span v-html="user" />
      Settings
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { home, user, chats } from "@/assets/svg-icons";
</script>

<style lang="less">
.nav {
  display: flex;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  justify-content: space-around;
  background: #fff;
  border-top: 1px solid #80808030;
  padding: 18px;

  &-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #24786D;

    & svg {
      max-height: 20px;
    }
  }
}
</style>