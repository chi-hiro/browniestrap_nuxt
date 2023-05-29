<script setup lang="ts">
import { variables } from '@/lib/styleUtl'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  type?: string
  name: string
  value: string
  modelValue?: any
  disabled?: boolean
  label: string
  model?: string
  color?: string
}>()

const emit = defineEmits(['update:modelValue'])

//*******************************************************************************
// Methods
//*******************************************************************************
const update = (value: boolean) => {
  if (props.type === 'radio') {
    value && emit('update:modelValue', props.value)
  } else {
    emit('update:modelValue', value)
  }
}

//*******************************************************************************
// Hooks
//*******************************************************************************
const checkboxClass = computed<string>(() => {
  const arr = ['checkbox']
  props.model && arr.push(props.model)
  return arr.join(' ')
})

const colorVariant = computed<string>(() => {
  return props.color ? variables.color[props.color] : variables.color['primary']
})

const lightVariant = computed<string>(() => {
  return props.color ? variables.lightColor[props.color] : variables.lightColor['primary']
})

const isChecked = computed<boolean | undefined>(() => {
  if (props.type === 'radio') {
    return props.modelValue === props.value
  } else {
    return props.modelValue
  }
})
</script>

<template>
  <div :class="checkboxClass">
    <input
      :type="props.type ? props.type : 'checkbox'"
      :name="props.name"
      :id="props.value"
      :value="props.value"
      :checked="isChecked"
      :disabled="props.disabled"
      @change="update(($event.target as HTMLInputElement).checked)"
    />

    <label :for="props.value">
      {{ props.label }}
    </label>
  </div>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

$colorVariant: v-bind('colorVariant');
$lightVariant: v-bind('lightVariant');

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type='checkbox'],
  input[type='radio'] {
    flex: 0 0 auto;
    appearance: none;
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: $icon-size;
    height: $icon-size;
    border: 2px solid $color-input-border;

    @include darkmode {
      border-color: $dark-color-input-border;
    }

    &::after {
      content: '';
      position: absolute;
      z-index: 2;
      opacity: 0;
    }

    @include focusMouse {
      border-color: $color-body;

      @include darkmode {
        border-color: $dark-color-body;
      }

      &::after {
        opacity: 0.2;
      }
    }

    &:checked {
      background-color: $colorVariant;
      border-color: transparent;

      &::after {
        opacity: 1;
      }

      @include focusMouse {
        border-color: $color-input-border;

        @include darkmode {
          border-color: $dark-color-input-border;
        }
      }
    }

    &:disabled {
      pointer-events: none;

      + label {
        pointer-events: none;
        color: $color-muted;

        @include darkmode {
          color: $color-muted;
        }
      }
    }
  }

  input[type='checkbox'] {
    @include rounded(4px);

    &::after {
      top: 2px;
      left: 7px;
      width: 6px;
      height: 12px;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      transform: rotate(45deg);
    }

    &:checked {
      &::after {
        border-color: white;
      }
    }
  }

  input[type='radio'] {
    border-radius: 100px;

    &::after {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 10px;
      height: 10px;
      border-radius: 100px;
      background-color: black;
    }

    &:checked {
      &::after {
        background-color: white;
      }
    }
  }

  label {
    flex: 0 0 auto;
    cursor: pointer;
    margin: 0;
    color: $color-body;
    font-size: $input-fontsize-md;
    font-weight: normal;
    line-height: 1.5;

    @include darkmode {
      color: $dark-color-body;
    }
  }

  // Model
  &.box {
    position: relative;

    input[type='checkbox'],
    input[type='radio'] {
      display: none;

      &:checked {
        + label {
          border-color: $color-primary;
        }
      }
    }

    label {
      display: block;
      width: 100%;
      line-height: $icon-size;
      text-align: center;
      color: $color-body;
      background-color: transparent;
      border: $border-width solid $color-body;

      @include rounded($input-border-radius);

      @include darkmode {
        color: $dark-color-body;
        border-color: $dark-color-body;
      }
    }

    &.md {
      label {
        @include inputSize(md);
      }
    }

    &.sm {
      label {
        @include inputSize(sm);
      }
    }

    &.lg {
      label {
        @include inputSize(lg);
      }
    }
  }
}
</style>
