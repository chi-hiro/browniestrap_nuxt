<script setup lang="ts">
import { render } from 'vue'
import Card from '@/components/ui/Card.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  theme: string
  message: string
  position?: string
  direction?: string
}>()

const state = reactive({
  isShow: false,
})

const el = ref<InstanceType<typeof Card>>()

const icon: { [key: string]: string } = {
  info: 'info',
  success: 'check_circle',
  warning: 'warning',
  danger: 'cancel',
}

//*******************************************************************************
// Methods
//*******************************************************************************
const show = () => {
  state.isShow = true
  nextTick(() => window.setTimeout(() => hide(), 4000))
}

const hide = () => {
  state.isShow = false
  nextTick(() => window.setTimeout(() => dismiss(), 300))
}

const dismiss = () => {
  const node = el.value!.$el
  render(null, node.parentNode)
  node.remove()
  const container = document.querySelector('.notification-container')
  container?.childNodes.length == 0 && container.remove()
}

//*******************************************************************************
// Hooks
//*******************************************************************************
onBeforeMount(() => {
  const positionClass = props.position || 'top'
  const directionClass = props.direction || 'y'

  if (!document.querySelector('.notification-container')) {
    const container = document.createElement('div')
    container.classList.add('notification-container', positionClass, directionClass)
    document.body.appendChild(container)
  } else {
    const container = document.querySelector('.notification-container')
    container?.classList.remove('top', 'left', 'right', 'center', 'x', 'y')
    container?.classList.add(positionClass, directionClass)
  }
})

onMounted(() => {
  document.querySelector('.notification-container')?.insertAdjacentElement('beforeend', el.value!.$el)
  document.querySelector('.notification-dummy')?.remove()
  window.setTimeout(() => show(), 100)
})
</script>

<template>
  <transition name="notification">
    <Card
      v-show="state.isShow"
      class="card-notification"
      model="bg"
      :color="props.theme"
      :icon="icon[props.theme]"
      ref="el"
    >
      <strong>{{ props.message }}</strong>
    </Card>
  </transition>
</template>

<style lang="scss">
@use '/styles/core/core' as *;

//***********************************************************************
//  Item
//***********************************************************************
.card-notification {
  pointer-events: auto;
  margin: 0 auto 0.5rem;
  width: 100%;
  border: none;
  box-shadow: $shadow-dark;
  transform: none;

  .card-body {
    padding: 1rem;

    .body {
      font-weight: bold;
    }
  }

  @include breakpointUp {
    width: 600px;
  }
}

.notification-enter-active,
.notification-leave-active {
  @include transition((transform, opacity));
  will-change: transform, opacity;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
}

.notification-container {
  &.x {
    &.top .card-notification,
    &.bottom .card-notification {
      &.notification-enter-from {
        transform: translateX(20px);
      }
      &.notification-leave-to {
        transform: translateX(-20px);
      }
    }

    &.left .card-notification {
      &.notification-enter-from,
      &.notification-leave-to {
        transform: translateX(-100px);
      }
    }

    &.right .card-notification {
      &.notification-enter-from,
      &.notification-leave-to {
        transform: translateX(100px);
      }
    }
  }

  &.y {
    &.top .card-notification,
    &.left .card-notification,
    &.right .card-notification {
      &.notification-enter-from,
      &.notification-leave-to {
        transform: translateY(-110%);
      }
    }

    &.bottom .card-notification {
      &.notification-enter-from,
      &.notification-leave-to {
        transform: translateY(110%);
      }
    }
  }
}

//***********************************************************************
//  Wrapper
//***********************************************************************
.notification-container {
  position: fixed;
  z-index: $zindex-modal;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  @include breakpointUp {
    padding: 1rem;
  }

  &.left {
    .card-notification {
      margin-left: 0;
    }
  }

  &.right {
    .card-notification {
      margin-right: 0;
    }
  }

  &.center {
    justify-content: center;
  }

  &.bottom {
    justify-content: flex-end;
  }
}
</style>
