<script setup lang="ts">
import { variables } from '@/lib/styleUtl'

import Loader from '@/components/ui/Loader.vue'
import Icon from '@/components/ui/Icon.vue'

// *******************************************************************************
// Variables
// *******************************************************************************
const props = defineProps<{
  model: string
  type?: 'submit' | 'button'
  color?: string
  href?: string
  target?: string
  title?: string
  loading?: boolean
  disabled?: boolean
  starticon?: string
  endicon?: string
}>()

const emit = defineEmits(['click'])

// *******************************************************************************
// Hooks
// *******************************************************************************
const buttonClass = computed<string>(() => {
  const arr = ['btn']
  props.model && arr.push(props.model)
  props.loading && arr.push('connecting')
  props.disabled && arr.push('disabled')
  props.color === 'default' && arr.push('default')
  return arr.join(' ')
})

const loaderColor = computed<string>(() => {
  if (props.model?.includes('bg')) {
    return props.color === 'white' ? 'primary' : 'white'
  } else if (props.model?.includes('border')) {
    return props.color === 'white' ? 'white' : props.color ? props.color : 'primary'
  } else {
    return 'primary'
  }
})

const textColor = computed<string>(() => {
  if (!props.color || props.color === 'default') return ''

  if (props.model.includes('bg')) {
    return props.color === 'white' ? variables.theme.bodyColor : 'white'
  } else {
    return variables.color[props.color]
  }
})

const bgColor = computed<string>(() => {
  if (!props.color || props.color === 'default') return ''

  if (props.model.includes('border')) {
    return variables.lightColor[props.color]
  } else {
    return variables.color[props.color]
  }
})
</script>

<template>
  <a
    v-if="props.href && props.target"
    :href="props.href"
    :target="props.target"
    :class="buttonClass"
    :title="props.loading ? 'connecting...' : props.title"
    @click="emit('click', $event)"
  >
    <Loader v-if="props.loading" model="spin" :color="loaderColor" />

    <template v-else>
      <span v-if="props.starticon" class="icon">
        <Icon :value="props.starticon" />
      </span>

      <span class="text">
        <slot v-if="$slots.default" />
        <template v-else>{{ props.title }}</template>
      </span>

      <span v-if="props.endicon" class="icon">
        <Icon :value="props.endicon" />
      </span>
    </template>
  </a>

  <NuxtLink
    v-else-if="props.href"
    :to="props.href"
    :class="buttonClass"
    :title="props.loading ? 'connecting...' : props.title"
    @click="emit('click', $event)"
  >
    <Loader v-if="props.loading" model="spin" :color="loaderColor" />

    <template v-else>
      <span v-if="props.starticon" class="icon">
        <Icon :value="props.starticon" />
      </span>

      <span class="text">
        <slot v-if="$slots.default" />
        <template v-else>{{ props.title }}</template>
      </span>

      <span v-if="props.endicon" class="icon">
        <Icon :value="props.endicon" />
      </span>
    </template>
  </NuxtLink>

  <button
    v-else
    :type="props.type ? props.type : 'button'"
    :class="buttonClass"
    :aria-label="props.loading ? 'connecting...' : props.title"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <Loader v-if="props.loading" model="spin" :color="loaderColor" />

    <template v-else>
      <span v-if="props.starticon" class="icon">
        <Icon :value="props.starticon" />
      </span>

      <span class="text">
        <slot v-if="$slots.default" />
        <template v-else>{{ props.title }}</template>
      </span>

      <span v-if="props.endicon" class="icon">
        <Icon :value="props.endicon" />
      </span>
    </template>
  </button>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

$textColor: v-bind('textColor');
$bgColor: v-bind('bgColor');

@mixin blockIcon() {
  padding-left: calc($button-padding-x + $icon-size);
  padding-right: calc($button-padding-x + $icon-size);

  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;

    &:first-child {
      left: calc($button-padding-x / 2);
    }

    &:last-child {
      right: calc($button-padding-x / 2);
    }
  }
}

@mixin blockBtn() {
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  @include blockIcon;
}

@mixin longBtn() {
  min-width: 240px;
  @include blockIcon;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: $button-padding-x;
  flex: 0 0 auto;

  position: relative;
  z-index: 2;
  user-select: none;
  cursor: pointer;

  line-height: $icon-size;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: top;
  @include textKerning;

  color: inherit;
  border: none;
  box-shadow: $input-box-shadow;
  @include rounded;
  @include transition((color, background, border, box-shadow));

  &::after {
    content: '';
    position: absolute;
    z-index: 5;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: $border-width solid transparent;
    @include rounded;
    @include transition((opacity, border));
    opacity: 0;
  }

  // Default color
  background-color: $color-muted-bg;
  @include darkmode {
    background-color: $dark-color-muted-bg;
  }

  // Default size
  min-width: $input-height-md;
  font-size: $input-fontsize-md;
  padding: $button-padding-md $button-padding-x;

  &:active {
    transition: none;
    transform: scale(0.98);
    transform-origin: center bottom;
  }

  &.connecting {
    pointer-events: none;
  }

  &.disabled,
  &:disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.3;
    box-shadow: none;

    .show {
      animation: none !important;
    }

    &:active {
      transform: none;
    }
  }

  .text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc($button-padding-x / 2);
  }

  .icon {
    flex: 0 0 auto;
    height: $icon-size;
    margin-left: calc($button-padding-x / -2);
    margin-right: calc($button-padding-x / -2);
  }

  // Color
  &.bg {
    &:not(.default) {
      background: $bgColor;
      color: $textColor;

      &::after {
        border-color: black;
        mix-blend-mode: multiply;
      }

      @include focusMouse {
        &::after {
          opacity: 0.3;
        }
      }
    }

    &.default {
      background-color: $color-headings;
      color: $dark-color-body;

      &::after {
        border-color: $color-link-hover;
      }

      @include focusMouse {
        &::after {
          opacity: 1;
        }
      }

      @include darkmode {
        background-color: $dark-color-headings;
        color: $color-body;
      }
    }
  }

  &.border {
    &::after {
      opacity: 1;
    }

    &:not(.default) {
      background-color: transparent;
      color: $textColor;

      &::after {
        border: $border-width solid $textColor;
      }

      @include focusMouse {
        color: $textColor;
        background-color: $bgColor;

        &::after {
          border-color: $textColor;
        }
      }
    }

    &.default {
      background-color: transparent;
      color: $color-body;

      &::after {
        border: $border-width solid $color-border;
      }

      @include darkmode {
        color: $dark-color-body;

        &::after {
          border-color: $dark-color-border;
        }
      }

      @include focusMouse {
        background-color: $color-muted-bg;
        color: $color-link-hover;

        @include darkmode {
          background-color: $dark-color-muted-bg;
        }

        &::after {
          border-color: $color-link-hover;
        }
      }
    }
  }

  &.link {
    background-color: transparent;
    color: $textColor;
    border-color: transparent;
    box-shadow: none !important;

    @include focusMouse {
      background-color: $color-muted-bg;
      color: $textColor;
      border-color: transparent;

      @include darkmode {
        background-color: $dark-color-muted-bg;
      }
    }
  }

  // Model
  &.sm {
    min-width: $input-height-sm;
    font-size: $input-fontsize-sm;
    padding: $button-padding-sm $button-padding-x;

    ::v-deep(.font-icon) {
      transform: scale(0.75);
    }
  }

  &.lg {
    min-width: $input-height-lg;
    font-size: $input-fontsize-lg;
    padding: $button-padding-lg $button-padding-x;
  }

  &.icon {
    padding-left: 0;
    padding-right: 0;
  }

  &.rounded {
    border-radius: 9999px;

    &::after {
      border-radius: 9999px;
    }
  }

  &.block {
    @include blockBtn;
  }

  &.blockUp {
    @include breakpointUp {
      @include blockBtn;
    }
  }

  &.blockDown {
    @include breakpointDown {
      @include blockBtn;
    }
  }

  &.long {
    @include longBtn;
  }

  &.longUp {
    @include breakpointUp {
      @include longBtn;
    }
  }

  &.longDown {
    @include breakpointDown {
      @include longBtn;
    }
  }
}
</style>
