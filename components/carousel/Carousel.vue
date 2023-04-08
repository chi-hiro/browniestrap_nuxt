<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, watch, watchEffect, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Navigation, Pagination, Lazy } from 'swiper'
import { env } from '@/lib/env'
import { elementInScreen } from '@/lib/elementInScreen'
import { openViewerManual } from '@/lib/viewer'

import CarouselItem from '@/components/carousel/CarouselItem.vue'
import CarouselScrollbar from '@/components/carousel/CarouselScrollbar.vue'
import Loader from '@/components/ui/Loader.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  model: string
  src: Array<{
    src: string
    src_lg?: string
    url?: string
  }>
  duration?: number
  zoom?: boolean
  timer?: boolean
  nav?: boolean
  pagination?: boolean
  ratio?: number[]
  id?: string | number
}>()

const state = reactive<{
  isMobile: boolean
  isShow: boolean
  beforeW: number
  mySwiper: any
  isPause: boolean
  lazyLoading: boolean
  swiperOption: { [key: string]: any }
  timerProgress: number
  showcase: {
    isLoading: boolean
    activeItem: string
    viewerGroup: string
  }
}>({
  isMobile: env('mobile'),
  isShow: false,
  beforeW: 0,

  mySwiper: null,
  isPause: false,
  lazyLoading: false,

  swiperOption: {
    loop: true,
    speed: 300,
    effect: 'slide',
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    grabCursor: true,
    watchOverflow: true,
    preloadImages: false,
    lazy: {
      checkInView: true,
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },
    navigation: false,
    pagination: false,
    observer: true,
    observeParents: true,
  },

  timerProgress: 0,
  showcase: {
    isLoading: true,
    activeItem: '',
    viewerGroup: '',
  },
})

if (props.duration) {
  state.swiperOption.autoplay = {
    delay: Number(props.duration),
    disableOnInteraction: false,
  }
}

if (props.nav) {
  state.swiperOption.navigation = true
}

if (props.pagination) {
  state.swiperOption.pagination = true
}

switch (props.model) {
  case 'visual':
    state.swiperOption.speed = 1000
    state.swiperOption.effect = 'fade'
    state.swiperOption.fadeEffect = { crossFade: true }
    state.swiperOption.centeredSlides = true
    break

  case 'slide':
    state.swiperOption.speed = 600
    state.swiperOption.slidesPerView = 1.2
    state.swiperOption.centeredSlides = true
    state.swiperOption.lazy.loadPrevNextAmount = 2
    state.swiperOption.spaceBetween = 20
    state.swiperOption.breakpoints = {
      1024: {
        slidesPerView: 1.5,
      },
    }
    break

  case 'lineup':
    state.swiperOption.preloadImages = true
    state.swiperOption.slidesPerView = 2.2
    state.swiperOption.loop = false
    state.swiperOption.spaceBetween = 20
    state.swiperOption.breakpoints = {
      1024: {
        slidesPerView: 4.2,
        spaceBetween: 40,
      },
    }
    break

  case 'showcase':
    state.swiperOption.preloadImages = true
    state.swiperOption.slidesPerView = 'auto'
    state.swiperOption.loop = false
    state.swiperOption.spaceBetween = 8
    state.swiperOption.pagination = true
    state.swiperOption.breakpoints = {
      1024: {
        direction: 'vertical',
        slidesPerView: 'auto',
        pagination: false,
        lazy: {
          loadPrevNextAmount: 10,
        },
      },
    }
    break
}

const el = ref<HTMLDivElement | null>(null)
const scrollbar = ref<InstanceType<typeof CarouselScrollbar> | null>(null)

//*******************************************************************************
// Methods: Swiper
//*******************************************************************************
const onSwiper = (swiper: any) => (state.mySwiper = swiper)

const toggleResponsive = (newIsMobile: boolean) => {
  if (state.isMobile !== newIsMobile) {
    state.isShow = false
    window.setTimeout(() => (state.isShow = true), 100)
  }
  state.isMobile = newIsMobile
}

const changeStart = () => {
  updateScrollbar()
  setTimer(0)
}

const changeEnd = () => {
  setTimer(100)
}

const setTimer = (value: number) => {
  if (props.timer && props.duration) state.timerProgress = value
}

const inScreen = () => {
  el.value && toggleAutoplay(elementInScreen(el.value))
}

const toggleAutoplay = (value: boolean) => {
  if (value) {
    if (state.isPause) {
      state.isPause = false
      state.mySwiper.autoplay.start()
      setTimer(100)
    }
  } else {
    if (!state.isPause) {
      state.isPause = true
      state.mySwiper.autoplay.stop()
      setTimer(0)
    }
  }
}

//*******************************************************************************
// Methods: Scrollbar
//*******************************************************************************
const updateScrollbar = () => {
  scrollbar.value?.updateScrollbar(state.mySwiper.snapGrid.length, state.mySwiper.snapIndex)
}

const dragMove = () => {
  scrollbar.value?.dragMove(
    (-state.mySwiper.translate * (100 / state.mySwiper.snapGrid[state.mySwiper.snapGrid.length - 1])) / 100
  )
}

const syncScrollbarMove = (value: number) => {
  state.mySwiper.setTranslate(-(state.mySwiper.snapGrid[state.mySwiper.snapGrid.length - 1] * value))
}

const syncScrollbarEnd = (value: number) => {
  state.mySwiper.slideTo(value)
}

//*******************************************************************************
// Hooks
//*******************************************************************************
const carouselClass = computed<string>(() => {
  const arr = ['carousel reveal']
  props.model && arr.push(props.model)
  props.zoom && arr.push('effect-zoom')
  return arr.join(' ')
})

const carouselStyle = computed<{ [key: string]: string | undefined }>(() => {
  return props.duration
    ? {
        '--carousel-duration': props.model === 'visual' ? `${props.duration + 2000}ms` : `${props.duration}ms`,
        '--carousel-timer-duration': `${props.duration}ms`,
      }
    : {}
})

onMounted(() => {
  state.isShow = true
  env('mediaquery').addEventListener('change', (event: MediaQueryListEvent) => toggleResponsive(!event.matches))
  if (props.model === 'showcase' && props.id) {
    state.showcase.activeItem = props.src[0].url!
    state.showcase.viewerGroup = `showcase-${props.id}`
  }
})

watchEffect(() => {
  state.mySwiper !== null && updateScrollbar()
})

watchEffect(() => {
  if (state.isShow) {
    nextTick(() => {
      if (props.duration) {
        inScreen()
        window.addEventListener('scroll', inScreen)
      }
    })

    if (el.value && !el.value.classList.contains('reveal-active')) {
      el.value.classList.add('reveal-active')
    }
  } else {
    if (props.duration) {
      window.removeEventListener('scroll', inScreen)
    }
  }
})

watch(
  () => state.showcase.activeItem,
  (value) => {
    state.showcase.isLoading = true
    const img = new Image()
    img.onload = () => (state.showcase.isLoading = false)
    img.onerror = (error) => console.error(error as string)
    img.src = value
  }
)
</script>

<template>
  <div ref="el" :class="carouselClass" :style="carouselStyle">
    <Swiper
      v-if="state.isShow"
      :modules="[Autoplay, EffectFade, Navigation, Pagination, Lazy]"
      :loop="state.swiperOption.loop"
      :speed="state.swiperOption.speed"
      :effect="state.swiperOption.effect"
      :fadeEffect="state.swiperOption.fadeEffect"
      :centeredSlides="state.swiperOption.centeredSlides"
      :watchOverflow="state.swiperOption.watchOverflow"
      :slidesPerView="state.swiperOption.slidesPerView"
      :spaceBetween="state.swiperOption.spaceBetween"
      :autoplay="state.swiperOption.autoplay"
      :lazy="state.swiperOption.lazy"
      :navigation="state.swiperOption.navigation"
      :pagination="state.swiperOption.pagination"
      :grabCursor="false"
      :breakpoints="state.swiperOption.breakpoints"
      @swiper="onSwiper"
      @sliderMove="dragMove"
      @transitionStart="changeStart"
      @transitionEnd="changeEnd"
      @lazyImageLoad="state.lazyLoading = true"
      @lazyImageReady="state.lazyLoading = false"
    >
      <SwiperSlide v-for="(item, index) in props.src" :key="`carousel-item${String(index)}`">
        <a
          v-if="props.model === 'showcase'"
          class="carousel-showcase-item"
          :href="item.url"
          :data-viewer-group="state.showcase.viewerGroup"
          @mouseenter="state.showcase.activeItem = item.url!"
          @click.prevent="openViewerManual($event, state.showcase.activeItem, state.showcase.viewerGroup)"
        >
          <span class="embed embed-1by1">
            <img :src="item.src" alt="" />
          </span>
        </a>

        <CarouselItem
          v-else
          :src="state.isMobile ? item.src : item.src_lg ? item.src_lg : item.src"
          :href="item.url"
          :ratio="props.ratio"
        />
      </SwiperSlide>

      <Loader
        v-if="props.timer"
        model="circle"
        color="white"
        :class="['carousel-loader', { hide: state.lazyLoading }]"
        :progress="state.timerProgress"
      />
    </Swiper>

    <a
      v-if="props.model === 'showcase' && state.showcase.activeItem && !state.isMobile"
      class="carousel-showcase-active embed embed-1by1"
      :href="state.showcase.activeItem"
      @click.prevent="openViewerManual($event, state.showcase.activeItem, state.showcase.viewerGroup)"
    >
      <Loader v-if="state.showcase.isLoading" model="spin" color="primary" />
      <img v-if="!state.showcase.isLoading" :src="state.showcase.activeItem" width="100%" height="100%" alt="" />
    </a>

    <CarouselScrollbar
      v-if="state.isShow && props.nav && !state.swiperOption.loop"
      ref="scrollbar"
      :divide="false"
      @init="updateScrollbar"
      @syncScrollbarMove="syncScrollbarMove"
      @syncScrollbarEnd="syncScrollbarEnd"
    />
  </div>
</template>

<style lang="scss">
@use '/styles/core/core' as *;
@use 'swiper/scss';
@use 'swiper/scss/effect-fade';
@use 'swiper/scss/pagination';
@use 'swiper/scss/lazy';

@keyframes carousel_timer_waiting {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

@keyframes visual_slide_zoom {
  100% {
    transform: scale(1.15);
  }
}

.carousel {
  position: relative;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .embed img {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    a {
      overflow: hidden;
      display: block;
      position: relative;

      &:hover,
      &:active {
        text-decoration: none;
        outline: none;
      }
    }
  }

  .swiper-lazy {
    opacity: 0;
    filter: blur(10px);
    transition: opacity 400ms linear, filter 400ms linear;

    &.swiper-lazy-loaded {
      opacity: 1;
      filter: none;
    }
  }

  .swiper-lazy-preloader {
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    animation: none !important;
    background-image: none;
    background-color: $color-muted-bg;

    @include darkmode {
      background-color: $dark-color-muted-bg;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    cursor: pointer;
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: calc(($input-height-md + 1.5rem) * -1);
    user-select: none;
    width: $input-height-md;
    height: $input-height-md;
    margin: 0;
    color: $color-body;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @include breakpointDown {
      display: none;
    }

    &::before {
      content: '';
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 8px;
      height: 8px;
      margin: auto;
      border-top: 2px solid $color-body;
      border-right: 2px solid $color-body;
      transform: rotate(45deg);
      @include transition(border);
    }

    &::after {
      pointer-events: none;
      content: '';
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: $input-height-md;
      height: $input-height-md;
      margin: auto;
      border: 2px solid $color-body;
      border-radius: 100%;
      @include transition((background, border));
    }

    @include darkmode {
      color: $dark-color-body;

      &::before {
        border-color: white;
      }

      &::after {
        border-color: white;
      }
    }

    &:focus {
      outline: none;
    }

    &:active {
      transform: translateY(1px);
    }

    @include hoverMouse {
      &::before {
        border-color: white;
      }

      &::after {
        border-color: $color-link-hover;
        background-color: $color-link-hover;
      }
    }

    @include isTouch {
      display: none;
    }

    &.swiper-button-disabled {
      pointer-events: none;

      &::before,
      &::after {
        border-color: rgba(0, 0, 0, 0.1);

        @include darkmode {
          border-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  .swiper-button-prev {
    right: calc($input-height-md + 0.5rem);

    &::before {
      left: 2px;
      transform: rotate(-135deg);
    }
  }

  .swiper-button-next {
    &::before {
      right: 2px;
    }
  }

  .swiper-pagination {
    bottom: 1.5rem;

    .swiper-pagination-bullet {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.3);
    }

    .swiper-pagination-bullet-active {
      background-color: $color-primary;
    }
  }

  &.reveal {
    .swiper-button-prev,
    .swiper-button-next {
      transform: scale(0);
      transform-origin: center;
    }
  }

  &.reveal-active {
    .swiper-button-prev {
      transform: none;
      transition: transform 800ms $easeInOutQuart 200ms;
    }

    .swiper-button-next {
      transform: none;
      transition: transform 800ms $easeInOutQuart 300ms;
    }
  }
}
</style>

<style scoped lang="scss">
@use '/styles/core/core' as *;

.carousel {
  ::v-deep(.carousel-loader) {
    pointer-events: none;
    position: absolute;
    z-index: 2;
    right: calc($grid-gutter-width / 2);
    bottom: calc($grid-gutter-width / 2);

    &.hide {
      opacity: 0;
    }

    svg {
      circle {
        stroke: rgba(0, 0, 0, 0.5);
      }

      &.loader-circle-active {
        circle {
          stroke: white;
        }
      }
    }

    &.animate {
      svg {
        circle {
          transition: stroke-dashoffset var(--carousel-timer-duration) linear;
          animation: carousel_timer_waiting 1000ms $easeInOutQuint var(--carousel-timer-duration) infinite;
        }
      }
    }
  }

  // Model
  &.visual {
    ::v-deep(.swiper-container) {
      cursor: default !important;
    }

    ::v-deep(.swiper-slide) {
      height: 100vh;
      height: 100svh;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    &.effect-zoom {
      ::v-deep(.swiper-slide) {
        img {
          transform: scale(1);
        }
      }

      ::v-deep(.swiper-slide-prev),
      ::v-deep(.swiper-slide-active),
      ::v-deep(.swiper-slide-duplicate-active) {
        img,
        picture {
          animation: visual_slide_zoom var(--carousel-duration) linear 1;
        }
      }
    }

    &.reveal {
      opacity: 0;
      transition: opacity 800ms linear;
    }

    &.reveal-active {
      opacity: 1;
    }
  }

  &.slide {
    ::v-deep(.swiper-slide-active),
    ::v-deep(.swiper-slide-duplicate-active) {
      opacity: 1;
    }

    ::v-deep(.swiper-button-prev),
    ::v-deep(.swiper-button-next) {
      top: 0;
      bottom: 0;
      width: 15%;
      height: 100%;
    }

    ::v-deep(.swiper-button-prev) {
      left: -44px;
      right: auto;
    }

    ::v-deep(.swiper-button-next) {
      right: -44px;
      left: auto;
    }

    ::v-deep(.carousel-loader) {
      left: 1rem;
      margin: 0 auto;
    }

    &.reveal {
      opacity: 0;
      transition: opacity 800ms linear;
    }

    &.reveal-active {
      opacity: 1;
    }
  }

  &.lineup {
    ::v-deep(.swiper) {
      overflow: visible !important;
    }

    ::v-deep(.swiper-slide) {
      cursor: grab;

      a {
        display: block;
        transition: opacity $duration linear;

        @include focusMouse {
          opacity: 0.85;
        }
      }
    }

    &.effect-zoom {
      ::v-deep(.swiper-slide) {
        a {
          img {
            transition: transform 600ms ease-out;
          }

          @include focusMouse {
            img {
              transform: scale(1.15);
            }
          }
        }
      }
    }

    &.reveal {
      ::v-deep(.swiper-slide) {
        opacity: 0;
        transform: scale(0.9) translateZ(0);
        transition: opacity 800ms linear, transform 800ms $easeOutQuart;
      }
    }

    &.reveal-active {
      ::v-deep(.swiper-slide) {
        opacity: 1;
        transform: none;

        @for $i from 2 through 10 {
          &:nth-child(#{$i}) {
            transition-delay: 100ms * $i;
          }
        }
      }
    }
  }

  &.showcase {
    position: relative;

    @include breakpointUp {
      padding-left: 56px + 8px;
    }

    ::v-deep(.swiper) {
      @include breakpointUp {
        position: absolute;
        left: 0;
        top: 0;
        botom: 0;
        width: 56px;
        height: 100%;
      }

      @include breakpointDown {
        overflow: visible !important;
      }
    }

    ::v-deep(.swiper-slide) {
      width: 100%;
      height: auto;
    }

    ::v-deep(.swiper-pagination) {
      position: static;
    }

    ::v-deep(.carousel-showcase-item) {
      @include buttonReset;
      display: block;
      background-color: $color-muted-bg;

      @include darkmode {
        background-color: $dark-color-muted-bg;
        border-color: $dark-color-border;
      }

      @include focusMouse {
        border-color: $color-link-hover;
      }

      img {
        object-fit: contain;
      }

      @include breakpointUp {
        border: 1px solid $color-border;
        padding: 4px;
      }
    }

    ::v-deep(.carousel-showcase-active) {
      display: block;
      cursor: zoom-in;
      position: relative;
      background-color: $color-muted-bg;

      @include darkmode {
        background-color: $dark-color-muted-bg;
      }

      img {
        object-fit: contain;
      }

      .loader {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
}
</style>
