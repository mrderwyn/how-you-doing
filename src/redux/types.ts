import { PostType, FullUserInfoType, CommentType, DetailedUserInfoType, LightUserInfoType, NotificationType } from '../types';
import { FirestoreServiceType } from '../services/types';
import { SelfStateType } from './slices/selfSlice/types';
import { FollowSliceType } from './slices/followSlice/types';
import { PostDetailsSliceType } from './slices/postDetailsSlice/types';
import { ProfileSliceType } from './slices/profileSlice/types';
import { PostsSliceType } from './slices/postsSlice/types';
import { NotificationSliceType } from './slices/notificationsSlice/types';

export type IdentityObject = {
    id: string
};

export type ArgumentType = {
    serviceApi: FirestoreServiceType
};

type PostDetailsType = {
    post: PostType,
    comments: CommentType[],
};

export type StateType = {
    self: SelfStateType,
    follow: FollowSliceType,
    notifications: NotificationSliceType,
    postDetails: PostDetailsSliceType,
    profile: ProfileSliceType,
    posts: PostsSliceType,
};