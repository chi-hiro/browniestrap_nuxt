<script setup lang="ts">
import { computed } from 'vue'
import { variables } from '@/lib/styleUtl'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  model: string
  color?: string
  rounded?: boolean
  progress?: number
}>()

//*******************************************************************************
// Methods
//*******************************************************************************
const radius = () => {
  return 24 / 2 - 2 * 2
}

const array = () => {
  return radius() * 2 * Math.PI
}

const offset = () => {
  return array() - ((props.progress ? props.progress : 0) / 100) * array()
}

//*******************************************************************************
// Hooks
//*******************************************************************************
const loaderClass = computed<string>(() => {
  const arr = ['loader']
  props.model && arr.push(props.model)
  props.rounded && arr.push('rounded')
  props.progress && arr.push('animate')
  return arr.join(' ')
})

const colorVariant = computed<string>(() => {
  return props.color ? variables.color[props.color] : variables.color['primary']
})
</script>

<template>
  <div v-if="props.model === 'dot'" :class="loaderClass"><span></span><span></span><span></span></div>

  <div v-else-if="props.model === 'line'" :class="loaderClass">
    <span class="loader-line-active"></span>
  </div>

  <div v-else-if="props.model === 'bar'" :class="loaderClass">
    <span class="loader-bar-active" :style="{ width: `${props.progress}%` }"></span>
  </div>

  <div v-else-if="props.model === 'circle'" :class="loaderClass">
    <svg class="loader-circle-base">
      <circle cx="12" cy="12" fill="transparent" :r="radius()"></circle>
    </svg>
    <svg class="loader-circle-active">
      <circle
        cx="12"
        cy="12"
        fill="transparent"
        :r="radius()"
        :stroke-dasharray="array()"
        :stroke-dashoffset="offset()"
      ></circle>
    </svg>
  </div>

  <svg v-else :class="loaderClass" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  </svg>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;
$colorVariant: v-bind('colorVariant');

//***********************************************************************
//  Spin
//***********************************************************************
.loader.spin {
  display: block;
  width: $icon-size;
  height: $icon-size;
  margin: 0 auto;
  animation: spin 1200ms infinite linear;

  .path {
    stroke: $colorVariant;
    stroke-linecap: round;
    animation: spin_dash 600ms ease-in-out infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin_dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

//***********************************************************************
//  Dot
//***********************************************************************
.loader.dot {
  display: block;
  width: $icon-size;
  height: $icon-size;
  margin: 0 auto;
  position: relative;

  span {
    position: absolute;
    width: 6px;
    height: 6px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    background-color: $colorVariant;

    &:nth-child(1) {
      left: 0;
      animation: dot1 800ms infinite linear;
    }

    &:nth-child(2) {
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      animation: dot2 800ms infinite linear;
    }

    &:nth-child(3) {
      right: 0;
      animation: dot3 800ms infinite linear;
    }
  }

  &.rounded {
    span {
      border-radius: 100px;
    }
  }
}

@keyframes dot1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes dot2 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes dot3 {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

//***********************************************************************
//  Line
//***********************************************************************
.loader.line {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);

  @include darkmode {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .loader-line-active {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background-color: $colorVariant;
    animation: loader_line_animate 1s linear infinite;
  }

  &.rounded {
    border-radius: 9999px;

    .loader-line-active {
      border-radius: 9999px;
    }
  }
}

@keyframes loader_line_animate {
  0% {
    transform: translateX(-100%) scale(1, 1);
  }
  25% {
    transform: translateX(-50%) scale(0.2, 1);
  }
  50% {
    transform: translateX(0) scale(1, 1);
  }
  75% {
    transform: translateX(50%) scale(0.2, 1);
  }
  100% {
    transform: translateX(100%) scale(1, 1);
  }
}

//***********************************************************************
//  Bar
//***********************************************************************
.loader.bar {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.1);

  @include darkmode {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .loader-bar-active {
    position: relative;
    display: block;
    width: 0;
    height: 100%;
    background-color: $colorVariant;
  }

  &.animate {
    .loader-bar-active {
      transition: width 100ms $easing;
    }
  }

  &.rounded {
    border-radius: 9999px;

    .loader-bar-active {
      border-radius: 9999px;
    }

    &.animate {
      .loader-bar-active::after {
        border-radius: 9999px;
      }
    }
  }
}

//***********************************************************************
//  Circle
//***********************************************************************
.loader.circle {
  position: relative;
  width: $icon-size;
  height: $icon-size;
  margin: 0 auto;

  svg {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: $icon-size;
    height: $icon-size;
    margin: 0;

    circle {
      stroke: rgba(0, 0, 0, 0.1);
      stroke-width: 2px;
      transform: rotate(-90deg) scale(1.25);
      transform-origin: center;

      @include darkmode {
        stroke: rgba(255, 255, 255, 0.1);
      }
    }

    &.loader-circle-active {
      z-index: 2;

      circle {
        stroke: $colorVariant;
      }
    }
  }

  &.animate {
    svg {
      circle {
        transition: stroke-dashoffset 100ms $easing;
      }
    }
  }
}
</style>
