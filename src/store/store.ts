import { configureStore } from '@reduxjs/toolkit'
import adminProduct from '../slices/adminProduct'
import authSlice from '../slices/authSlice'
import cartSlice from '../slices/cartSlice'
import notifySlice from '../slices/notifySlice'
import loaderSlice from '../slices/loaderSlice'


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        adminProduct: adminProduct,
        notify: notifySlice,
        loader: loaderSlice
    }
})

export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch