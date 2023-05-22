import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CARTHANDLE {
    orderQuantity: number,
    tab: number,
    tabColor: number,
    tabSize: number | null,
    disableBtn: boolean
}
export const initialStateDetailCart: CARTHANDLE = {
    orderQuantity: 1,
    tab: 1,
    tabColor: 0,
    tabSize: null,
    disableBtn: false
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
        setDisable: (state) => {
            return {
                ...state,
                disableBtn: true
            }
        },
        setEnable: (state) => {
            return {
                ...state,
                disableBtn: false
            }
        },
        setTabColor: (state, action: PayloadAction<number>) => {
            return { ...state, tabColor: action.payload, tabSize : null, orderQuantity: 1, disableBtn: false }
        },
        setTabSize: (state, action: PayloadAction<number>) => {
            return { ...state, tabSize: action.payload, orderQuantity: 1, disableBtn: false }
        },
        setTab: (state, action: PayloadAction<number>) => {
            return { ...state, tab: action.payload, disableBtn: false }
        },
        defaultTab: (state) => {
            return {
                orderQuantity: 1,
                tab: 1,
                tabColor: 0,
                tabSize: null,
                disableBtn: false
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { decCart, inCart, setTabColor, setTabSize, setTab, defaultTab, setDisable, setEnable } = cartSlice.actions

export default cartSlice.reducer