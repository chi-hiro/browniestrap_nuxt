import { variables } from '@/lib/styleUtl'

export const env = (checkData: string) => {
  const ua = window.navigator.userAgent.toLowerCase()

  switch (checkData) {
    case 'userAgent':
      if (/ipod|iphone/.test(ua) || (/android/.test(ua) && /mobile/.test(ua))) {
        return 'view_sp'
      } else if (
        (/ipad|macintosh/.test(ua) && 'ontouchend' in document) ||
        (/android/.test(ua) && !/mobile/.test(ua))
      ) {
        return 'view_tb'
      } else {
        return 'view_pc'
      }

    case 'touch':
      return 'ontouchstart' in window

    case 'orientation':
      return window.innerWidth < window.innerHeight ? 'portrait' : 'landscape'

    case 'viewport':
      if (
        window.innerWidth >= variables.breakpoint ||
        window.innerWidth > window.innerHeight ||
        (/ipad|macintosh/.test(ua) && 'ontouchend' in document) ||
        (/android/.test(ua) && !/mobile/.test(ua))
      ) {
        return 'initial-scale=1.0, user-scalable=no, width=device-width, minimum-scale=1.0, maximum-scale=1.0'
      } else {
        return 'user-scalable=no, width=390, viewport-fit=cover'
      }

    case 'font':
      return `font_${document.documentElement.lang}`

    case 'mobile':
      return !window.matchMedia(`(min-width: ${variables.breakpoint}px)`).matches

    case 'mediaquery':
      return window.matchMedia(`(min-width: ${variables.breakpoint}px)`)

    case 'breakpoint':
      return variables.breakpoint
  }
}
