import { type PostType } from '../../types'
import { setPosts, updatePosts } from '../slices/postsSlice/slice'
import { type ArgumentType } from '../types'

let clearPostsListener = () => {}
export const fetchPosts = (from: any, query: any, promt: any) => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
  clearPostsListener()

  const { serviceApi } = extraArgument

  const [data, unsubscribe, next] = await serviceApi.filterPosts(
    getState().self.self.id, from, query, promt, {
      addPost: (post: PostType) => {
        dispatch(updatePosts({ type: 'addPost', post }))
      },
      removePost: (post: PostType) => {}
    }
  )

  const generateNext = () => {
    let hasNext = true
    return async () => {
      if (!hasNext) {
        return
      }

      const result = await next()
      if (!result[1]) {
        hasNext = false
      }

      return result
    }
  }

  clearPostsListener = () => { unsubscribe() }
  dispatch(setPosts({ posts: data, next: generateNext() }))
}

export const stopListenPosts = () => {
  clearPostsListener()
}
