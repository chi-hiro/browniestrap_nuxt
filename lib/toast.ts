import { h, render } from 'vue'
import Notification from '@/components/ui/Notification.vue'

export const toast = (color: string, message: string, position?: string) => {
  if (typeof window === 'object') {
    const instance = h(Notification, { color, message, position })
    const container = document.createElement('div')
    container.classList.add('notification-dummy')
    document.body.appendChild(container)
    render(instance, container)
  }
}
