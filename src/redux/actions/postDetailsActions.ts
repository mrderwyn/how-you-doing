import { type CommentType } from '../../types'
import { setLoading, setPostDetails, updateComments } from '../slices/postDetailsSlice/slice'
import { type ArgumentType } from '../types'

let clearCommentsListener = () => {}
export const fetchPostDetails = (id: any) => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
  clearCommentsListener()
  const { serviceApi } = extraArgument
  dispatch(setLoading(true))
  dispatch(setPostDetails({ details: null }))

  const post = await serviceApi.getPostById(id)
  const [comments, unsubscribe] = await serviceApi.getCommentsWithListener(id, {
    addComment: (comment: CommentType) => {
      dispatch(updateComments({ type: 'addComment', comment }))
    },
    removeComment: (comment: CommentType) => {}
  })

  clearCommentsListener = () => { unsubscribe() }
  dispatch(setLoading(false))
  dispatch(setPostDetails({ details: { post, comments } }))
}

export const stopListeningComments = () => {
  clearCommentsListener()
}

export const sendComment = (text: string) => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
  const { serviceApi } = extraArgument
  const state = getState()
  await serviceApi.createComment(state.postDetails.postDetails.post.id, state.self.self.id, text)
}
