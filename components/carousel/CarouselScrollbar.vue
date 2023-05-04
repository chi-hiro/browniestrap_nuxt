<script setup lang="ts">
import { env } from '@/lib/env'
import { getTouchPosition } from '@/lib/getTouchPosition'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  divide?: boolean
}>()

const state = reactive({
  isDrag: false,
  isAnimate: false,
  barW: 0,
  barL: 0,
  points: 0,
  active: 0,
})

const emit = defineEmits(['init', 'syncScrollbarMove', 'syncScrollbarEnd'])

const el = ref<HTMLDivElement | null>(null)

//*******************************************************************************
// Methods
//*******************************************************************************
const handleDown = () => {
  state.isDrag = true
}

const handleMove = (e: Event) => {
  !env('touch') && e.preventDefault()

  if (el.value && state.isDrag) {
    let currentPos = getTouchPosition(e, 'X') - el.value.getBoundingClientRect().left - state.barW / 2
    if (currentPos < 0) currentPos = 0
    if (currentPos > el.value.offsetWidth - state.barW) currentPos = el.value.offsetWidth - state.barW
    state.barL = currentPos

    let per: number = (currentPos * (100 / (el.value.offsetWidth - state.barW))) / 100
    if (per > 1) per = 1
    emit('syncScrollbarMove', per)
  }
}

const handleUp = (e: Event) => {
  if (el.value && state.isDrag) {
    state.isDrag = false

    emit(
      'syncScrollbarEnd',
      Math.floor((getTouchPosition(e, 'X') - el.value.getBoundingClientRect().left) / state.barW)
    )
  }
}

const updateScrollbar = (snapLength: number, snapIndex: number) => {
  state.isAnimate = true

  nextTick(() => {
    if (el.value) {
      const width = el.value.offsetWidth / snapLength
      const left = width * snapIndex
      state.barW = width
      state.barL = left
      state.points = Math.round(el.value.offsetWidth / width)
      state.active = left / (el.value.offsetWidth / Math.round(el.value.offsetWidth / width))
    }

    window.setTimeout(() => (state.isAnimate = false), 300)
  })
}

const dragMove = (value: number) => {
  if (el.value) state.barL = (el.value.offsetWidth - state.barW) * value
}

//*******************************************************************************
// Hooks
//*******************************************************************************
watchEffect(() => {
  if (!env('touch')) {
    if (state.isDrag) {
      document.addEventListener('mouseup', handleUp)
      document.addEventListener('mousemove', handleMove)
    } else {
      document.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mousemove', handleMove)
    }
  }
})

defineExpose({
  updateScrollbar,
  dragMove,
})
</script>

<template>
  <div
    ref="el"
    class="carousel-scrollbar"
    @touchstart.passive="handleDown"
    @touchmove.passive="handleMove"
    @touchend="handleUp"
    @touchleave="handleUp"
    @mousedown="handleDown"
  >
    <span
      :class="['carousel-scrollbar-bar', { transition: state.isAnimate }]"
      :style="{ width: `${state.barW}px`, transform: `translateX(${state.barL}px)` }"
    ></span>

    <div v-if="props.divide && state.points" class="carousel-scrollbar-point">
      <span
        v-for="(_, index) in state.points"
        :class="['carousel-scrollbar-point-item', { active: index == state.active }]"
      ></span>
    </div>
  </div>
</template>

<style lang="scss">
@use '/styles/core/core' as *;

$slider-height: 2px;

.carousel-scrollbar {
  cursor: ew-resize;
  user-select: none;
  overflow: hidden;
  position: relative;
  height: $input-height-md;
  width: 100%;
  max-width: 75vw;
  margin: 1.5rem auto 0;

  @include breakpointUp {
    max-width: 400px;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: $slider-height;
    background-color: darken($color-body-bg, 15%);

    @include darkmode {
      background-color: lighten($dark-color-body-bg, 15%);
    }
  }
}

.carousel-scrollbar-bar {
  position: relative;
  z-index: 5;
  display: block;
  height: $input-height-md;
  padding: calc(($input-height-md - $slider-height) / 2) 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: $slider-height;
    background-color: $color-primary;
  }

  &.transition {
    @include transition(transform);
  }
}

.carousel-scrollbar-point {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.carousel-scrollbar-point-item {
  flex: 1 1 100%;
  position: relative;
  text-align: center;
  height: $slider-height;

  border-left: 1px solid $color-body-bg;
  border-right: 1px solid $color-body-bg;

  @include darkmode {
    border-color: $dark-color-body-bg;
  }
}
</style>
