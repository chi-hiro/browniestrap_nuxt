<script setup lang="ts">
import { variables } from '@/lib/styleUtl'
import { anchor } from '@/lib/mixins'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  model: string
  color?: string
  title?: string
  href?: string
}>()

//*******************************************************************************
// Hooks
//*******************************************************************************
const chipClass = computed<string>(() => {
  const arr = ['chip']
  props.model && arr.push(props.model)
  props.color === 'default' && arr.push('default')
  return arr.join(' ')
})

const textColor = computed<string>(() => {
  if (props.color) {
    if (props.color === 'default') {
      return ''
    } else if (props.model?.includes('bg') || props.model?.includes('check') || props.model?.includes('badge')) {
      return props.color === 'white' ? variables.theme.bodyColor : 'white'
    } else {
      return variables.color[props.color]
    }
  } else {
    return ''
  }
})

const bgColor = computed<string>(() => {
  if (props.color) {
    if (props.color === 'default') {
      return ''
    } else if (props.model?.includes('text') || props.model?.includes('border')) {
      return variables.lightColor[props.color]
    } else {
      return variables.color[props.color]
    }
  } else {
    return ''
  }
})
</script>

<template>
  <a v-if="props.href?.charAt(0) === '#'" :href="props.href" :class="chipClass" @click="anchor">
    <slot v-if="$slots.default" />
    <template v-else>{{ props.title }}</template>
  </a>

  <NuxtLink v-else-if="props.href" :to="props.href" :class="chipClass">
    <slot v-if="$slots.default" />
    <template v-else>{{ props.title }}</template>
  </NuxtLink>

  <span v-else :class="chipClass">
    <slot v-if="$slots.default" />
    <template v-else>{{ props.title }}</template>
  </span>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

$textColor: v-bind('textColor');
$bgColor: v-bind('bgColor');

$chip-border-radius: 3px;
$chip-border-width: 1px;
$chip-height-md: 32px;
$chip-icon-md: $icon-size * 0.875;
$chip-height-sm: 24px;
$chip-icon-sm: $icon-size * 0.75;
$chip-height-lg: 40px;
$chip-icon-lg: $icon-size * 1;

.chip {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  @include rounded($chip-border-radius);
  font-size: 0.875rem;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  @include textKerning;

  // Default color
  color: $color-body;
  background-color: $color-muted-bg;
  border: $chip-border-width solid transparent;

  @include darkmode {
    color: $dark-color-body;
    background-color: $dark-color-muted-bg;
  }

  // Default size
  min-width: $chip-height-md;
  height: $chip-height-md;
  gap: $chip-height-md - $chip-icon-md;
  padding: 0 $chip-height-md - $chip-icon-md;

  ::v-deep(img),
  ::v-deep(.font-icon) {
    margin: 0 calc(($chip-height-md - $chip-icon-md) / -2);
  }

  ::v-deep(img) {
    width: $chip-icon-md;
    height: $chip-icon-md;
    object-fit: cover;
    border-radius: 999px;
  }

  ::v-deep(.font-icon) {
    font-size: $chip-icon-md;
  }

  // Model
  &.sm {
    min-width: $chip-height-sm;
    height: $chip-height-sm;
    gap: $chip-height-sm - $chip-icon-sm;
    padding: 0 $chip-height-sm - $chip-icon-sm;
    font-size: 0.75rem;

    ::v-deep(img),
    ::v-deep(.font-icon) {
      margin: 0 calc(($chip-height-sm - $chip-icon-sm) / -2);
    }

    :v-deep(img) {
      width: $chip-icon-sm;
      height: $chip-icon-sm;
    }

    ::v-deep(.font-icon) {
      font-size: $chip-icon-sm;
    }
  }

  &.lg {
    min-width: $chip-height-lg;
    height: $chip-height-lg;
    gap: $chip-height-lg - $chip-icon-lg;
    padding: 0 $chip-height-lg - $chip-icon-lg;
    font-size: 1rem;

    ::v-deep(img),
    ::v-deep(.font-icon) {
      margin: 0 calc(($chip-height-lg - $chip-icon-lg) / -2);
    }

    :v-deep(img) {
      width: $chip-icon-lg;
      height: $chip-icon-lg;
    }

    ::v-deep(.font-icon) {
      font-size: $chip-icon-lg;
    }
  }

  &.long {
    min-width: 100px;
  }

  &.rounded {
    border-radius: 9999px;
  }

  &.status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: initial;
    padding: 0;
    border-radius: none;
    background: none;
    user-select: auto;

    &::before {
      content: '';
      display: inline-block;
      flex: 0 0 auto;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background-color: $color-muted;

      @include darkmode {
        background-color: $color-muted;
      }
    }
  }

  &.check {
    position: relative;
    vertical-align: top;
    min-width: initial;
    height: $icon-size;
    padding: 0 0 0 calc($icon-size + 0.5rem);
    border-radius: none;
    background: none;
    user-select: auto;

    font-size: 1rem;
    font-weight: normal;

    &::before {
      content: '';
      display: block;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: $icon-size;
      height: $icon-size;
      border-radius: 100%;
      background-color: $color-muted;

      @include darkmode {
        background-color: $color-muted;
      }
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 2;
      top: 3px;
      left: 8px;
      margin: auto;
      width: 8px;
      height: 16px;
      border-bottom: 2px solid white;
      border-right: 2px solid white;
      transform: rotate(45deg) scale(0.7);
    }
  }

  &.badge {
    position: absolute;
    z-index: 100;
    min-width: $icon-size;
    height: $icon-size;
    right: calc($icon-size / -3);
    top: calc($icon-size / -3);
    border-radius: 999px;
    padding: 0 0.25rem;
    font-size: 11px;
    color: white;
    background-color: $color-primary;
  }

  // Color
  &.text {
    &:not(.default) {
      background-color: $bgColor;
      color: $textColor;
    }

    &.default {
      background-color: $color-muted-bg;
      color: $color-body;

      @include darkmode {
        background-color: $dark-color-muted-bg;
        color: $dark-color-body;
      }
    }
  }

  &.bg {
    &:not(.default) {
      background-color: $bgColor;
      color: $textColor;
    }

    &.default {
      background-color: $color-body;
      color: $dark-color-body;

      @include darkmode {
        background-color: $dark-color-body;
        color: $color-body;
      }
    }
  }

  &.border {
    &:not(.default) {
      color: $textColor;
      background-color: transparent;
      border-color: $textColor;
    }

    &.default {
      color: $color-body;
      background-color: transparent;
      border-color: $color-body;

      @include darkmode {
        color: $dark-color-body;
        border-color: $dark-color-body;
      }
    }
  }

  &.status {
    &::before {
      background-color: $bgColor;
    }
  }

  &.check {
    &::before {
      background-color: $bgColor;
    }

    &::after {
      border-color: $textColor;
    }
  }

  &.badge {
    color: $textColor;
    background-color: $bgColor;
  }
}

a.chip {
  @include transition((color, border, background));
  @include focusMouse {
    text-decoration: none;
    color: $color-body;
    border-color: $color-border;

    @include darkmode {
      color: $dark-color-body;
      border-color: $dark-color-border;
    }
  }

  &.text {
    &:not(.default) {
      @include focusMouse {
        background-color: $bgColor;
        color: $textColor;
        border-color: $textColor;
      }
    }

    &.default {
      @include focusMouse {
        border-color: $color-body;

        @include darkmode {
          border-color: $dark-color-body;
        }
      }
    }
  }

  &.bg {
    &:not(.default) {
      @include focusMouse {
        background-color: transparent;
        color: $bgColor;
        border-color: $bgColor;
      }
    }

    &.default {
      @include focusMouse {
        background-color: $color-muted-bg;
        color: $color-body;
        border-color: $color-body;

        @include darkmode {
          background-color: $dark-color-muted-bg;
          color: $dark-color-body;
          border-color: $dark-color-body;
        }
      }
    }
  }

  &.border {
    &:not(.default) {
      @include focusMouse {
        background-color: $bgColor;
        color: $textColor;
      }
    }

    &.default {
      @include focusMouse {
        background-color: $color-muted-bg;
        color: $color-body;

        @include darkmode {
          background-color: $dark-color-muted-bg;
          color: $dark-color-body;
        }
      }
    }
  }
}
</style>
