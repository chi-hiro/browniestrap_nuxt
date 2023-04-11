<script setup lang="ts">
import { toast } from '@/lib/toast'
import Loader from '@/components/ui/Loader.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  src: string
  isShow: boolean
  width: string
  height: string
  alt: string
}>()

const state = reactive({
  isLoaded: false,
})

//*******************************************************************************
// Methods
//*******************************************************************************
const loadImage = () => {
  if (props.isShow === true && state.isLoaded === false) {
    const img = new Image()
    img.onload = () => (state.isLoaded = true)
    img.onerror = (error) => toast('danger', error as string)
    img.src = props.src
  }
}

//*******************************************************************************
// Hooks
//*******************************************************************************
onMounted(() => loadImage())

watch(
  () => props.isShow,
  (value) => loadImage()
)
</script>

<template>
  <transition name="img-lazy">
    <img v-if="state.isLoaded" :src="props.src" :width="props.width" :height="props.height" :alt="props.alt" />
  </transition>

  <span v-if="!state.isLoaded" class="img-lazy embed embed-16by9">
    <Loader model="spin" />
  </span>
</template>

<style lang="scss">
@use '/styles/core/core' as *;

.img-lazy-enter-active,
.img-lazy-leave-active {
  @include transition(opacity);
  will-change: opacity;
}

.img-lazy-enter-from,
.img-lazy-leave-to {
  opacity: 0;
}

.img-lazy {
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);

  .loader {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }

  @include darkmode {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

#viewer {
  .img-lazy {
    background-color: transparent;
    width: 100%;
    height: 100%;

    .loader {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
</style>
