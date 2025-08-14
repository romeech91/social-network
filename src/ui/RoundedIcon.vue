<template>
  <div
    class="rounded-icon"
    @click="$emit('click')"
  >
    <span v-html="currentIcon" />
  </div>
</template>

<script lang="ts" setup>
//vue
import { computed } from "vue";
//icons
import { SEARCH_ICON, PENCIL_ICON } from "@/assets/svg-icons";

defineEmits(['click'])

const props = defineProps<{
  iconName?: string
}>();

const ICONS = {
  search: SEARCH_ICON,
  pencil: PENCIL_ICON,
};
console.log(props.iconName)
const currentIcon = computed(() => ICONS[props.iconName] ? ICONS[props.iconName] : 'search');
</script>

<style lang="less" scoped>
.rounded-icon {
  border: 1px solid #363f3b;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(svg) {
    width: 20px;
    height: 20px;

    .fill-white {
      fill: #fff;
    }
  }
}
</style>
