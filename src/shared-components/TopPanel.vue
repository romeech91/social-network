<template>
  <div class="top-panel">
    <rounded-icon
      class="top-panel__action"
      :icon-name="controlIcon"
      @click="$emit('click')"
    />
    <span class="top-panel__title">{{ title }}</span>
    <avatar :path="userAvatar" />
  </div>
</template>

<script lang="ts" setup>
//vue
import Avatar from "@/ui/Avatar.vue";
import { computed } from "vue";
//store
import { useUserStore } from "@/stores/user";
//components
import RoundedIcon from "@/ui/RoundedIcon.vue";

defineEmits(['click'])
const userStore = useUserStore();

const props = defineProps<{
  controlIcon?: string,
  title: string,
  userAvatar?: string
}>()

console.log('toppanel', props)

const controlIcon = computed(() => {
  return props.controlIcon ? props.controlIcon : 'search'
})
const userAvatar = userStore?.userModel?.avatar

</script>

<style lang="less" scoped>
.top-panel {
  background-color: #000E08;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:after {
    position: absolute;
    display: block;
    content: "";
    background-color: red;
  }

  &__action {
    border: 1px solid #363f3b;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
