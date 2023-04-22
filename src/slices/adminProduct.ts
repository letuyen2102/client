import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PRODUCT_ADMIN {
    name: string ,
    description: string ,
    oldPrice: number ,
    sale : number ,
    category: string,
    type: string ,
    image: string ,
    color: string ,
    size: string ,
    quantity: number
}

export const initialStatePrice: PRODUCT_ADMIN = {
    name: '' ,
    description: '' ,
    oldPrice: 0 ,
    sale : 0 ,
    category: '',
    type: '' ,
    image: '' ,
    color: '' ,
    size: '' ,
    quantity: 0
    
}

export const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState : initialStatePrice,
    reducers: {
        filterPrice : (state) => {
            
        }
    },
})

// Action creators are generated for each case reducer function
export const { } = adminProductSlice.actions

export default adminProductSlice.reducer