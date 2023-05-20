import { type NotificationType } from '../../types'
import { addUnreadedNotification, setNotifications } from '../slices/notificationsSlice/slice'
import { type ArgumentType } from '../types'

let clearNotificationListener = () => {}
export const fetchNotifications = () => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
  clearNotificationListener()

  const { serviceApi } = extraArgument
  const self = getState().self.self
  dispatch(setNotifications({ notifications: null }))
  const [data, unsubscribe] = await serviceApi.getNotificationsWithListener(self.id, {
    addNotification: (notification: NotificationType) => {
      dispatch(addUnreadedNotification({ notification }))
    }
  })

  clearNotificationListener = () => { unsubscribe() }
  dispatch(setNotifications({ notifications: { readed: data, unreaded: [] } }))
}

export const stopListenNotifications = () => {
  clearNotificationListener()
}
