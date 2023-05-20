import { type NotificationType } from '../../../types'

interface NotificationsType {
  readed: NotificationType[]
  unreaded: NotificationType[]
}

export interface NotificationSliceType {
  notifications: NotificationsType
}
