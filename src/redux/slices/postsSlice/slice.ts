import { createSlice } from '@reduxjs/toolkit';
import { PostsSliceType } from './types';

const initialState: PostsSliceType = {
    posts: null,
    loadNext: null,
    hasNext: false,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
            state.loadNext = action.payload.next;
            state.hasNext = true;
        },
        updatePosts: (state, action) => {
            if (state.posts === null) {
                return;
            }

            switch (action.payload.type) {
                case 'addPost':
                    if (state.posts.some(p => p.id === action.payload.post.id)) {
                        break;
                    }

                    state.posts =[
                        action.payload.post,
                        ...state.posts
                    ];
                    break;
                default:
                    break;
            }
        },
        addPostsToEnd: (state, action) => {
            if (state.posts === null) {
                console.log('INFINITY addToEnd is null');
                return;
            }

            
            console.log('INFINITY addToEnd', action.payload);
            state.posts = [
                ...state.posts,
                ...action.payload.posts
            ];
            state.hasNext = action.payload.hasMore;
        }
    }
});

export const {
    setPosts,
    updatePosts,
    addPostsToEnd
} = postsSlice.actions;
export default postsSlice.reducer;