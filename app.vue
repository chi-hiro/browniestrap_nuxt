<script setup lang="ts">
import { env } from '@/lib/env'
import { reveal } from '@/lib/reveal'

//*******************************************************************************
// Methods
//*******************************************************************************
const setLayout = () => {
  document.querySelector('meta[name=viewport]')?.setAttribute('content', env('viewport'))
}

//*******************************************************************************
// Hooks
//*******************************************************************************
onMounted(() => {
  setLayout()
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
