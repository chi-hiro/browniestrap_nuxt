<script setup lang="ts">
import { variables } from '@/lib/styleUtl'
import Icon from '@/components/ui/Icon.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  type?: string
  model?: string
  name: string
  modelValue?: string | number | FileList
  option?: Array<{ value: string | number; label?: string }>
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  maxlength?: number
  readonly?: boolean
  accept?: string
  help?: string
  feedback?: { color: string; message?: string }
  starticon?: string
  endicon?: string
}>()

const state = reactive<{
  size: string
  isFocus: boolean
  value: string | number | FileList | undefined
  length: number
  passType: 'password' | 'text'
}>({
  size: 'md',
  isFocus: false,
  value: undefined,
  length: 0,
  passType: 'password',
})

const emit = defineEmits(['update:modelValue'])

const textareaRef = ref<HTMLTextAreaElement | null>(null)

//*******************************************************************************
// Methods
//*******************************************************************************
const togglePassword = () => {
  state.passType = state.passType === 'password' ? 'text' : 'password'
}

const isForceFocus = () => {
  return props.disabled || props.readonly || props.feedback || props.type === 'select'
}

const resizeInput = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height =
      textareaRef.value.scrollHeight > textareaRef.value.offsetHeight
        ? `${textareaRef.value.scrollHeight}px`
        : `${variables.input[state.size].height}px`
  }
}

const update = (value: string | number | FileList | null) => {
  state.isFocus = isForceFocus() ? true : String(value).length > 0 ? true : false
  if (props.type !== 'select' && props.maxlength) state.length = String(value).length
  if (props.type === 'textarea') resizeInput()
  emit('update:modelValue', value)
}

//*******************************************************************************
// Hooks
//*******************************************************************************
const boxClass = computed<string>(() => {
  const arr = ['textfield', props.model ? props.model : 'md']
  props.feedback && arr.push('feedback')
  props.starticon && arr.push('with-starticon')
  if (props.endicon || props.type === 'password') arr.push('with-endicon')
  if (state.isFocus || props.type === 'file') arr.push('focused')
  return [...new Set(arr.join(' ').split(' '))].join(' ')
})

const inputClass = computed<string>(() => {
  const arr = ['textfield-input', state.size]
  return arr.join(' ')
})

const labelClass = computed<string>(() => {
  const arr = ['textfield-label', state.size]
  return arr.join(' ')
})

const feedbackColor = computed<string>(() => {
  return props.feedback ? variables.color[props.feedback.color] : ''
})

onMounted(() => {
  const modelList = props.model?.split(' ')
  if (modelList?.includes('sm')) state.size = 'sm'
  if (modelList?.includes('lg')) state.size = 'lg'

  if (props.modelValue) {
    state.value = props.modelValue
    update(props.modelValue)
  } else {
    if (props.type === 'select' && props.option) state.value = props.option[0].value
  }
  if (isForceFocus()) state.isFocus = true
})

watchEffect(() => {
  state.value = props.modelValue
  nextTick(() => update(props.modelValue || ''))
})
</script>

<template>
  <div :class="boxClass">
    <select
      v-if="props.type === 'select'"
      :class="inputClass"
      :name="props.name"
      :id="`textfield-${props.name}`"
      :required="props.required"
      :disabled="props.disabled"
      v-model="state.value"
      @input="update(($event.target as HTMLSelectElement).value)"
    >
      <option v-for="item in props.option" :key="item.value" :value="item.value">
        {{ item.label ? item.label : item.value }}
      </option>
    </select>

    <textarea
      v-else-if="props.type === 'textarea'"
      :class="inputClass"
      ref="textareaRef"
      rows="1"
      :name="props.name"
      :id="`textfield-${props.name}`"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      :readOnly="props.readonly"
      :max-length="props.maxlength"
      v-model="(state.value as string)"
      @input="update(($event.target as HTMLTextAreaElement).value)"
    />

    <input
      v-else-if="props.type === 'file'"
      :class="inputClass"
      type="file"
      :name="props.name"
      :id="`textfield-${props.name}`"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      :readOnly="props.readonly"
      :accept="props.accept"
      @input="update(($event.target as HTMLInputElement).files)"
    />

    <span v-else-if="props.type === 'static'" :class="inputClass">
      {{ state.value }}
    </span>

    <input
      v-else
      :class="inputClass"
      :type="props.type ? (props.type === 'password' ? state.passType : props.type) : 'text'"
      :name="props.name"
      :autocomplete="props.name"
      :id="`textfield-${props.name}`"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      :readOnly="props.readonly"
      :max-length="props.maxlength"
      v-model="state.value"
      @input="update(($event.target as HTMLInputElement).value)"
    />

    <label v-if="props.label || props.feedback || props.maxlength" :class="labelClass">
      {{ props.label }}
      {{ props.required ? '*' : '' }}
      <span v-if="props.maxlength" class="length">({{ state.length }}/{{ props.maxlength }})</span>
    </label>

    <span v-if="props.starticon" class="icon starticon">
      <Icon :value="props.starticon" />
    </span>

    <span v-if="props.endicon" class="icon endicon">
      <Icon :value="props.endicon" />
    </span>

    <button v-if="props.type === 'password'" class="icon endicon" type="button" tab-index="-1" @click="togglePassword">
      <Icon :value="state.passType === 'password' ? 'visibility_off' : 'visibility'" />
    </button>

    <span v-if="props.feedback?.message" :class="['textfield-feedback', state.size]">
      <Icon value="error" />
      {{ props.feedback.message }}
    </span>

    <small v-if="props.help" class="textfield-help">{{ props.help }}</small>
  </div>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

$feedbackColor: v-bind('feedbackColor');

@mixin focusLabelStyle() {
  top: calc(0.875rem / -2 + $border-width / 2);
  left: calc($input-padding-x + $border-width - 0.25rem);
  padding: 0 0.25rem !important;
  font-size: 0.875rem;
  height: auto;
  line-height: 1;
  color: inherit;
  background-color: darken($color-body-bg, 2%);
  pointer-events: none;

  display: flex;
  align-items: flex-end;
  gap: 0.25rem;

  @include darkmode {
    background-color: darken($dark-color-body-bg, 2%);
  }

  .length {
    display: inline-block;
  }

  &.sm {
    top: calc(0.75rem / -2 + $border-width / 2);
    font-size: 0.75rem;
  }
}

.textfield {
  position: relative;
  align-self: flex-start;

  .font-icon {
    transform: scale(0.75);
  }

  .icon {
    display: inline-block;
    position: absolute;
    z-index: 2;
    top: 0;
    pointer-events: none;

    img {
      width: 24px;
      height: 24px;
      object-fit: cover;
    }

    &.starticon {
      left: 0;
    }

    &.endicon {
      right: 0;
    }
  }

  button.icon {
    pointer-events: auto;
    appearance: none;
    border: none;
    background: none;
    cursor: pointer;
    display: block;

    @include hoverMouse {
      color: $color-link-hover;
    }
  }

  // Model
  &.focused {
    label {
      @include focusLabelStyle;
    }
  }

  &.feedback {
    label {
      @include focusLabelStyle;
      color: $feedbackColor;
    }

    .textfield-feedback {
      user-select: none;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      background-color: $feedbackColor;
      border-radius: 0.25rem;
      position: absolute;
      z-index: 10;
      bottom: calc($icon-size / -2 + $border-width / 2);
      left: 0;
      max-width: 80%;
      min-height: $icon-size;
      margin: 0 0.5rem;
      padding: 0 0.25rem;

      color: #ffffff;
      font-size: 0.875rem;
      font-weight: bold;
      line-height: 1.3;

      ::v-deep(.font-icon) {
        transform: none;
        font-size: 16px;
      }

      &.sm {
        font-size: 0.75rem;
      }
    }

    .textfield-input {
      border-color: $feedbackColor;

      &:focus {
        + label {
          color: $feedbackColor;
        }
      }
    }
  }

  &.md {
    &.with-starticon {
      .textfield-input,
      .textfield-label {
        padding-left: $input-height-md;
      }
    }

    &.with-endicon {
      .textfield-input,
      .textfield-label {
        padding-right: $input-height-md;
      }
    }

    .icon {
      width: $input-height-md;
      height: $input-height-md;
      padding: calc(($input-height-md - $icon-size) / 2);
    }
  }

  &.sm {
    &.with-starticon {
      .textfield-input,
      .textfield-label {
        padding-left: $input-height-sm;
      }
    }

    &.with-endicon {
      .textfield-input,
      .textfield-label {
        padding-right: $input-height-sm;
      }
    }

    .icon {
      width: $input-height-sm;
      height: $input-height-sm;
      padding: calc(($input-height-sm - $icon-size) / 2);
    }
  }

  &.lg {
    &.with-starticon {
      .textfield-input,
      .textfield-label {
        padding-left: $input-height-lg;
      }
    }

    &.with-endicon {
      .textfield-input,
      .textfield-label {
        padding-right: $input-height-lg;
      }
    }

    .icon {
      width: $input-height-lg;
      height: $input-height-lg;
      padding: calc(($input-height-lg - $icon-size) / 2);
    }
  }
}

.textfield-input {
  appearance: none;
  display: block;
  width: 100%;
  line-height: $icon-size;
  color: $color-body;
  background-color: darken($color-body-bg, 2%);
  background-image: none;
  background-clip: padding-box;
  border: $border-width solid $color-input-border;

  @include rounded($input-border-radius);

  @include darkmode {
    color: $dark-color-body;
    background-color: darken($dark-color-body-bg, 2%);
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

  &:-webkit-autofill,
  &[data-com-onepassword-filled='light'] {
    -webkit-text-fill-color: $color-body;
    caret-color: $color-body;
    box-shadow: 0 0 0 1000px darken($color-body-bg, 2%) inset;

    @include darkmode {
      -webkit-text-fill-color: $dark-color-body;
      caret-color: $dark-color-body;
      box-shadow: 0 0 0 1000px darken($dark-color-body-bg, 2%) inset;
    }
  }

  &:disabled,
  &[readonly] {
    background-color: $color-muted-bg;
    opacity: 1;
    box-shadow: none;

    @include darkmode {
      background-color: $dark-color-muted-bg;
    }
  }

  &[readonly] {
    border-color: transparent;

    @include darkmode {
      border-color: transparent;
    }
  }

  &:disabled {
    border-color: $color-border;
    color: $color-muted;

    @include darkmode {
      border-color: $dark-color-muted-bg;
      color: $dark-color-muted;
    }
  }

  &:focus + label {
    @include focusLabelStyle;
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

textarea.textfield-input {
  resize: none;
  height: auto;
}

select.textfield-input {
  cursor: pointer;

  &:not([multiple]) {
    background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%228%22%20height%3D%2210%22%20viewBox%3D%220%200%208%2010%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M4%200l4%204h-8l4-4zm0%2010l-4-4h8l-4%204z%22%20fill%3D%22' + base64Encode(
        #909090
      ) + '%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-size: 8px 10px;
    background-position: right 0.5rem center;
    padding-right: calc($input-padding-x + 1rem) !important;
  }

  &[multiple] {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    height: auto !important;
  }
}

input[type='file'].textfield-input {
  line-height: 18px;
  cursor: pointer;
  white-space: nowrap;
}

span.textfield-input {
  border-color: transparent;
  background-color: transparent;

  + .textfield-label {
    background-color: transparent;
  }
}

.textfield-label {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  pointer-events: none;

  font-weight: normal;
  color: $color-muted;
  line-height: $icon-size;
  display: flex;
  align-items: center;
  margin: 0;

  @include darkmode {
    color: $dark-color-muted;
  }

  ::v-deep(.chip) {
    vertical-align: top;
    margin: 0 0.25rem;
    padding: 0 0.25rem;
    line-height: 18px;
  }

  .length {
    display: none;
  }

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

.textfield-help {
  display: block;
  color: $color-muted;
  margin-top: 0.25rem;

  @include darkmode {
    color: $dark-color-muted;
  }
}
</style>
