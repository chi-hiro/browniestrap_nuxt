<script setup lang="ts">
import { computed } from 'vue'
import { variables } from '@/lib/styleUtl'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  name: string
  value: string
  modelValue: boolean
  label: string
  color?: string
}>()

const emit = defineEmits(['update:modelValue'])

//*******************************************************************************
// Hooks
//*******************************************************************************
const colorVariant = computed<string>(() => {
  return props.color ? variables.color[props.color] : variables.color['primary']
})
</script>

<template>
  <input
    class="switch"
    type="checkbox"
    :name="props.name"
    :id="props.value"
    :value="props.value"
    :checked="props.modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    :aria-label="props.label"
  />
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

$colorVariant: v-bind('colorVariant');

.switch {
  appearance: none;
  cursor: pointer;
  display: block;
  position: relative;
  width: $icon-size * 2;
  height: $icon-size;
  background-color: $color-input-border;
  border: 2px solid transparent;
  border-radius: 9999px;
  transition: background 100ms $easing, border 100ms $easing;

  @include focusMouse {
    border-color: $color-body;
  }

  @include darkmode {
    background-color: $dark-color-input-border;

    @include focusMouse {
      border-color: $dark-color-body;
    }
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 3;
    top: calc((($icon-size - 5px) / 4) - ($border-width / 2));
    right: calc(($icon-size - 10px) / 2);
    width: 5px;
    height: 10px;
    border-bottom: $border-width solid $colorVariant;
    border-right: $border-width solid $colorVariant;
    transform: rotate(45deg) scale(0);
    transition: transform 100ms $easing;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 2;
    top: calc(($icon-size - 22px) / 2);
    left: calc(($icon-size - 22px) / 2);
    width: 18px;
    height: 18px;
    border-radius: 9999px;
    background-color: white;
    transition: transform 100ms $easing;
  }

  &:checked {
    background-color: $colorVariant;

    @include focusMouse {
      border-color: rgba(0, 0, 0, 0.3);
    }

    @include darkmode {
      @include focusMouse {
        border-color: white;
      }
    }

    &::before {
      transform: rotate(45deg) scale(1);
    }

    &::after {
      transform: translateX($icon-size);
    }
  }
}
</style>
