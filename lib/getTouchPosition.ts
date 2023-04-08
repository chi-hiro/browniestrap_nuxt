export const getTouchPosition = (event: Event, direction: string) => {
  if ('ontouchstart' in window) {
    const e = event as TouchEvent

    switch (direction) {
      case 'X':
        return e.changedTouches[0].pageX

      case 'Y':
        return e.changedTouches[0].pageY

      default:
        return 0
    }
  } else {
    const e = event as MouseEvent

    switch (direction) {
      case 'X':
        return e.pageX

      case 'Y':
        return e.pageY

      default:
        return 0
    }
  }
}
