import { scrollElement } from '@/lib/pageScroll'

export const elementInScreen = (target: HTMLElement) => {
  const scrPos = scrollElement().scrollTop
  return scrPos > elementShowPos(target) && scrPos < elementHidePos(target)
}

export const elementShowPos = (target: HTMLElement) => {
  if (!process.client) return 0
  return window.pageYOffset + target.getBoundingClientRect().top - window.innerHeight
}

export const elementHidePos = (target: HTMLElement) => {
  if (!process.client) return 0
  return window.pageYOffset + target.getBoundingClientRect().top + target.offsetHeight
}
