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
        <img :data-src="props.src" width="100%" height="100%" alt="" class="swiper-lazy" />
      </span>

      <img v-else :data-src="props.src" width="100%" height="100%" class="swiper-lazy" />
    </NuxtLink>
  </template>

  <template v-else>
    <span v-if="props.ratio" :class="`embed embed-${props.ratio[0]}by${props.ratio[1]}`">
      <img :data-src="props.src" width="100%" height="100%" alt="" class="swiper-lazy" />
    </span>

    <img v-else :data-src="props.src" width="100%" height="100%" alt="" class="swiper-lazy" />
  </template>

  <span class="swiper-lazy-preloader" />
</template>
