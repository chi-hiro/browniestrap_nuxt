import { scrollElement } from '@/lib/pageScroll'

export const elementInScreen = (target: HTMLElement) => {
  const scrPos = scrollElement().scrollTop
  return scrPos > elementShowPos(target) && scrPos < elementHidePos(target)
}

export const elementShowPos = (target: HTMLElement) => {
  return window.pageYOffset + target.getBoundingClientRect().top - window.innerHeight
}

export const elementHidePos = (target: HTMLElement) => {
  return window.pageYOffset + target.getBoundingClientRect().top + target.offsetHeight
}
