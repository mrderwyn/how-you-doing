export const isSelfProfileSelector = (state: any) => state.profile === null || state.profile.id === state.self.id;

export const commentsSelector = (state: any) => state.postDetails.comments;

export const selfSelector = (state: any) => state.self;

export const postsSelector = (state: any) => state.posts;

export const profileSelector = (state: any) => state.profile;