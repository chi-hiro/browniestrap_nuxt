<script setup lang="ts">
import { Teleport as teleport_, TeleportProps, VNodeProps } from 'vue'
import { toggleScrollbarSpacer } from '@/lib/toggleScrollbarSpacer'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  scroll?: boolean
}>()

const state = reactive({
  isShow: false,
  isDouble: false,
  pos: [50, 50],
  scroller: {
    isShow: true,
    pos: 0,
    barH: 0,
  },
})

const Teleport = teleport_ as {
  new (): {
    $props: VNodeProps & TeleportProps
  }
}
const slots = useSlots()
const scroller = ref<HTMLDivElement | null>(null)

//*******************************************************************************
// Methods
//*******************************************************************************
const show = async (e: MouseEvent) => {
  if (e) {
    const x = Math.round((100 / window.innerWidth) * e.clientX)
    const y = Math.round((100 / window.innerHeight) * e.clientY)
    state.pos = [x, y]
  }

  state.isShow = true
  props.scroll && nextTick(() => setScroller())
  return await controlScrollbar(state.isShow)
}

const hide = async () => {
  state.isShow = false
  return await controlScrollbar(state.isShow)
}

const setScroller = () => {
  const inner = scroller.value!.querySelector('.modal-scrollbar-inner')!

  if ('ontouchstart' in window) {
    if (inner.scrollTop === 0) {
      inner.scrollTop = 1
    } else if (inner.scrollTop + inner.clientHeight === inner.scrollHeight) {
      inner.scrollTop = inner.scrollTop - 1
    }
  }

  const wrapperH = scroller.value!.offsetHeight
  const contentH = (inner.children[0] as HTMLElement).offsetHeight

  if (contentH <= 64) {
    window.setTimeout(() => setScroller(), 300)
  } else {
    let barH = Math.round((wrapperH * wrapperH) / contentH)
    if (barH < 20) barH = 20
    if (barH > wrapperH) barH = wrapperH

    if (barH >= wrapperH) {
      state.scroller.isShow = false
    } else {
      state.scroller.isShow = true
      state.scroller.barH = barH
      state.scroller.pos = Math.round((inner.scrollTop * (wrapperH - barH)) / (contentH - wrapperH))
    }
  }
}

const controlScrollbar = async (value: boolean) => {
  if (value) state.isDouble = document.body.classList.contains('hide_scrollbar') ? true : false

  if (state.isDouble) {
    return false
  } else {
    return await toggleScrollbarSpacer(value)
  }
}

//*******************************************************************************
// Hooks
//*******************************************************************************
const positionStyle = computed<{ [key: string]: string }>(() => {
  return { '--path': `${state.pos[0]}% ${state.pos[1]}%` }
})

defineExpose({
  show,
  hide,
})
</script>

<template>
  <component :is="Teleport" to="body">
    <transition name="modal">
      <div v-if="state.isShow" :class="`modal ${state.isDouble ? 'modal-double' : ''}`">
        <div class="modal-mask" :style="positionStyle">
          <div class="modal-inner">
            <div v-if="slots.header" class="modal-header">
              <h6 class="modal-header-title">
                <slot name="header" />
              </h6>

              <Button v-if="!slots.footer" model="md link icon" class="modal-close" @click="hide">
                <Icon value="close" />
              </Button>
            </div>

            <div v-if="slots.body" :class="['modal-body', { scroll: props.scroll }]">
              <div class="modal-scrollbar" v-if="props.scroll" ref="scroller">
                <div class="modal-scrollbar-inner" @scroll="setScroller">
                  <div class="inner">
                    <slot name="body" />
                  </div>
                </div>

                <span v-show="state.scroller.isShow" class="modal-scrollbar-bar">
                  <span
                    :style="{
                      height: `${state.scroller.barH}px`,
                      top: `${state.scroller.pos}px`,
                    }"
                  ></span>
                </span>
              </div>

              <div class="inner" v-else>
                <slot name="body" />
              </div>
            </div>

            <div v-if="slots.footer" class="modal-footer">
              <slot name="footer" />
            </div>
          </div>

          <span class="modal-over" @click="!slots.footer && hide()" />
        </div>
      </div>
    </transition>
  </component>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

.modal {
  position: fixed;
  z-index: $zindex-modal;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;

  @include overlay;

  &.modal-double {
    z-index: $zindex-modal + 1;
  }

  &.modal-enter-active {
    transition: opacity 300ms linear;
    will-change: opacity;
  }

  &.modal-leave-active {
    transition: opacity 200ms linear;
    will-change: opacity;
  }

  &.modal-enter-from {
    opacity: 0;
  }

  &.modal-leave-to {
    opacity: 0;
  }
}

.modal-mask {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  clip-path: circle(100% at var(--path));

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .modal-enter-active & {
    transition: clip-path 200ms linear;
    will-change: clip-path;
  }

  .modal-enter-from & {
    clip-path: circle(0% at var(--path));
  }
}

.modal-inner {
  position: relative;
  z-index: 2;
  width: 90vw;
  max-width: calc(500px + 2rem + 2rem);
  box-shadow: $shadow-light;

  > *:first-child {
    @include roundedTop;
  }

  > *:last-child {
    @include roundedBottom;
  }

  .modal-enter-active & {
    transition: transform 300ms $easeOutBack;
    will-change: transform;
  }

  .modal-leave-active & {
    transition: transform 200ms $easing;
    will-change: transform;
  }

  .modal-enter-from & {
    transform: scale(0.85);
  }

  .modal-leave-to & {
    transform: translateY(16px);
  }
}

.modal-over {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal-header {
  width: 100%;
  min-height: 3.5rem;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1rem;
  transform: translateZ(0);
  background-color: darken($color-body-bg, 2%);
  border-bottom: 1px solid $color-border;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;

  @include darkmode {
    background-color: lighten($dark-color-body-bg, 2%);
    border-color: $dark-color-border;
  }

  .modal-header-title {
    flex: 1 1 auto;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
    line-height: 1.3;
    color: $color-headings;
    margin: 0;

    @include darkmode {
      color: $dark-color-headings;
    }
  }

  .modal-close {
    margin: -0.5rem -0.25rem -0.5rem 0;
  }
}

.modal-body {
  width: 100%;
  max-height: 45vh;
  background-color: $color-body-bg;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  @include darkmode {
    background-color: $dark-color-body-bg;
  }

  &.scroll {
    display: block;
    height: 45vh;
    @include scrollY;

    &::-webkit-scrollbar {
      width: 12px;
    }
  }

  small {
    display: inline-block;
    color: $color-muted;
    font-size: 0.75rem;

    @include darkmode {
      color: $dark-color-muted;
    }
  }

  .inner {
    width: 100%;
    padding: 1.5rem;

    @include breakpointUp {
      padding: 2rem;
    }

    > *:last-child {
      margin-bottom: 0;
    }
  }

  ::v-deep(.divider) {
    margin: 1rem -1.5rem;
  }

  ::v-deep(.terms) {
    font-size: 0.875rem;

    > *:last-child {
      margin-bottom: 0;
    }

    * + h2 {
      margin-top: 2em;
    }

    h2 {
      font-size: 1.3em;
      margin-bottom: 0.5em;
    }

    h3 {
      font-size: 1.1em;
      margin-bottom: 0.5em;
    }
  }
}

.modal-footer {
  width: 100%;
  background-color: $color-body-bg;
  border-top: 1px solid $color-border;

  display: flex;
  justify-content: center;
  align-items: center;

  @include darkmode {
    background-color: $dark-color-body-bg;
    border-color: $dark-color-border;
  }

  ::v-deep(button) {
    @include buttonReset;
  }

  ::v-deep(a),
  ::v-deep(button) {
    flex: 0 1 100%;
    user-select: none;
    cursor: pointer;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1.25rem 0.5rem;

    font-size: $input-fontsize-md;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    vertical-align: top;
    line-height: 1;
    @include textKerning;

    &:not(:only-child):not(:last-child) {
      border-right: 1px solid $color-border;

      @include darkmode {
        border-color: $dark-color-border;
      }
    }

    @include transition((background, color));

    @include hoverMouse {
      background-color: $color-muted-bg;

      @include darkmode {
        background-color: $dark-color-muted-bg;
      }
    }
  }
}
</style>
