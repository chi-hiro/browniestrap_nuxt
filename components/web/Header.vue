<script setup lang="ts">
import { env } from '@/lib/env'
import { anchor } from '@/lib/mixins'
import { scrollElement, pageScroll } from '@/lib/pageScroll'

import Expansion from '@/components/ui/Expansion.vue'
import Button from '@/components/ui/Button.vue'

const runtimeConfig = useRuntimeConfig()

//*******************************************************************************
// Variables
//*******************************************************************************
const state = reactive({
  isMobile: env('mobile'),
  isShow: true,
  showBg: false,
  showNav: false,
  beforeScrollPos: 0,
})

const el = ref<HTMLDivElement | null>(null)

//*******************************************************************************
// Methods
//*******************************************************************************
const scrollToggle = () => {
  const scrollPos = scrollElement().scrollTop

  if (scrollPos < el.value!.offsetHeight) {
    //state.isShow = true
    state.showBg = false
  } else {
    //state.isShow = state.beforeScrollPos > scrollPos ? true : false
    state.showBg = true
  }

  state.beforeScrollPos = scrollPos
}

const clickLogo = (e: Event) => {
  if (env('mobile') && scrollElement().scrollTop > 0) {
    e.preventDefault()
    pageScroll('pagetop')
  }
}

//*******************************************************************************
// Hooks
//*******************************************************************************
onMounted(() => {
  window.setTimeout(() => window.addEventListener('scroll', scrollToggle), 1000)
  env('mediaquery').addEventListener('change', (event: MediaQueryListEvent) => (state.isMobile = !event.matches))
})
</script>

<template>
  <transition name="header">
    <header id="header" v-show="state.isShow" :class="{ 'show-bg': state.showBg || state.showNav }" ref="el">
      <div id="header-logo" @click="clickLogo">
        <a href="/" title="Browniestrap">
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
        </a>
      </div>

      <transition name="header-nav">
        <div id="header-nav" v-if="!state.isMobile || state.showNav">
          <nav>
            <ul>
              <li>
                <NuxtLink to="/">Home</NuxtLink>
              </li>

              <li>
                <NuxtLink to="/test">Test</NuxtLink>
              </li>

              <li>
                <Expansion href="#" title="Components" :hover="true">
                  <ul class="navigation-child">
                    <li>
                      <a href="#section_card" @click="anchor">Card</a>
                    </li>
                    <li>
                      <a href="#section_button" @click="anchor">Button</a>
                    </li>
                    <li>
                      <a href="#section_forms" @click="anchor">Forms</a>
                    </li>
                    <li>
                      <a href="#section_loader" @click="anchor">Loader</a>
                    </li>
                    <li>
                      <a href="#section_viewer" @click="anchor">Viewer</a>
                    </li>
                    <li>
                      <a href="#section_modal" @click="anchor">Modal</a>
                    </li>
                  </ul>
                </Expansion>
              </li>

              <li>
                <Button href="/test" model="bg md rounded" color="primary" class="header-btn" title="ログイン" />
              </li>
            </ul>
          </nav>

          <span id="header-nav-overlay" v-if="state.isMobile" @click="state.showNav = false" />
        </div>
      </transition>

      <button type="button" id="hamburger" @click="state.showNav = !state.showNav" v-if="state.isMobile">
        <span id="hamburger-icon" :class="{ active: state.showNav }" />
      </button>
    </header>
  </transition>
</template>

<style lang="scss">
@use '/styles/core/core' as *;

#header {
  user-select: none;
  position: fixed;
  z-index: $zindex-bar;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc($grid-gutter-width / 2);
  height: $header-height-sm;

  @include transition((background, box-shadow));

  @include breakpointUp {
    padding: 0 $grid-gutter-width;
    height: $header-height;
  }

  .hide_scrollbar & {
    @include isMouse {
      right: $scrollbar-w;
    }
  }

  @include hoverMouse {
    background-color: $color-header-bg;
    box-shadow: $shadow-dark;

    @include darkmode {
      background-color: $dark-color-header-bg;
    }
  }

  &.show-bg {
    background-color: $color-header-bg;
    box-shadow: $shadow-dark;

    @include darkmode {
      background-color: $dark-color-header-bg;
    }
  }

  &.header-enter-active,
  &.header-leave-active {
    @include transition(transform);
    will-change: transform;
  }

  &.header-enter-from,
  &.header-leave-to {
    transform: translateY(-100%);
  }
}

#header-logo {
  flex: 0 0 auto;
  height: 100%;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    &:hover {
      text-decoration: none;
    }
  }

  img {
    vertical-align: top;
    width: auto;
    height: $header-height-sm * 0.25;

    @include breakpointUp {
      height: $header-height * 0.25;
    }
  }
}

//***********************************************************************
//  Navigation
//***********************************************************************
#header-nav {
  position: fixed;
  z-index: $zindex-sidebar;
  top: $header-height-sm;
  left: 0;
  right: 0;
  height: calc(100% - $header-height-sm);

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  font-size: 1rem;

  @include breakpointUp {
    background: none;
    backdrop-filter: none;
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    flex: 1 1 auto;
    font-size: 1rem;
  }

  &.header-nav-enter-active,
  &.header-nav-leave-active {
    @include transition(opacity);
    will-change: opacity;
  }

  &.header-nav-enter-from,
  &.header-nav-leave-to {
    opacity: 0;
  }

  nav {
    position: relative;
    z-index: 2;
    overflow-x: hidden;
    overflow-y: auto;

    @include breakpointUp {
      overflow: visible;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid $color-border;
    background-color: $color-header-bg;

    @include darkmode {
      background-color: $dark-color-header-bg;
    }

    @include breakpointUp {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border: none;
      background: none;
    }

    li {
      border-bottom: 1px solid $color-border;

      @include darkmode {
        border-color: $dark-color-border;
      }

      @include breakpointUp {
        border: none;
      }
    }

    a:not(.btn),
    .expansion-toggler {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      padding: calc((4rem - $icon-size) / 2) calc($grid-gutter-width / 2);
      line-height: $icon-size;
      font-size: inherit;
      color: $color-headings;
      white-space: nowrap;
      @include transition((background, color));

      @include focusMouse {
        color: $color-link;
      }

      @include darkmode {
        color: $dark-color-headings;
      }

      @include breakpointUp {
        padding: calc(($header-height - $icon-size) / 2) calc($grid-gutter-width / 2);
      }
    }

    .expansion {
      .expansion-toggler {
        font-size: inherit;

        .icon {
          color: $color-link;
        }
      }

      .expansion-body {
        @include breakpointUp {
          overflow: visible !important;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 100%;
          margin-top: -1.25rem;
        }
      }

      &.show {
        .expansion-toggler {
          color: $color-link-hover;
        }
      }
    }

    .header-btn {
      font-size: inherit;
      font-weight: normal;

      @include breakpointDown {
        display: block;
        margin: calc((4rem - $icon-size) / 2) calc($grid-gutter-width / 2);
      }

      @include breakpointUp {
        margin: 0 0.5rem;
        padding: $input-padding-sm $button-padding-x;
      }
    }

    &.navigation-child {
      background-color: $color-muted-bg;

      @include darkmode {
        background-color: $dark-color-muted-bg;
      }

      @include breakpointUp {
        display: block;
        padding: 1rem;
        background-color: $color-header-bg;
        box-shadow: $shadow-dark;
        @include rounded();

        @include darkmode {
          background-color: $dark-color-header-bg;
        }
      }

      li {
        &:last-child {
          border: none;
        }
      }

      a:not(.btn) {
        padding: calc((3.5rem - $icon-size) / 2) $grid-gutter-width;
        font-size: 0.875em;

        @include breakpointUp {
          padding: 1rem;
          font-size: 1rem;
        }
      }
    }
  }
}

#header-nav-overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
}

//***********************************************************************
//  Hamburger
//***********************************************************************
$hbg-line-gap: 4px;
$hbg-line-weight: 2px;
$hbg-width: 24px;
$hbg-height: ($hbg-line-weight * 3) + ($hbg-line-gap * 2);
$hbg-trans: calc(($hbg-height / 2) - ($hbg-line-weight / 2));

#hamburger {
  @include buttonReset;
  width: $header-height-sm;
  height: $header-height-sm;
  margin-right: calc(($header-height-sm - $hbg-width) / -2);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include breakpointUp {
    width: $header-height;
    height: $header-height;
    margin-right: calc(($header-height - $hbg-width) / -2);
  }
}

#hamburger-icon {
  position: relative;
  display: block;

  width: $hbg-width;
  height: $hbg-line-weight;
  background-color: $color-headings;
  @include transition(background);

  @include darkmode {
    background-color: $dark-color-headings;
  }

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: $hbg-line-weight;
    background-color: $color-headings;
    position: absolute;
    left: 0;
    @include transition(transform);

    @include darkmode {
      background-color: $dark-color-headings;
    }
  }

  &::before {
    top: -($hbg-line-gap + $hbg-line-weight);
  }

  &::after {
    bottom: -($hbg-line-gap + $hbg-line-weight);
  }

  &.active {
    background-color: transparent;

    &::before {
      transform: translateY($hbg-trans) rotate(45deg);
    }

    &::after {
      transform: translateY(-$hbg-trans) rotate(-45deg);
    }
  }
}
</style>
