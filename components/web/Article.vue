<script setup lang="ts">
import Chip from '@/components/ui/Chip.vue'

const props = defineProps<{
  title: string
  date: string
  chip?: {
    label: string
    color: string
  }
}>()

const formatDate = computed<string>(() => {
  const date = new Date(props.date)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}.${m}.${d}`
})
</script>

<template>
  <article class="article" itemScope itemType="http://schema.org/NewsArticle">
    <div className="article-detail">
      <time itemProp="datepublished" :dateTime="props.date" className="article-date">{{ formatDate }}</time>
      <Chip v-if="props.chip" model="sm bg long" :color="props.chip.color" :title="props.chip.label" />
    </div>

    <h1 itemProp="name" className="article-title">
      {{ props.title }}
    </h1>

    <div itemProp="articleBody" className="article-body">
      <slot />
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

.article {
  font-size: 1rem;
  line-height: 2;

  @include breakpointUp {
    font-size: 1.125rem;
    line-height: 2;
  }

  .article-detail {
    display: flex;
    justify-content: between;
    align-items: center;
    gap: 1rem;
    color: lighten($color-body, 20%);
    margin-bottom: 1rem;

    @include darkmode {
      color: darken($dark-color-body, 20%);
    }
  }

  .article-date {
    font-size: 1.1em;
    line-height: $icon-size;
  }

  .article-title {
    font-size: 1.2em;
    line-height: 1.5;

    @include breakpointUp {
      font-size: 1.7em;
      margin-bottom: 1.5rem;
    }
  }

  .article-body {
    ::v-deep(img) {
      @include imgFluid;
    }

    > *:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
