import {configureStore} from '@reduxjs/toolkit'
import adminProduct from '../slices/adminProduct'
import  authSlice  from '../slices/authSlice'
import cartSlice from '../slices/cartSlice'


export const store = configureStore({
    reducer : {
        cart :  cartSlice,
        auth : authSlice,
        adminProduct : adminProduct
    }
})

export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch