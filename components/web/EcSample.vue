<script setup lang="ts">
import { env } from '@/lib/env'
import { scrollElement, pageScroll } from '@/lib/pageScroll'
import Carousel from '@/components/carousel/Carousel.vue'
import Chip from '@/components/ui/Chip.vue'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import Expansion from '@/components/ui/Expansion.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import Quantity from '@/components/form/Quantity.vue'

//*******************************************************************************
// Variables
//*******************************************************************************
const shopBody = ref<HTMLDivElement | null>(null)
const itemBody = ref<HTMLDivElement | null>(null)
const sidebar = ref<HTMLDivElement | null>(null)
const sidemenu = ref<HTMLDivElement | null>(null)

type stateType = {
  isMobile: boolean
  sidebar: {
    content: Array<{
      id: string
      title: string
    }>
    mode: 'following' | 'followend' | 'static'
  }
  sku: string
  quantity: number
}

const state: stateType = reactive({
  isMobile: env('mobile'),
  sidebar: {
    content: [],
    mode: 'static',
  },
  sku: 'SKU001',
  quantity: 1,
})

//*******************************************************************************
// Methods
//*******************************************************************************
const toggleResponsive = (newValue: boolean) => {
  state.isMobile = newValue
  toggleSidebarMode()
}

const createSidebarMenu = () => {
  state.sidebar.content = []

  const labels = itemBody.value!.querySelectorAll('h2')
  ;[...labels].map((item, index) => {
    item.setAttribute('id', `bookmark${index}`)
    state.sidebar.content.push({
      id: `bookmark${index}`,
      title: item.textContent ? item.textContent : `bookmark${index}`,
    })
  })
}

const toggleSidebarMode = () => {
  const headerH: number = 80
  const scrPos: number = scrollElement().scrollTop

  if (state.isMobile) {
    const strPos: number =
      window.pageYOffset + shopBody.value!.getBoundingClientRect().top + shopBody.value!.clientHeight

    if (scrPos >= strPos) {
      state.sidebar.mode = 'following'
    } else {
      state.sidebar.mode = 'static'
    }
  } else {
    const strPos: number = window.pageYOffset + sidebar.value!.getBoundingClientRect().top - headerH
    const endPos: number =
      window.pageYOffset +
      sidebar.value!.getBoundingClientRect().top +
      sidebar.value!.clientHeight -
      sidemenu.value!.clientHeight -
      headerH

    if (scrPos >= endPos) {
      state.sidebar.mode = 'followend'
    } else if (scrPos >= strPos) {
      state.sidebar.mode = 'following'
    } else {
      state.sidebar.mode = 'static'
    }
  }
}

//*******************************************************************************
// Hooks
//*******************************************************************************
onMounted(() => {
  createSidebarMenu()
  toggleSidebarMode()
  env('mediaquery').addEventListener('change', (event: MediaQueryListEvent) => toggleResponsive(!event.matches))
  window.addEventListener('scroll', toggleSidebarMode)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', toggleSidebarMode)
})
</script>

<template>
  <section class="ec-product font_en">
    <div class="ec-product-main">
      <div class="container">
        <div ref="shopBody" class="grid lg:flex gap-1 lg:gap-5 mb-2 lg:mb-5">
          <div class="flex-auto lg:w-3/5">
            <Carousel
              model="showcase"
              :id="state.sku"
              :ratio="[1, 1]"
              :src="[
                { src: '/dummy/dummy1_thumb.webp', url: '/dummy/dummy1.webp' },
                { src: '/dummy/dummy2_thumb.webp', url: '/dummy/dummy2.webp' },
                { src: '/dummy/dummy3_thumb.webp', url: '/dummy/dummy3.webp' },
                { src: '/dummy/dummy4_thumb.webp', url: '/dummy/dummy4.webp' },
                { src: '/dummy/dummy5_thumb.webp', url: '/dummy/dummy5.webp' },
              ]"
            />
          </div>

          <div id="ec-product-checkpoint" class="flex-auto lg:w-2/5">
            <div class="flex gap-0.25 mb-1">
              <Chip model="sm border" title="NatureMade" />
              <Chip model="sm border" title="HealthCare" />
            </div>

            <h1 style="line-height: 1.25">High Absorption Magnesium Glycinate</h1>
            <p class="text-danger" style="font-size: 1.5rem">$19.99</p>
            <hr />
            <p style="font-size: 0.875rem">
              Formulated with 23 key nutrients for daily nutritional support. It’s one convenient tablet with one
              impressive collection of nutrients.
            </p>

            <div class="flex gap-1.5 mt-1.5 mb-1.5">
              <div>
                <strong class="block">Count</strong>
                <Checkbox
                  type="radio"
                  model="box md"
                  :name="`${state.sku}_30`"
                  :value="`${state.sku}_30`"
                  :model-value="`${state.sku}_30`"
                  label="30"
                />
              </div>
              <div>
                <strong class="block">Quantity</strong>
                <Quantity v-model="state.quantity" :min="1" :max="99" :name="state.sku" />
              </div>
            </div>

            <Button model="lg bg block" color="primary" :disabled="state.quantity === 0">
              <Icon value="shopping_cart" />
              ADD TO CART
            </Button>
          </div>
        </div>

        <div ref="itemBody" class="ec-product-body">
          <h2 class="section-heading-sm">Daily Greens Plus Details</h2>
          <p>
            Thorne’s Daily Greens Plus provides a blend of great-tasting, clinically studied ingredients that support a
            healthy mind and body.* Daily Greens Plus provides a comprehensive approach to foundational nutrition, with
            the added focus of supporting healthy aging.* This unique greens powder formula combines the highest-quality
            sources of green nutrition with adaptogens that support a healthy stress response and adrenal function, as
            well as antioxidant blend that boosts the body’s defenses against oxidative damage and a mushroom blend that
            promotes optimal immune function.*
          </p>
          <p>
            What sets Daily Greens Plus apart is Thorne’s approach to total transparency. Every ingredient amount and
            blend is listed on the label – with no “proprietary blend” in sight. We eliminate the guesswork from your
            greens – so you know exactly what you are putting in your body.
          </p>
          <p class="mb-0"><strong>Benefits of the ingredients in Thorne’s Daily Greens Plus:</strong></p>
          <ul class="text-sm">
            <li>Cellular health and energy production is enhanced for a greens powder you can feel*</li>
            <li>Greens-based support helps provide foundational daily nutrition*</li>
            <li>Added benefit to a well-rounded approach to a healthy aging lifestyle*&nbsp;</li>
            <li>Support for cognitive performance and having a clear head*</li>
            <li>Promotes a healthy stress response and optimal immune function*</li>
            <li>Helps protect against environmental stressors that can cause cellular damage*</li>
            <li>Benefits physical endurance, as well as physical and mental recovery*</li>
          </ul>

          <h2 class="section-heading-sm">How to Use</h2>
          <p>
            Shake product before each use. Mix 1 level scoop with at least 12 ounces of water or preferred beverage
            daily or as recommended by your health-care practitioner.
          </p>

          <h2 class="section-heading-sm">Ingredient Information</h2>
          <p>
            Serving Size: 1 Capsules<br />
            Servings Per Container: 60
          </p>
          <Expansion model="border" title="Ingredient Amounts">
            <table class="table text-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Name</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Ashwagandha Extract (Withania somnifera)</td>
                  <td>225mg</td>
                </tr>
                <tr>
                  <td>Betaine Anhydrous (Trimethylglycine)</td>
                  <td>21mg</td>
                </tr>
                <tr>
                  <td>Biotin</td>
                  <td>4mg</td>
                </tr>
                <tr>
                  <td>Chaga Mushroom (Inonotus obliquus)</td>
                  <td>250mg</td>
                </tr>
              </tbody>
            </table>
            <p class="text-sm">
              <strong>Other Ingredients:</strong> Hypromellose Capsule, Microcrystalline Cellulose, Silicon Dioxide
            </p>
          </Expansion>

          <h2 class="section-heading-sm">Warnings</h2>
          <p>
            <strong>PROPOSITION 65 WARNING NOTICE FOR CALIFORNIA RESIDENTS</strong><br />Consuming this product can
            expose you to chemicals including lead, which is known to the State of California to cause birth defects or
            other reproductive harm. For more information go to www.P65Warnings.ca.gov/food.
          </p>
          <p>
            <strong>ALLERGY WARNING</strong><br />This product is contraindicated in an individual with a history of
            hypersensitivity to any of its ingredients.
          </p>
        </div>
      </div>
    </div>

    <div ref="sidebar" :class="`ec-product-side ${state.sidebar.mode}`">
      <div ref="sidemenu" class="ec-product-side-nav">
        <a href="/" @click.prevent="pageScroll('#ec-product-checkpoint', state.isMobile ? 16 : 40)">Buy</a>
        <a
          v-if="state.sidebar.content.length && !state.isMobile"
          v-for="item in state.sidebar.content"
          @click.prevent="pageScroll('#' + item.id, 40)"
          >{{ item.title }}</a
        >
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '/styles/core/core' as *;

@mixin ecSectionPaddingY {
  padding-top: 3rem;
  padding-bottom: 3rem;

  @include breakpointUp {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

.ec-product {
  @include breakpointUp {
    display: flex;
    padding: 0;
  }
}

.ec-product-main {
  @include ecSectionPaddingY;

  @include breakpointUp {
    flex: 1 1 auto;
  }
}

.ec-product-side {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  @include breakpointUp {
    flex: 0 0 auto;
    width: 300px;
    background-color: $color-muted-bg;
    border-left: 1px solid $color-border;
    padding: 0;

    @include darkmode {
      background-color: $dark-color-muted-bg;
      border-color: $dark-color-border;
    }

    &.following {
      ::v-deep(.ec-product-side-nav) {
        position: fixed;
        z-index: $zindex-bar;
        top: 80px;
      }
    }

    &.followend {
      justify-content: flex-end;
    }
  }

  @include breakpointDown {
    display: none;
    background-color: white;
    border-top: 1px solid $color-border;
    padding-bottom: calc(env(safe-area-inset-bottom) + 0);

    @include darkmode {
      background-color: black;
      border-color: $dark-color-border;
    }

    &.following {
      display: block;
      position: fixed;
      z-index: $zindex-bar;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}

.ec-product-side-nav {
  position: static;
  display: grid;
  gap: 0.5rem;

  @include breakpointUp {
    width: inherit;
    @include ecSectionPaddingY;
  }

  @include breakpointDown {
    padding: 0.5rem 1rem;
  }

  a {
    display: block;
    padding: 0.5rem 2rem;
    color: $color-body;
    line-height: $icon-size;
    @include transition((color, transform));

    @include darkmode {
      color: $dark-color-body;
    }

    @include breakpointUp {
      @include focusMouse {
        color: $color-link-hover;
        transform: translateX(-4px);
      }
    }

    &:first-child {
      @include breakpointDown {
        text-align: center;
        border: 1px solid $color-body;
        @include rounded(999px);
        padding: 0.5rem;
        transition: none;

        &:active {
          transform: scale(0.98);
        }
      }
    }
  }
}
</style>
