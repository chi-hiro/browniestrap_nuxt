<template>
  <span class="divider">
    <span><slot /></span>
  </span>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

.divider {
  display: block;
  position: relative;
  text-align: center;
  margin: 1rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    margin: auto;
    background-color: $color-border;

    @include darkmode {
      background-color: $dark-color-border;
    }
  }

  span {
    display: inline-block;
    padding: 0 0.5rem;
    position: relative;
    z-index: 2;
    background-color: $color-body-bg;
    font-size: 0.8125rem;
    letter-spacing: 1px;
    line-height: $icon-size;

    @include darkmode {
      background-color: $dark-color-body-bg;
    }
  }
}
</style>
