<script setup lang="ts">
import { ref, reactive, watchEffect, computed } from 'vue'
import { env } from '@/lib/env'
import Icon from '@/components/ui/Icon.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  model?: string
  title?: string
  href?: string
  hover?: boolean
  opened?: boolean
  locked?: boolean
}>()

const state = reactive({
  isShow: props.opened ? true : false,
})

const el = ref<HTMLDivElement | null>(null)

//*******************************************************************************
// Methods
//*******************************************************************************
const toggle = (e: Event) => {
  const target = e.currentTarget as HTMLElement

  if (!props.href) {
    target.blur()
  } else {
    window.location.href = props.href
  }

  if (!props.locked) state.isShow = !state.isShow
}

const show = () => {
  if (!props.locked) state.isShow = true
}

const hide = () => {
  if (!props.locked) state.isShow = false
}

const showHover = () => {
  if (props.hover && !env('touch')) show()
}

const hideHover = () => {
  if (props.hover) hide()
}

const beforeEnter = (e: HTMLElement) => (e.style.height = '0')
const enter = (e: HTMLElement) => (e.style.height = e.scrollHeight + 'px')
const afterEnter = (e: HTMLElement) => (e.style.height = '')
const beforeLeave = (e: HTMLElement) => (e.style.height = e.scrollHeight + 'px')
const leave = (e: HTMLElement) => (e.style.height = '0')

//*******************************************************************************
// Hooks
//*******************************************************************************
const expansionClass = computed<string>(() => {
  const arr = ['expansion']
  props.model && arr.push(props.model)
  state.isShow && arr.push('show')
  props.locked && arr.push('lock')
  return arr.join(' ')
})

const expansionIcon = computed<string>(() => {
  switch (props.model) {
    case 'popup':
      return 'more_horiz'
    case 'border':
      return state.isShow ? 'remove' : 'add'
    default:
      return 'expand_more'
  }
})

watchEffect(() => {
  if (props.model === 'popup') {
    state.isShow
      ? window.setTimeout(() => document.body.addEventListener('click', hide), 300)
      : document.body.removeEventListener('click', hide)
  }
})
</script>

<template>
  <div :class="expansionClass" @mouseleave="hideHover" ref="el">
    <button
      type="button"
      class="expansion-toggler"
      @click="toggle"
      @mouseenter="showHover"
      :tabindex="props.locked ? '-1' : '0'"
      :aria-label="props.title"
    >
      <template v-if="props.model !== 'popup' && props.title">
        {{ props.title }}
      </template>

      <span class="icon" v-if="!props.locked">
        <Icon :value="expansionIcon" />
      </span>
    </button>

    <transition
      name="expansion"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-if="state.isShow" class="expansion-body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

.expansion {
  position: relative;

  .expansion-toggler {
    @include buttonReset;
    position: relative;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    line-height: 1.5;
    color: $color-headings;
    @include transition(color);

    .icon {
      display: inline-block;
      vertical-align: top;
      flex: 0 0 auto;
      font-size: $icon-size;
      line-height: 0;
      @include transition(transform);

      > * {
        font-size: inherit;
      }
    }

    @include focusMouse {
      text-decoration: none;
      color: $color-link-hover;
    }

    @include darkmode {
      color: $dark-color-headings;

      &:hover {
        color: $dark-color-headings;
      }
    }
  }

  .expansion-body {
    position: relative;
    overflow: hidden;

    > *:last-child {
      margin-bottom: 0;
    }

    &.expansion-enter-active,
    &.expansion-leave-active {
      @include transition((height, transform));
      will-change: height, transform;

      #header & {
        @include breakpointUp {
          @include transition((transform, opacity));
          will-change: transform, opacity;
        }
      }
    }

    &.expansion-enter-from,
    &.expansion-leave-to {
      #header & {
        @include breakpointUp {
          transform: translateY(-10px);
          opacity: 0;
        }
      }
    }
  }

  &.show {
    .expansion-toggler {
      .icon {
        transform: rotate(180deg);
      }
    }
  }

  &.lock {
    .expansion-toggler {
      cursor: default;
      user-select: none;
    }
  }

  // Model
  &.border {
    border-top: 1px solid $color-border;
    border-bottom: 1px solid $color-border;

    .expansion-toggler {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      gap: 1rem;
      width: 100%;
      padding: 1.5rem 1rem;
      font-weight: 700;
      @include textKerning;
    }

    .expansion-body {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    @include darkmode {
      border-color: $dark-color-border;
    }

    @include transition(padding);

    &.show {
      padding-bottom: 2rem;
    }

    + * {
      border-top: none;
    }
  }

  &.popup {
    position: relative;
    display: block;

    .expansion-toggler {
      padding: calc(($component-height - $icon-size) / 2);
      border-radius: 999px;
      @include transition(color);

      .icon {
        position: static;
        width: $icon-size;
        height: $icon-size;
        font-size: $icon-size;
      }
    }

    .expansion-body {
      overflow: hidden;
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;
      min-width: 160px;
      @include rounded;
      box-shadow: $shadow-dark;

      background-color: $color-body-bg;

      @include darkmode {
        background-color: $dark-color-body-bg;
      }

      ::v-deep(ul) {
        margin: 0;
        padding: 0.5rem 0;
        list-style: none;

        a,
        button {
          @include buttonReset;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem 1.25rem;
          line-height: $icon-size;
          color: $color-body;
          white-space: nowrap;

          @include darkmode {
            color: $color-body;
          }

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

      &.expansion-enter-active,
      &.expansion-leave-active {
        ::v-deep(ul) {
          @include transition((transform, opacity));
          will-change: transform, opacity;
        }
      }

      &.expansion-enter-from {
        ::v-deep(ul) {
          transform: translateX(1rem);
          opacity: 0;
        }
      }

      &.expansion-leave-to {
        ::v-deep(ul) {
          opacity: 0;
        }
      }
    }

    &.show {
      .expansion-toggler {
        .icon {
          transform: none;
        }
      }
    }
  }
}
</style>
