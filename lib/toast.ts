import { h, render } from 'vue'
import Notification from '@/components/ui/Notification.vue'

type ThemeType = 'info' | 'success' | 'warning' | 'danger'
type PositionType = 'top' | 'bottom' | 'left' | 'right' | 'center'
type DirectionType = 'x' | 'y'

export const toast = (theme: ThemeType, message: string, position?: PositionType, direction?: DirectionType) => {
  if (typeof window === 'object') {
    const instance = h(Notification, { theme, message, position, direction })
    const container = document.createElement('div')
    container.classList.add('notification-dummy')
    document.body.appendChild(container)
    render(instance, container)
  }
}
