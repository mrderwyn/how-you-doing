import mainReducer from './mainSlice';
import { configureStore } from '@reduxjs/toolkit';
import serviceApi from '../services/mockService';

const store = configureStore({
    reducer: mainReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { serviceApi }
            }
        })
});

export default store;