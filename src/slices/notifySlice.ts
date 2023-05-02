import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface NOTIFY {
    message: string,
    status: number,
    show: boolean
}
const initalStateNotify: NOTIFY = {
    message: "",
    status: 0,
    show: false
}


const notifySlice = createSlice({
    name: 'notify',
    initialState: initalStateNotify,
    reducers: {
        handleNotify: (state, action: PayloadAction<NOTIFY>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})


export const { handleNotify } = notifySlice.actions


export default notifySlice.reducer