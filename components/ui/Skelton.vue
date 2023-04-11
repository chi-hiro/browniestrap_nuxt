<script setup lang="ts">
import { variables } from '@/lib/styleUtl'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  model?: string
  animate?: boolean
  line?: number
  ratio?: number[]
  addClass?: string
  width?: string
  height?: string
}>()

//*******************************************************************************
// Hooks
//*******************************************************************************
const skeltonClass = computed<string>(() => {
  const arr = ['skelton']
  props.model && arr.push(props.model)
  props.ratio && arr.push(`embed embed-${props.ratio[0]}by${props.ratio[1]}`)
  props.animate && arr.push('animate')
  return arr.join(' ')
})

const skeltonStyle = computed<{ [keys: string]: string | undefined }>(() => {
  const styles = {
    width: props.width && props.width,
    height: props.height && props.height,
  }
  if (props.model === 'text' && props.line)
    styles.height = `${
      variables.base.fontSize * props.line +
      (variables.base.fontSize * variables.base.lineHeight - variables.base.fontSize) * (props.line - 1)
    }px`
  return styles
})
</script>

<template>
  <span :class="skeltonClass" :style="skeltonStyle" />
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

$bg: rgba(0, 0, 0, 0.1);
$darkBg: rgba(255, 255, 255, 0.1);

@keyframes skeltonAnime {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.skelton {
  display: block;
  background-color: $bg;

  @include darkmode {
    background-color: $darkBg;
  }

  &.animate {
    animation: skeltonAnime 1s linear infinite;
  }

  &.rounded {
    border-radius: 9999px;
  }

  &.text {
    min-height: $font-base-size;
    background-color: transparent;
    background-image: repeating-linear-gradient(
      0deg,
      $bg,
      $bg $font-base-size,
      transparent $font-base-size,
      transparent ($font-base-size * $font-base-line-height)
    );

    @include darkmode {
      background-color: transparent;
      background-image: repeating-linear-gradient(
        0deg,
        $darkBg,
        $darkBg $font-base-size,
        transparent $font-base-size,
        transparent ($font-base-size * $font-base-line-height)
      );
    }
  }

  &.h1 {
    height: $font-heading-h1-sm;

    @include breakpointUp {
      height: $font-heading-h1;
    }
  }

  &.h2 {
    height: $font-heading-h2-sm;

    @include breakpointUp {
      height: $font-heading-h2;
    }
  }

  &.h3 {
    height: $font-heading-h3-sm;

    @include breakpointUp {
      height: $font-heading-h3;
    }
  }

  &.h4 {
    height: $font-heading-h4-sm;

    @include breakpointUp {
      height: $font-heading-h4;
    }
  }

  &.h5 {
    height: $font-heading-h5-sm;

    @include breakpointUp {
      height: $font-heading-h5;
    }
  }

  &.h6 {
    height: $font-heading-h6-sm;

    @include breakpointUp {
      height: $font-heading-h6;
    }
  }
}
</style>
