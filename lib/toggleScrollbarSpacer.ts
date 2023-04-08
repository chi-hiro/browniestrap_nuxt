export const toggleScrollbarSpacer = async (value: boolean): Promise<boolean> => {
  const body = document.body
  const barW = 'ontouchstart' in window ? 0 : window.innerWidth - body.clientWidth

  return new Promise((resolve) => {
    if (value) {
      body.classList.add('hide_scrollbar')
      body.style.paddingRight = barW + 'px'
      resolve(true)
    } else {
      window.setTimeout(() => {
        body.classList.remove('hide_scrollbar')
        body.style.paddingRight = ''
        resolve(true)
      }, 300)
    }
  })
}
