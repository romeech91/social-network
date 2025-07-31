<template>
  <div>
    <top-panel
      title="Settings"
      @click="editSettings"
    />
    <div class="settings rounded-container">
      <div class="settings__items">
        <info-item
          v-for="(item, idx) in formattedData"
          :key="idx"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//components
import TopPanel from "@/components/TopPanel.vue";
import InfoItem from "./components/InfoItem.vue";
//store
import { useUserStore } from "@/stores/user";
const userData = useUserStore().userModel

const formattedData = [
  ['Display name', userData.name],
  ['Email address', userData.mail],
  ['Phone number', userData.phone]
].map(([label, value]) => ({ label, value }));

function editSettings() {
  console.log('edit event')
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
  }
}
</style>