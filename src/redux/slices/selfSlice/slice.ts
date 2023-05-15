import { createSlice } from '@reduxjs/toolkit';
import { SelfStateType } from './types';

const initialState : SelfStateType = {
    self: null,
    token: '',
};

export const selfSlice = createSlice({
    name: 'self',
    initialState,
    reducers: {
        setSelf: (state, action) => {
            state.self = action.payload.user;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        updateSelf: (state, action) => {
            state.self = {
                ...state.self,
                ...action.payload,
            };
        },
        logOut: (state, action) => {
            state.self = null;
            state.token = '';
        }
    }
});

export const {
    setSelf,
    setToken,
    updateSelf,
    logOut
} = selfSlice.actions;
export default selfSlice.reducer;