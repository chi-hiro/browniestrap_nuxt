import { scrollElement } from '@/lib/pageScroll'
import { elementInScreen, elementShowPos } from '@/lib/elementInScreen'

const reset = true

export const reveal = () => {
  window.addEventListener('pageshow', watch)
  window.addEventListener('scroll', watch)
}

const watch = (event: Event) => {
  const allItem = document.querySelectorAll<HTMLElement>('.reveal')
  const activeItem = document.querySelectorAll<HTMLElement>('.reveal-active')

  if (!reset && allItem.length == activeItem.length) {
    window.removeEventListener('scroll', watch)
  } else {
    const scrollPos = scrollElement().scrollTop

    allItem.forEach((item) => {
      if (item) {
        if (!reset) {
          if (!item.classList.contains('reveal-active')) {
            scrollPos > elementShowPos(item) && item.classList.add('reveal-active')
          }
        } else {
          if (elementInScreen(item)) {
            item.classList.add('reveal-active')
          } else {
            event.type === 'scroll' && item.classList.remove('reveal-active')
          }
        }
      }
    })
  }
}
