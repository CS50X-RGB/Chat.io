import { configureStore } from '@reduxjs/toolkit';
import './features/cart/authSlice';
import authReducer from './features/cart/authSlice';

export const store = configureStore({
    reducer:{
        auth : authReducer
    }
})

