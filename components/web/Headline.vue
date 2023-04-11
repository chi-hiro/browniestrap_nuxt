<script setup lang="ts">
import Chip from '@/components/ui/Chip.vue'

const props = defineProps<{
  model?: string
  date: string
  title: string
  href?: string
  chip?: { label: string; color: string }
  rows?: number
}>()

const formatDate = computed<string>(() => {
  const date = new Date(props.date)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}.${m}.${d}`
})

const headlineClass = computed<string>(() => {
  const arr = ['headline reveal reveal-fade-up']
  props.model && arr.push(props.model)
  return arr.join(' ')
})
</script>

<template>
  <div :class="headlineClass" itemscope itemtype="http://schema.org/NewsArticle">
    <NuxtLink v-if="props.href" itemprop="url" :to="props.href" :title="props.title" class="hover-icon-right">
      <div class="headline-body">
        <div class="detail">
          <Chip v-if="props.chip" model="sm bg long" :color="props.chip.color" :title="props.chip.label" />
          <time v-if="props.date" itemprop="datePublished" :datetime="props.date" class="date">{{ formatDate }}</time>
        </div>

        <h6 itemprop="headline" :class="`title ${props.rows ? `text-clamp-${props.rows}` : ''}`">
          <span v-if="props.href" :class="props.href ? 'hover-underline' : ''">
            {{ props.title }}
          </span>
        </h6>
      </div>
    </NuxtLink>

    <div v-else class="headline-body">
      <div class="detail">
        <Chip v-if="props.chip" model="sm bg long" :color="props.chip.color" :title="props.chip.label" />
        <time v-if="props.date" itemprop="datePublished" :datetime="props.date" class="date">{{ formatDate }}</time>
      </div>

      <h6 itemprop="headline" :class="`title ${props.rows ? `text-clamp-${props.rows}` : ''}`">
        <span>
          {{ props.title }}
        </span>
      </h6>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

.headline {
  position: relative;

  .headline-body {
    position: relative;

    @include breakpointUp {
      display: flex;
      align-items: flex-start;
      gap: 2rem;
    }

    .detail {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;

      @include breakpointUp {
        flex: 0 0 auto;
        min-width: 200px;
        margin: 0;
      }
    }

    .date {
      display: block;
      font-size: 1rem;
      font-weight: normal;
      color: $color-body;
      line-height: 1;
      @include transition(color);

      @include darkmode {
        color: $dark-color-body;
      }
    }

    .icon {
      position: absolute;
      top: 0;
      right: 0;
      pointer-events: none;

      background-color: $color-link;
      @include rounded(9999px);
      padding: calc(($icon-size - 12px) / 2);
      color: white;
      line-height: 0;

      > * {
        font-size: 12px;
      }
    }

    .title {
      margin: 0;
      font-size: 1rem;
      font-weight: normal;
      line-height: 1.5;
      color: $color-headings;

      @include breakpointUp {
        flex: 1 1 auto;
        font-size: 1rem;
      }

      @include darkmode {
        color: $dark-color-headings;
      }
    }
  }

  a {
    display: block;
    min-height: 100%;

    .hover-underline {
      background: url('data:image/svg+xml;charset=utf8,%3Csvg%20height%3D%221%22%20viewBox%3D%220%200%201%201%22%20width%3D%221%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20d%3D%22m0%200h1v1h-1z%22%20fill%3D%22' + base64Encode(
          $color-headings
        ) + '%22%20fill-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E');
      background-repeat: no-repeat;
      background-position: right bottom;
      background-size: 0 1px;
      @include transition(background-size);

      @include darkmode {
        background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20height%3D%221%22%20viewBox%3D%220%200%201%201%22%20width%3D%221%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20d%3D%22m0%200h1v1h-1z%22%20fill%3D%22' + base64Encode(
            $dark-color-headings
          ) + '%22%20fill-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E');
      }
    }

    @include focusMouse {
      .hover-underline {
        will-change: background-size;
        background-position: left bottom;
        background-size: 100% 1px;
      }
    }
  }

  &.border {
    border-top: 1px solid $color-border;
    border-bottom: 1px solid $color-border;

    @include darkmode {
      border-color: $dark-color-border;
    }

    .headline-body {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;

      @include breakpointUp {
        padding-top: 2rem;
        padding-bottom: 2rem;
      }
    }

    + * {
      border-top: none;
    }
  }
}
</style>
