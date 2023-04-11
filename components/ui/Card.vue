<script setup lang="ts">
import { variables } from '@/lib/styleUtl'
import Icon from '@/components/ui/Icon.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const props = defineProps<{
  model?: string
  color?: string
  href?: string
  title?: string
  icon?: string
  src?: string
}>()

//*******************************************************************************
// Hooks
//*******************************************************************************
const cardClass = computed<string>(() => {
  const arr = ['card']
  props.model && arr.push(props.model)
  props.href && arr.push('hover-border')
  return arr.join(' ')
})

const textColor = computed<string>(() => {
  if (props.color) {
    if (props.model?.includes('bg')) {
      return props.color === 'white' ? variables.theme.bodyColor : 'white'
    } else {
      return variables.color[props.color]
    }
  } else {
    return ''
  }
})

const bgColor = computed<string>(() => {
  if (props.color) {
    if (props.model?.includes('text')) {
      return variables.lightColor[props.color]
    } else {
      return variables.color[props.color]
    }
  } else {
    return ''
  }
})
</script>

<template>
  <a v-if="props.href" :href="props.href" :class="cardClass">
    <figure v-if="props.src" class="embed embed-16by9 card-thumb">
      <img :src="props.src" :alt="props.title" width="640" height="360" loading="lazy" />
    </figure>

    <div class="card-body">
      <div v-if="props.icon" class="icon">
        <Icon :value="props.icon" />
      </div>

      <div class="flex-1 body">
        <slot />
      </div>
    </div>
  </a>

  <div v-else :class="cardClass">
    <figure v-if="props.src" class="embed embed-16by9 card-thumb">
      <img :src="props.src" :alt="props.title" width="640" height="360" loading="lazy" />
    </figure>

    <div class="card-body">
      <div v-if="props.icon" class="icon">
        <Icon :value="props.icon" />
      </div>

      <div class="flex-1 body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

$textColor: v-bind('textColor');
$bgColor: v-bind('bgColor');

.card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  @include rounded;

  background-color: $color-muted-bg;
  color: $color-body;

  @include darkmode {
    background-color: $dark-color-muted-bg;
    color: $dark-color-body;
  }

  [class*='grid'] &,
  [class*='flex'] & {
    height: 100%;
  }

  &.bg {
    color: $textColor;
    background-color: $bgColor;
  }

  &.text {
    color: $textColor;
    background-color: $bgColor;
  }
}

a.card {
  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &.hover-border {
    &::after {
      @include rounded;
    }
  }

  &.bg {
    &:hover,
    &:focus {
      color: $textColor;
    }

    &.hover-border {
      &::after {
        border-color: $color-body;

        @include darkmode {
          border-color: $dark-color-body;
        }
      }
    }
  }

  &.text {
    &:hover,
    &:focus {
      color: $textColor;
    }

    &.hover-border {
      &::after {
        border-color: $textColor;
      }
    }
  }
}

.card-thumb {
  margin: 0;
}

.card-body {
  flex: 1 1 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;

  .icon {
    flex: 0 0 auto;
    margin-right: 0.75rem;
    line-height: 1;
  }

  .body {
    flex: 1 1 auto;
    position: relative;
    font-size: 0.875rem;
    line-height: 1.5;

    > *:last-child {
      margin-bottom: 0;
    }

    ::v-deep(.chip) {
      margin-bottom: 0.5rem;
    }

    ::v-deep(small) {
      display: block;
      margin-bottom: 0.5rem;
    }

    ::v-deep(h2),
    ::v-deep(h3),
    ::v-deep(h4),
    ::v-deep(h5),
    ::v-deep(h6) {
      color: inherit;
      font-size: 1.125rem;
      margin-bottom: 0.75rem;

      + small {
        margin-top: -0.5rem;
        margin-bottom: 0.75rem;
      }
    }
  }
}

.card-thumb + .card-body {
  padding: 1.5rem;
  align-items: flex-start;

  .body {
    ::v-deep(.chip:first-child) {
      position: absolute;
      z-index: 2;
      top: -2.25rem;
      left: 0;
      margin: 0;
    }
  }
}
</style>
