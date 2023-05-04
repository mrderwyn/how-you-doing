import { createSlice } from '@reduxjs/toolkit';

import { getSelf} from '../services/mockService';

const initialState = {
    self: getSelf(),
    posts: [],
    profile: null,
    postDetails: null,
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setProfile: (state, action) => {
            console.log('setprofileaction', action);
            state.profile = action.payload.user;
        },
        setPostDetails: (state, action) => {
            state.postDetails = ({
                post: action.payload.post,
                comments: action.payload.comments,
            } as any);
        }
    }
});

export const fetchPostDetails = (id: any) => async (dispatch: any, getState: any, extraArgument: any) => {
    const { serviceApi } = extraArgument;
    const post = serviceApi.getPost(id);
    const comments = serviceApi.getComments(id);
    dispatch(setPostDetails({ post, comments }));
};

export const fetchPosts = (from: any, query: any, promt: any) => async (dispatch: any, getState: any, extraArgument: any) => {
    const { serviceApi } = extraArgument;
    const data = serviceApi.filterPosts(from, query, promt);
    dispatch(setPosts({ posts: data }));
}

export const fetchProfile = (id: any) => async (dispatch: any, getState: any, extraArgument: any) => {
    const { serviceApi } = extraArgument;
    const profile = serviceApi.getFullUserInfo(id, getState().self.id);
    console.log('fetched profile', profile);
    dispatch(setProfile({ user: profile }));
};

export const { setProfile, setPosts, setPostDetails } = mainSlice.actions;
export default mainSlice.reducer;