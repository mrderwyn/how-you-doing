import { createSlice } from '@reduxjs/toolkit'
import { type PostDetailsSliceType } from './types'

const initialState: PostDetailsSliceType = {
  postDetails: {
    post: null,
    comments: []
  },

  loading: false
}

export const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setPostDetails: (state, action) => {
      if (action.payload.details === null) {
        state.postDetails.post = null
        state.postDetails.comments = []
        return
      }

      state.postDetails = {
        post: action.payload.details.post ?? null,
        comments: action.payload.details.comments ?? []
      }
    },
    updateComments: (state, action) => {
      if (state.postDetails === null) {
        return
      }

      switch (action.payload.type) {
        case 'addComment':
          if (state.postDetails.comments.some(c => c.id === action.payload.comment.id)) {
            break
          }

          state.postDetails.comments = [
            action.payload.comment,
            ...state.postDetails.comments
          ]
          break
        default:
          break
      }
    }
  }
})

export const {
  setPostDetails,
  updateComments,
  setLoading
} = postDetailsSlice.actions
export default postDetailsSlice.reducer
