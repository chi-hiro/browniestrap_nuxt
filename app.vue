<script setup lang="ts">
import { env } from '@/lib/env'
import { reveal } from '@/lib/reveal'

//*******************************************************************************
// Variables
//*******************************************************************************
const state = reactive<{
  viewport: string
}>({
  viewport: '',
})

useHead({
  meta: [{ name: 'viewport', content: state.viewport }],
})

//*******************************************************************************
// Methods
//*******************************************************************************
const setLayout = () => {
  state.viewport = env('viewport')
}

//*******************************************************************************
// Hooks
//*******************************************************************************
onMounted(() => {
  window.addEventListener('orientationchange', setLayout)
  env('mediaquery').addEventListener('change', setLayout)
  reveal()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
