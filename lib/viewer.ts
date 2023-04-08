import { h, render } from 'vue'
import Viewer from '@/components/viewer/Viewer.vue'

export const openViewer = (e: Event) => {
  e.preventDefault()
  const target = e.currentTarget as HTMLAnchorElement

  if (target) {
    const viewerData = createViewerData(
      target.getAttribute('href') as string,
      target.getAttribute('data-viewer-group') as string
    )

    const instance = h(Viewer, {
      mode: viewerData.mode,
      items: viewerData.items,
      activeItem: viewerData.activeItem,
    })
    const container = document.createElement('div')
    container.setAttribute('id', 'viewer-container')
    document.body.appendChild(container)
    render(instance, container)
  }
}

export const openViewerManual = (e: Event, target: string, group?: string) => {
  e.preventDefault()

  const viewerData = createViewerData(target, group)

  const instance = h(Viewer, { mode: viewerData.mode, items: viewerData.items, activeItem: viewerData.activeItem })
  const container = document.createElement('div')
  container.setAttribute('id', 'viewer-container')
  document.body.appendChild(container)
  render(instance, container)
}

const createViewerData = (target: string, group?: string) => {
  let mode: string = 'image'
  const items: string[] = []

  if (group) {
    document.querySelectorAll(`[data-viewer-group="${group}"]`).forEach((item) => {
      const url = item.getAttribute('href')
      url && items.push(url)
    })
  } else {
    const url = target
    if (url.slice(-3) == 'mp4') {
      mode = 'video'
    } else if (/youtube.com\/watch/.test(url)) {
      mode = 'youtube'
    }
    items.push(url)
  }

  const activeItem = items.indexOf(target)

  return { mode, items, activeItem }
}
