
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITEM } from '../components/Cart/Cart';
import { PRODUCT } from '../components/Detail/Detail';
export interface Account {
    email: string,
    password: string
}
// export interface ITEM {
//     product: PRODUCT,
//     quantity: number,
//     color: string,
//     size: string,
//     image: string
// }
export interface CartWithNoToken {
    items: ITEM[],
    subTotal: number,
}
export interface UserInfor {
    _id: string,
    name: string,
    googleId: string,
    birthday: Date,
    gender: string,
    photo: string,
    phone: string,
    address: string,
    role: string,
    email: string,
    id: string
}
export interface USER_UPDATE {
    name: string,
    birthday: Date,
    gender: string,
    phone: string,
    address: string,
    email: string,
}
export interface AuthState {
    token: string;
    user: UserInfor;
    cart: CartWithNoToken;
    timeExpire: number
}
export const initialStateAuth: AuthState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") || "") : "",
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : {
        _id: "",
        name: "",
        gender: "",
        googleId : "",
        birthday: new Date(),
        photo: "",
        phone: "",
        address: "",
        role: "",
        email: "",
        id: "",
    },
    cart: sessionStorage.getItem("carts")
        ? JSON.parse(sessionStorage.getItem("carts") || "")
        : { items: [], subTotal: 0 },
    timeExpire: localStorage.getItem("timeExpire") ? JSON.parse(localStorage.getItem("timeExpire") || "") : 0,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        login: (state, action: PayloadAction<{ tokenDispatch: string, userDispatch: UserInfor , timeExpire: number }>) => {
            const newState: AuthState = {
                ...state,
                token: action.payload.tokenDispatch,
                user: action.payload.userDispatch,
                timeExpire: action.payload.timeExpire
            }
            localStorage.setItem("token", JSON.stringify(action.payload.tokenDispatch))
            localStorage.setItem("user", JSON.stringify(action.payload.userDispatch))
            localStorage.setItem("timeExpire", JSON.stringify(action.payload.timeExpire))

            return newState
        },
        logout: (state) => {
            localStorage.setItem("token", JSON.stringify(""))
            localStorage.setItem("user", JSON.stringify({
                _id: "",
                name: "",
                gender: "",
                googleId: "",
                birthday: new Date(),
                photo: "",
                phone: "",
                address: "",
                role: "",
                email: "",
                id: ""
            }))
            localStorage.removeItem("timeExpire")
            return {
                ...state,
                token: '',
                user: {
                    _id: "",
                    name: "",
                    gender: "",
                    googleId : "",
                    birthday: new Date(),
                    photo: "",
                    phone: "",
                    address: "",
                    role: "",
                    email: "",
                    id: ""
                }
            }
        },
        changeInforUserImage: (state, action: PayloadAction<{ userDispatch: UserInfor }>) => {
            localStorage.setItem("user", JSON.stringify(action.payload.userDispatch))
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload.userDispatch
                }
            }
        },
        getItemsCart: (state, action: PayloadAction<{ carts: CartWithNoToken }>) => {
            const newState: AuthState = {
                ...state,
                cart: action.payload.carts
            }

            return newState
        },
        addCartNoToken: (state, action: PayloadAction<ITEM>) => {
            const checkCartItem = state.cart.items.findIndex((each, index) => {
                return (
                    each.product._id.toLowerCase() === action.payload.product._id.toLowerCase() &&
                    each.color.toLowerCase() === action.payload.color.toLowerCase() &&
                    each.size.toLowerCase() === action.payload.size.toLowerCase()
                )
            });

            if (checkCartItem > -1) {

                state.cart.items[checkCartItem].quantity = state.cart.items[checkCartItem].quantity + action.payload.quantity;

            }
            else {
                state.cart.items.push({
                    product: action.payload.product,
                    quantity: action.payload.quantity,
                    color: action.payload.color,
                    colorName : action.payload.colorName,
                    size: action.payload.size,
                    image: action.payload.image,
                })
            }
            let subTotal = 0;
            state.cart.items.forEach((item, idx: number) => {
                subTotal += item.product.newPrice * item.quantity
            })

            state.cart.subTotal = subTotal
            sessionStorage.setItem("carts", JSON.stringify(state.cart))
            return state
        },

        setEmptyCart: (state) => {
            sessionStorage.removeItem("carts")
            return {
                ...state,
                cart: {
                    items: [],
                    subTotal: 0
                }
            }
        },


        decCartNoToken: (state, action: PayloadAction<ITEM>) => {
            const checkCartItem = state.cart.items.findIndex((each, el) => {
                return each.product._id.toLowerCase() === action.payload.product._id.toLowerCase() && each.color.toLowerCase() === action.payload.color.toLowerCase() && each.size.toLowerCase() === action.payload.size.toLowerCase()
            })
            if (checkCartItem > -1) {
                if (state.cart.items[checkCartItem].quantity === 1)
                    state.cart.items[checkCartItem].quantity = 1
                else {
                    state.cart.items[checkCartItem].quantity = state.cart.items[checkCartItem].quantity - 1
                }
            }
            let subTotal = 0;
            state.cart.items.forEach((item, idx: number) => {
                subTotal += item.product.newPrice * item.quantity
            })

            state.cart.subTotal = subTotal
            sessionStorage.setItem("carts", JSON.stringify(state.cart))
            return state
        },

        inCartNoTken: (state, action: PayloadAction<ITEM>) => {
            const checkCartItem = state.cart.items.findIndex((each, el) => {
                return each.product._id.toLowerCase() === action.payload.product._id.toLowerCase() && 
                each.color.toLowerCase() === action.payload.color.toLowerCase() && 
                each.size.toLowerCase() === action.payload.size.toLowerCase()
            })
            if (checkCartItem > -1) {
                state.cart.items[checkCartItem].quantity = state.cart.items[checkCartItem].quantity + 1
            }
            let subTotal = 0;
            state.cart.items.forEach((item, idx: number) => {
                subTotal += item.product.newPrice * item.quantity
            })

            state.cart.subTotal = subTotal
            sessionStorage.setItem("carts", JSON.stringify(state.cart))
            return state
        },

        clearEach: (state, action: PayloadAction<ITEM>) => {
            state.cart.items = state.cart.items.filter(item => {
                return item.product._id.toLowerCase() !== action.payload.product._id.toLowerCase() ||
                    item.color.toLowerCase() !== action.payload.color.toLowerCase() ||
                    item.size.toLowerCase() !== action.payload.size.toLowerCase();
            });
            let subTotal = 0;
            state.cart.items.forEach((item, idx: number) => {
                subTotal += item.product.newPrice * item.quantity
            })

            state.cart.subTotal = subTotal
            sessionStorage.setItem("carts", JSON.stringify(state.cart));
            return state;
        }

    },
})

export const { 
    login, 
    logout, 
    addCartNoToken, 
    setEmptyCart, 
    decCartNoToken, 
    inCartNoTken, 
    clearEach, 
    changeInforUserImage, 
    getItemsCart 
} = authSlice.actions

export default authSlice.reducer