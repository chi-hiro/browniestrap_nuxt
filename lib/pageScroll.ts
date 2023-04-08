export const pageScroll = (hash: string, margin?: number) => {
  const header = document.querySelector<HTMLElement>('#header')
  let buffer = header ? header.offsetHeight : 0
  if (margin && margin > 0) buffer += margin
  let top: number = 0

  if (hash !== 'pagetop') {
    const target = document.querySelector<HTMLElement>(hash)
    if (target) top = target.getBoundingClientRect().top + scrollElement().scrollTop - buffer
  }

  scrollElement().scrollTo({ top, behavior: 'smooth' })
}

export const scrollElement = () => {
  return document.scrollingElement!
}
