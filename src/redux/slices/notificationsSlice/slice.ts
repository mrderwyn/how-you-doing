import { createSlice } from '@reduxjs/toolkit'
import { type NotificationSliceType } from './types'

const initialState: NotificationSliceType = {
  notifications: {
    unreaded: [],
    readed: []
  }
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      if (action.payload.notifications === null) {
        state.notifications = {
          unreaded: [],
          readed: []
        }
        return
      }

      state.notifications = {
        unreaded: action.payload.notifications.unreaded ?? [],
        readed: action.payload.notifications.readed ?? []
      }
    },
    addUnreadedNotification: (state, action) => {
      if (!state.notifications) {
        return
      }

      state.notifications.unreaded = [
        action.payload.notification,
        ...state.notifications.unreaded
      ]
    },
    readAllNotifications: (state, action) => {
      if (state.notifications.unreaded.length === 0) {
        return
      }

      state.notifications.readed = [
        ...state.notifications.unreaded,
        ...state.notifications.readed
      ]
      state.notifications.unreaded = []
    }
  }
})

export const {
  setNotifications,
  addUnreadedNotification,
  readAllNotifications
} = notificationsSlice.actions
export default notificationsSlice.reducer
