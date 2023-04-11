<script setup lang="ts">
import { render } from 'vue'
import { getTouchPosition } from '@/lib/getTouchPosition'
import { scrollElement } from '@/lib/pageScroll'
import { toggleScrollbarSpacer } from '@/lib/toggleScrollbarSpacer'
import Lazyimg from '@/components/viewer/Lazyimg.vue'
import Icon from '@/components/ui/Icon.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  mode: string
  items: string[]
  activeItem: number
}>()

const state = reactive({
  isShow: false,
  isDrag: false,
  isTransition: false,
  dragMode: 'default',

  total: props.items.length,
  active: props.activeItem,
  container: 0,
  pos: [0, 0],
  page: [0, 0],
  begin: [0, 0],

  videoPlaying: false,
  scrollPos: 0,
})

const el = ref<HTMLElement>()

//*******************************************************************************
// Methods
//*******************************************************************************
const sizing = () => {
  state.container = window.innerWidth * state.total
  state.pos = [-(window.innerWidth * state.active), 0]
}

const dismiss = async () => {
  state.videoPlaying = false
  state.isShow = false

  await toggleScrollbarSpacer(false)

  document.body.classList.remove('show_viewer')
  scrollElement().scrollTo({ top: state.scrollPos })

  const node = el.value
  if (node) {
    render(null, node.parentNode as HTMLElement)
    node.remove()
  }
  document.querySelector('#viewer-container')?.remove()
}

const toggle = (index: number) => {
  state.active = state.active + index
  slide()
}

const slide = () => {
  state.isTransition = true
  state.pos = [-(window.innerWidth * state.active), state.pos[1]]
  window.setTimeout(() => (state.isTransition = false), 300)
}

const playVideo = (e: Event) => {
  const video = e.target as HTMLVideoElement

  if (!state.videoPlaying) {
    state.videoPlaying = true
    video.play()
    video.addEventListener('ended', () => (state.videoPlaying = false))
  } else {
    state.videoPlaying = false
    video.pause()
  }
}

const handleDown = (e: Event) => {
  state.isDrag = true
  state.begin = [state.pos[0], state.pos[1]]
  state.page = [getTouchPosition(e, 'X'), getTouchPosition(e, 'Y')]
}

const handleMove = (e: Event) => {
  if (state.isDrag && props.items.length > 1) {
    e.preventDefault()
    const left = state.begin[0] + (getTouchPosition(e, 'X') - state.page[0])
    const top = state.begin[1] + (getTouchPosition(e, 'Y') - state.page[1])
    //const strX = left - state.beginX
    //const strY = top - state.beginY

    //if (state.dragMode == 'default') {
    //    if ((strX <= -8 || strX >= 8) && (strY > -8 || strY < 8)) {
    //        state.dragMode = 'horizontal'
    //    } else if ((strX > -8 || strX < 8) && (strY <= -8 || strY >= 8) && window.innerWidth < 1024) {
    //        state.dragMode = 'vertical'
    //    }
    //}

    state.dragMode = 'horizontal'

    switch (state.dragMode) {
      case 'horizontal':
        state.pos = [left, state.pos[1]]
        break

      case 'vertical':
        state.pos = [state.pos[0], top]
        break
    }
  }
}

const handleUp = () => {
  if (state.isDrag) {
    state.isDrag = false

    switch (state.dragMode) {
      case 'horizontal':
        const currentLeft = -(window.innerWidth * state.active)
        let nextIndex: number

        if (state.pos[0] < currentLeft) {
          nextIndex = state.active + 1
        } else if (state.pos[0] > currentLeft) {
          nextIndex = state.active - 1
        } else {
          nextIndex = state.active
        }

        if (nextIndex < 0) nextIndex = 0
        if (nextIndex > state.total - 1) nextIndex = state.total - 1

        state.active = nextIndex
        slide()
        break

      case 'vertical':
        state.isTransition = true

        if (state.pos[1] < -70 || state.pos[1] > 70) {
          if (state.pos[1] < -70) {
            state.pos[1] = -window.innerHeight
          } else if (state.pos[1] > 70) {
            state.pos[1] = window.innerHeight
          }
          window.setTimeout(() => {
            state.isTransition = false
            dismiss()
          }, 300)
        } else {
          state.pos = [state.pos[0], 0]
          window.setTimeout(() => (state.isTransition = false), 300)
        }
        break
    }

    state.dragMode = 'default'
  }
}

//*******************************************************************************
// Hooks
//*******************************************************************************
onMounted(() => {
  window.addEventListener('resize', sizing)
  sizing()

  state.isShow = true
  toggleScrollbarSpacer(true)
  state.scrollPos = scrollElement().scrollTop
  document.body.classList.add('show_viewer')
})
</script>

<template>
  <transition name="viewer">
    <div v-show="state.isShow" id="viewer" ref="el">
      <div id="viewer-body">
        <div
          id="viewer-body-container"
          :style="{
            width: `${state.container}px`,
            transform: `translate3d(${state.pos[0]}px, ${state.pos[1]}px, 0)`,
          }"
          :class="{
            transition: state.isTransition,
            single: state.total === 1,
          }"
          @touchstart="handleDown"
          @touchmove="handleMove"
          @touchend="handleUp"
          @touchleave="handleUp"
          @mousedown="handleDown"
          @mousemove="handleMove"
          @mouseup="handleUp"
          @mouseleave="handleUp"
        >
          <div
            v-for="(item, index) in props.items"
            :class="['viewer-item', { 'viewer-item-active': index === state.active }]"
          >
            <div v-if="props.mode == 'image'" class="img">
              <Lazyimg :src="item" width="1920" height="1080" alt="" :isShow="index === state.active ? true : false" />
            </div>

            <div v-else-if="props.mode == 'video'" class="video">
              <video
                :src="item"
                @click="playVideo"
                controls
                controlslist="nodownload nofullscreen"
                disablePictureInPicture
                webkit-playsinline="true"
                playsinline
              ></video>
            </div>

            <div v-else-if="props.mode == 'youtube'" class="video">
              <div class="embed embed-16by9">
                <iframe
                  width="100%"
                  height="100%"
                  :src="item.replace('watch?v=', 'embed/')"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="state.total > 1 && state.active !== 0 && state.pos[1] === 0"
        type="button"
        id="viewer-prev"
        @click="toggle(-1)"
      >
        <span className="viewer-btn">
          <Icon value="chevron_left" />
        </span>
      </button>

      <button
        v-if="state.total > 1 && state.active !== state.total - 1 && state.pos[1] === 0"
        type="button"
        id="viewer-next"
        @click="toggle(+1)"
      >
        <span className="viewer-btn">
          <Icon value="chevron_right" />
        </span>
      </button>

      <button v-if="state.pos[1] === 0" type="button" id="viewer-close" @click="dismiss">
        <span className="viewer-btn">
          <Icon value="close" />
        </span>
      </button>

      <div v-if="state.total > 1 && state.pos[1] === 0" id="viewer-index">
        <span>{{ state.active + 1 }} / {{ state.total }}</span>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
@use '/styles/core/core' as *;

@mixin button() {
  @include buttonReset;
  position: absolute;
  padding: calc(($component-height - 40px) / 2);

  .viewer-btn {
    display: inline-block;
    vertical-align: top;
    color: white;
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    padding: calc((40px - $icon-size) / 2);
    @include transition((color, background));
  }

  @include hoverMouse {
    .viewer-btn {
      color: $color-link;
      background-color: $dark-color-muted-bg;
    }
  }
}

body.show_viewer {
  @include isMouse {
    overflow: hidden;
  }

  @include isTouch {
    #app,
    #__nuxt {
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 100vh;
      height: 100svh;
    }
  }
}

#viewer {
  z-index: $zindex-sidebar + 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  .btn.is-link {
    color: white;
  }

  @include isMouse {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
  }

  @include isTouch {
    position: absolute;
    background-color: #101010;
  }

  &.viewer-enter-active,
  &.viewer-leave-active {
    @include transition(opacity);
    will-change: opacity;
  }

  &.viewer-enter-from,
  &.viewer-leave-to {
    @include isMouse {
      opacity: 0;
    }
  }
}

#viewer-body {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  .viewer-leave-active & {
    @include transition((transform, opacity));
    will-change: transform, opacity;
  }

  .viewer-leave-to & {
    transform: scale(0.9);
    opacity: 0;
  }
}

#viewer-body-container {
  cursor: ew-resize;
  display: flex;
  height: 100%;

  &.transition {
    transition: transform $duration $easeOutCubic;
    will-change: transform;
  }

  &.single {
    cursor: default;
  }
}

.viewer-item {
  position: relative;
  flex: 0 0 100vw;
  width: 100vw;
  user-select: none;

  &.viewer-item-active {
    .img {
      transform: none;
    }
  }

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: $component-height;
    bottom: $component-height;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transition: transform 300ms $easeOutCubic;
    transform: scale(0.9);

    @include breakpointUp {
      left: $component-height;
      right: $component-height;
      transform: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .video {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    video {
      width: 100%;
      max-height: 100%;
    }

    .embed {
      max-height: 100%;
    }

    @include breakpointUp {
      top: $component-height;
      bottom: $component-height;
      left: $component-height;
      right: $component-height;
      transform: none;
    }
  }
}

#viewer-close {
  @include button;
  z-index: 4;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  height: $component-height;
  text-align: left;
}

#viewer-prev {
  @include button;
  display: none;
  z-index: 3;
  left: 0;
  top: 0;
  bottom: 0;
  width: $component-height;
  text-align: left;

  @include breakpointUp {
    display: block;
    width: 10vw;
  }
}

#viewer-next {
  @include button;
  display: none;
  z-index: 3;
  right: 0;
  top: 0;
  bottom: 0;
  width: $component-height;
  text-align: right;

  @include breakpointUp {
    display: block;
    width: 10vw;
  }
}

#viewer-index {
  position: absolute;
  z-index: 2;
  pointer-events: none;
  bottom: 0;
  left: 0;
  right: 0;
  padding: calc(($component-height - $icon-size) / 2);
  line-height: $icon-size;
  font-size: 0.75rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);

  span {
    display: inline-block;
    padding: 0 0.5rem;
  }
}
</style>
