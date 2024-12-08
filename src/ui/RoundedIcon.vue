<template>
  <div class="rounded-icon">
    <span v-html="svgIcon"></span>
  </div>
</template>

<script lang="ts" setup>

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
}
</style>
