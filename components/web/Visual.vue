<script setup lang="ts">
import Carousel from '@/components/carousel/Carousel.vue'
</script>

<template>
  <div id="visual">
    <div id="visual-lead">
      <slot />
    </div>

    <Carousel
      model="visual"
      :duration="8000"
      :zoom="true"
      :timer="true"
      :src="[
        { src_lg: '/dummy/visual1_lg.webp', src: '/dummy/visual1.webp' },
        { src_lg: '/dummy/visual2_lg.webp', src: '/dummy/visual2.webp' },
        { src_lg: '/dummy/visual3_lg.webp', src: '/dummy/visual3.webp' },
      ]"
    />

    <span id="visual-scroll"> Scroll </span>
  </div>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

#visual {
  position: relative;
}

#visual-lead {
  pointer-events: none;
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
  line-height: 1.5;

  ::v-deep(.title) {
    margin: 0;
    font-size: clamp(2.5rem, 1.591rem + 4.55vw, 5rem);
    line-height: inherit;
    color: inherit;
  }

  ::v-deep(.description) {
    margin: 0;
    font-size: clamp(1rem, 0.818rem + 0.91vw, 1.5rem);
    line-height: inherit;
    color: inherit;
  }
}

#visual-scroll {
  user-select: none;
  position: absolute;
  z-index: 2;
  left: calc($grid-gutter-width / 2);
  bottom: 0;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: white;
  font-size: 0.875rem;
  line-height: $icon-size;
  letter-spacing: 0.2em;
  writing-mode: vertical-rl;

  @include breakpointUp {
    left: $grid-gutter-width;
  }

  &::after {
    content: '';
    display: block;
    height: 2rem;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 1px;
    height: 2rem;
    background-color: white;
    animation: visual_scroll_anime 3000ms linear infinite;
  }
}

@keyframes visual_scroll_anime {
  0% {
    transform-origin: center top;
    transform: scale(1, 0);
  }
  50% {
    transform-origin: center top;
    transform: scale(1, 1);
  }
  51% {
    transform-origin: center bottom;
    transform: scale(1, 1);
  }
  100% {
    transform-origin: center bottom;
    transform: scale(1, 0);
  }
}
</style>
