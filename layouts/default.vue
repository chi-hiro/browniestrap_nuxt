<script setup lang="ts">
import Header from '@/components/web/Header.vue'
import Footer from '@/components/web/Footer.vue'
</script>

<template>
  <Header />

  <main>
    <slot />
  </main>

  <Footer />
</template>
