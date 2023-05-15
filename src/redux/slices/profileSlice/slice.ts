import { createSlice } from '@reduxjs/toolkit';
import { ProfileSliceType } from './types';

const initialState: ProfileSliceType = {
    profile: {
        info: null,
        follow: [],
        followers: [],
    }
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            if (action.payload.user === null) {
                state.profile.info = null;
                state.profile.follow = [];
                state.profile.followers = [];
                return;
            }

            state.profile.info = {
                id: action.payload.user.id,
                name: action.payload.user.name,
                avatar: action.payload.user.avatar,
                background: action.payload.user.background,
                description: action.payload.user.description,
            };
            state.profile.follow = action.payload.user.follow;
            state.profile.followers = action.payload.user.followers;
        },
        updateProfilePeoples: (state, action) => {

            switch (action.payload.type) {
                case 'addFollower':
                    if (state.profile.follow.some(u => u.id === action.payload.user.id)) {
                        break;
                    }
                    
                    state.profile.follow = [
                        ...state.profile.follow,
                        action.payload.user
                    ];
                    break;
                case 'removeFollower':
                    if (state.profile.follow.every(u => u.id !== action.payload.user.id)) {
                        break;
                    }

                    state.profile.follow = state.profile.follow.filter(u => u.id !== action.payload.user.id);
                    break;
                case 'addFollowed':
                    if (state.profile.followers.some(u => u.id === action.payload.user.id)) {
                        break;
                    }

                    state.profile.followers = [
                        ...state.profile.followers,
                        action.payload.user
                    ];
                    break;
                case 'removeFollowed':
                if (state.profile.followers.every(u => u.id !== action.payload.user.id)) {
                        break;
                    }

                    state.profile.followers = state.profile.followers.filter(u => u.id !== action.payload.user.id);
                    break;
                default:
                    break;
            }
        },
    }
});

export const {
    setProfile,
    updateProfilePeoples
} = profileSlice.actions;
export default profileSlice.reducer;