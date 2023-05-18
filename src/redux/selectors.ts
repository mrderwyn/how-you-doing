import { StateType } from './types';

export const isSelfProfileSelector = (state: StateType) =>
    state.profile.profile.info !== null && state.profile.profile.info.id === state.self.self?.id;

export const commentsSelector = (state: StateType) => state.postDetails.postDetails?.comments ?? null;

export const postDetailsSelector = (state: StateType) => state.postDetails.postDetails?.post ?? null;

export const selfSelector = (state: StateType) => {
    return state.self.self;
}

export const postsSelector = (state: StateType) => {
    return state.posts.posts;
}

export const nextPostsSelector = (state: StateType) => state.posts.loadNext;
export const hasNextPostsSelector = (state: StateType) => state.posts.hasNext;

export const profileSelector = (state: StateType) => state.profile.profile.info;

export const profileFollowSelector = (state: StateType) => state.profile.profile?.follow ?? [];
export const profileFollowersSelector = (state: StateType) => state.profile.profile?.followers ?? [];

export const tokenSelector = (state: StateType) => state.self.token;

export const followsSelector = (state: StateType) => {
    return state.follow.follows;
}

export const unreadNotificationsSelector = (state: StateType) => state.notifications.notifications.unreaded ?? [];

export const notificationsSelector = (state: StateType) => state.notifications.notifications;

export const postDetailsLoadingSelector = (state: StateType) => state.postDetails.loading;
export const profileLoadingSelector = (state: StateType) => state.profile.loading;