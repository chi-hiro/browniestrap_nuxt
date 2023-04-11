<script setup lang="ts">
//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  model?: string
  name: string
  modelValue: number
  min?: number
  max?: number
  step?: number
}>()

const state = reactive({
  size: 'md',
  value: 1,
  oldValue: 1,
  min: 1,
})

const emit = defineEmits(['update:modelValue'])

//*******************************************************************************
// Methods
//*******************************************************************************
const update = (newValue: number) => {
  emit('update:modelValue', newValue)
}

const checkValue = (newValue: string) => {
  if (!/^([1-9]\d*|0)$/.test(newValue)) {
    let newValueNum = newValue.length ? state.oldValue : 0
    state.value = newValueNum
    state.oldValue = newValueNum
    return
  }

  let newValueNum = Number(newValue)
  if (props.max && newValueNum > props.max) newValueNum = props.max
  if (newValueNum < state.min) newValueNum = state.min
  state.value = newValueNum
  state.oldValue = newValueNum
  update(newValueNum)
}

const calcValue = (dir: string) => {
  let newValue: number = state.value

  switch (dir) {
    case '+':
      newValue += props.step ? props.step : 1
      if (props.max && newValue > props.max) newValue = props.max
      break

    case '-':
      newValue -= props.step ? props.step : 1
      if (newValue < state.min) newValue = state.min
      break
  }

  state.value = newValue
  state.oldValue = newValue
  update(newValue)
}

//*******************************************************************************
// Hooks
//*******************************************************************************
const inputClass = computed<string[]>(() => {
  const arr = ['quantity-input', state.size]
  return arr
})

const buttonClass = computed<string[]>(() => {
  const arr = ['quantity-btn', state.size]
  return arr
})

onMounted(() => {
  state.size = props.model ? props.model : 'md'
  if (props.modelValue) state.value = props.modelValue
  if (props.min) state.min = props.min
})

watchEffect(() => {
  state.value = props.modelValue
})
</script>

<template>
  <div class="quantity">
    <button type="button" :class="buttonClass" :disabled="state.value <= state.min" @click="calcValue('-')">-</button>

    <input
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      :class="inputClass"
      :name="props.name"
      :id="`quantity-${props.name}`"
      :min="props.min ? props.min : state.min"
      :max="props.max"
      :step="props.step ? props.step : 1"
      v-model="state.value"
      @blur="checkValue(($event.target as HTMLInputElement).value)"
      :aria-label="props.name"
    />

    <button
      type="button"
      :class="buttonClass"
      :disabled="props.max && state.value === props.max ? true : false"
      @click="calcValue('+')"
    >
      +
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

.quantity {
  display: flex;
  align-items: center;
}

.quantity-input {
  flex: 0 0 auto;
  appearance: none;
  display: inline-block;
  width: 56px;
  text-align: center;
  line-height: $icon-size;
  color: $color-body;
  background-color: white;
  background-image: none;
  background-clip: padding-box;
  border: $border-width solid $color-input-border;

  @include darkmode {
    color: $dark-color-body;
    background-color: black;
    border-color: $dark-color-input-border;
  }

  &:focus {
    color: $color-body;
    border-color: $color-body;

    @include darkmode {
      color: $dark-color-body;
      border-color: $dark-color-body;
    }
  }

  &::placeholder {
    color: $color-muted;
    opacity: 1;

    @include darkmode {
      color: $dark-color-muted;
    }
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: $color-body;
    caret-color: $color-body;
    transition: background 9999s;

    @include darkmode {
      -webkit-text-fill-color: $dark-color-body;
      caret-color: $dark-color-body;
    }
  }

  &:disabled,
  &[readonly] {
    background-color: $color-muted-bg;
    border-color: $color-muted-bg;
    opacity: 1;
    box-shadow: none;

    @include darkmode {
      background-color: $dark-color-muted-bg;
      border-color: $dark-color-muted-bg;
    }
  }

  &:disabled {
    color: $color-muted;

    @include darkmode {
      color: $dark-color-muted;
    }
  }

  // Model
  &.md {
    @include inputSize(md);
  }

  &.sm {
    @include inputSize(sm);
  }

  &.lg {
    @include inputSize(lg);
  }
}

.quantity-btn {
  flex: 0 0 auto;
  @include buttonReset;
  border: $border-width solid $color-input-border;
  font-size: 1rem;
  text-align: center;

  @include darkmode {
    border-color: $dark-color-input-border;
  }

  @include focusMouse {
    color: $color-link-hover;
    background-color: $color-muted-bg;

    @include darkmode {
      background-color: $dark-color-muted-bg;
    }
  }

  &:first-child {
    border-right: none;
    @include roundedLeft($input-border-radius);
  }

  &:last-child {
    border-left: none;
    @include roundedRight($input-border-radius);
  }

  &:disabled {
    pointer-events: none;
    color: transparent;
  }

  // Model
  &.md {
    @include inputSize(md);
  }

  &.sm {
    @include inputSize(sm);
  }

  &.lg {
    @include inputSize(lg);
  }
}
</style>
