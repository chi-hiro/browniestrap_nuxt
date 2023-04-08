<script setup lang="ts">
const props = defineProps<{
  value: string
}>()
</script>

<template>
  <span :class="['material-symbols-outlined', 'font-icon']">
    {{ props.value }}
  </span>
</template>
