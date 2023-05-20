import { type PostType } from '../../../types'

export interface PostsSliceType {
  posts: PostType[] | null
  loadNext: null | (() => Promise<readonly [PostType[], false] | readonly [PostType[], true] | undefined>)
  hasNext: boolean
}
