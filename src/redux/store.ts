//import mainReducer from './mainSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import serviceApi from '../services/firebaseService';

import selfReducer from './slices/selfSlice/slice';
import followReducer from './slices/followSlice/slice';
import notificationsReducer from './slices/notificationsSlice/slice';
import postDetailsReducer from './slices/postDetailsSlice/slice';
import profileReducer from './slices/profileSlice/slice';
import postsReducer from './slices/postsSlice/slice';

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'self', storage, version: 1 };
const persistedSelfReducer = persistReducer(persistConfig, selfReducer);

const rootReducer = combineReducers({
    self: persistedSelfReducer,
    follow: followReducer,
    notifications: notificationsReducer,
    postDetails: postDetailsReducer,
    profile: profileReducer,
    posts: postsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { serviceApi }
            },
            serializableCheck: false
        })
});

export default store;


/*const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, mainReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { serviceApi }
            },
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export default store;*/