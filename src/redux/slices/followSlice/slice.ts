import { createSlice } from '@reduxjs/toolkit'
import { type FollowSliceType } from './types'

const initialState: FollowSliceType = {
  follows: []
}

export const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    setFollows: (state, action) => {
      state.follows = action.payload
    },
    addFollow: (state, action) => {
      state.follows = [
        ...state.follows.filter(u => u.id !== action.payload.user.id),
        action.payload.user
      ]
    },
    removeFollow: (state, action) => {
      state.follows = state.follows.filter(u => u.id !== action.payload.user.id)
    }
  }
})

export const {
  setFollows,
  addFollow,
  removeFollow
} = followSlice.actions
export default followSlice.reducer
