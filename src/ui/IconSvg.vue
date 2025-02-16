<template>
  <span v-html="svgIcon" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { computed, ref } from "vue";
import { like, comments, repost } from "@/assets/svg-icons";

const props = defineProps({
  name: {
    type: String,
    requred: true,
    default: ''
  }
});

const icons = ref({
  like,
  comments,
  repost,
}) as any;

const svgIcon = computed(() => props.name ? icons.value[props.name] : '');
</script>