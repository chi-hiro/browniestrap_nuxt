<script setup lang="ts">
const props = defineProps<{
  src: string
  href?: string
  ratio?: number[]
}>()
</script>

<template>
  <template v-if="props.href">
    <NuxtLink :to="props.href" tabindex="-1">
      <span v-if="props.ratio" :class="`embed embed-${props.ratio[0]}by${props.ratio[1]}`">
        <img :src="props.src" width="100%" height="100%" alt="" loading="lazy" />
      </span>

      <img v-else :src="props.src" width="100%" height="100%" loading="lazy" />
    </NuxtLink>
  </template>

  <template v-else>
    <span v-if="props.ratio" :class="`embed embed-${props.ratio[0]}by${props.ratio[1]}`">
      <img :src="props.src" width="100%" height="100%" alt="" loading="lazy" />
    </span>

    <img v-else :src="props.src" width="100%" height="100%" alt="" loading="lazy" />
  </template>

  <span class="swiper-lazy-preloader" />
</template>
