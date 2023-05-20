import { type FirestoreServiceType } from '../services/types'
import { type SelfStateType } from './slices/selfSlice/types'
import { type FollowSliceType } from './slices/followSlice/types'
import { type PostDetailsSliceType } from './slices/postDetailsSlice/types'
import { type ProfileSliceType } from './slices/profileSlice/types'
import { type PostsSliceType } from './slices/postsSlice/types'
import { type NotificationSliceType } from './slices/notificationsSlice/types'

export interface IdentityObject {
  id: string
}

export interface ArgumentType {
  serviceApi: FirestoreServiceType
}

export interface StateType {
  self: SelfStateType
  follow: FollowSliceType
  notifications: NotificationSliceType
  postDetails: PostDetailsSliceType
  profile: ProfileSliceType
  posts: PostsSliceType
}
