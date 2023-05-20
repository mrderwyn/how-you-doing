import { type CommentType, type PostType } from '../../../types'

interface PostDetailsType {
  post: PostType | null
  comments: CommentType[]
}

export interface PostDetailsSliceType {
  postDetails: PostDetailsType
  loading: boolean
}
