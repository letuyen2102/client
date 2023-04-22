import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CARTHANDLE {
    orderQuantity: number,
    tab: number,
    tabColor: number,
    tabSize: number
}
export const initialStateDetailCart: CARTHANDLE = {
    orderQuantity: 1,
    tab: 1,
    tabColor: 0,
    tabSize: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialStateDetailCart,
    reducers: {
        decCart: (state) => {
            if (state.orderQuantity === 1) {
                return { ...state, orderQuantity: 1 }
            }
            return { ...state, orderQuantity: state.orderQuantity - 1 }
        },
        inCart: (state) => {
            return { ...state, orderQuantity: state.orderQuantity + 1 }
        },
        setTabColor: (state, action: PayloadAction<number>) => {
            return { ...state, tabColor: action.payload }
        },
        setTabSize: (state, action: PayloadAction<number>) => {
            return { ...state, tabSize: action.payload }
        },
        setTab: (state, action: PayloadAction<number>) => {
            return { ...state, tab: action.payload }
        },
        defaultTab: (state) => {
            return {
                orderQuantity: 1,
                tab: 1,
                tabColor: 0,
                tabSize: 0
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { decCart, inCart, setTabColor, setTabSize, setTab , defaultTab } = cartSlice.actions

export default cartSlice.reducer