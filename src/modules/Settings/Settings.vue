<template>
  <div>
    <top-panel
      title="Settings"
      control-icon="pencil"
      @click="editSettings"
    />
    <div class="settings rounded-container">
      <div class="settings__items">
        <info-item
          v-for="(item, idx) in formattedData"
          :key="idx"
          :item="item"
        />
        <vue-button
          class="settings__logout"
          @click="logOut"
        >
          Log out
        </vue-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//vue
import { useRouter } from "vue-router";
import { computed } from "vue";
//components
import TopPanel from "@/shared-components/TopPanel.vue";
import InfoItem from "./components/InfoItem.vue";
import VueButton from "@/ui/VueButton.vue";
//store
import { useUserStore } from "@/stores/user";
//ts
import type { User } from "@/globalTypes/user";

const router = useRouter();

const userData = computed<User | null>(() => useUserStore().userModel);

const formattedData = computed(() => {
  if (!userData.value) return [];
  return [
    ['Display name', userData.value.name],
    ['Email address', userData.value.mail],
    ['Phone number', userData.value.phone]
  ].map(([label, value]) => ({ label, value }));
});

function editSettings() {
  console.log('edit event')
}

function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('uid');
  router.push({name: 'login'})
}
</script>

<style lang="less" scoped>  
.settings {
  background-color: #fff;
  height: calc(100vh - 84px);
  padding: 35px 9px;
  gap: 7px;
  display: flex;
  flex-direction: column;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px;
    height: calc(100% - 84px);
  }

  &__logout {
    margin-top: auto;
  }
}
</style>