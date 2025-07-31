<template>
  <div class="top-panel">
    <div
      class="top-panel__action"
      @click="$emit('click')"
    >
      <span v-html="controlIcon" />
    </div>
    <span class="top-panel__title">{{ title }}</span>
    <avatar />
  </div>
</template>

<script lang="ts" setup>
import Avatar from "@/ui/Avatar.vue";
import { search as searchIcon } from "@/assets/svg-icons";
import { computed } from "vue";

defineEmits(['click'])

const props = defineProps<{
  icon?: string,
  title: string
}>()

const controlIcon = computed(() => {
  return props.icon?.length ? props.icon : searchIcon
})

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
