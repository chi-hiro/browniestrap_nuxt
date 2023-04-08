<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <footer>
    <div class="container">
      <div class="aboutus flex-auto text-center lg:text-left">
        <img
          src="/img/logo.webp"
          width="585"
          height="48"
          :alt="runtimeConfig.appTitle"
          class="hidden-dark"
          loading="lazy"
        />
        <img
          src="/img/logo-wt.webp"
          width="585"
          height="48"
          :alt="runtimeConfig.appTitle"
          class="hidden-light"
          loading="lazy"
        />

        <address>
          東京地千代田区神田1-1-1<br />
          TEL 123-4567-8910
        </address>
      </div>

      <small class="copyright">© {{ new Date().getFullYear() }} {{ runtimeConfig.appTitle }}</small>
    </div>
  </footer>
</template>

<style lang="scss">
@use '/styles/core/core' as *;

footer {
  position: relative;
  z-index: 2;
  background-color: $color-muted-bg;
  font-size: 0.875rem;
  text-align: center;

  padding-top: 3rem;
  padding-bottom: 3rem;

  @include darkmode {
    background-color: $dark-color-muted-bg;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @include breakpointUp {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }

  .aboutus {
    flex: 0 0 auto;

    img {
      display: inline-block;
      margin: 0 0 1rem;
      width: auto;
      height: 18px;
      object-fit: contain;
    }

    > *:last-child {
      margin-bottom: 0;
    }

    @include breakpointUp {
      text-align: left;
    }
  }

  .copyright {
    display: block;
    font-size: 0.75rem;
    line-height: 1;
    margin: 0;
    opacity: 0.5;

    @include breakpointUp {
      text-align: right;
    }
  }
}
</style>
