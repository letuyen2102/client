
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface Account {
    email: string,
    password: string
}
export interface CartWithNoToken {
    items: {
        product: {
            product: string,
            name: string,
            newPrice: number,
            image: string,
            slug: string
        },
        quantity: number,
        color: string,
        size: string
    }[],
    subTotal: number
}
export interface UserInfor {
    _id: string,
    name: string,
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
}
export const initialStateAuth: AuthState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") || "") : "",
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : {
        _id: "",
        name: "",
        gender: "",
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
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        login: (state, action: PayloadAction<{ tokenDispatch: string, userDispatch: UserInfor }>) => {
            const newState: AuthState = {
                ...state,
                token: action.payload.tokenDispatch,
                user: action.payload.userDispatch
            }
            localStorage.setItem("token", JSON.stringify(action.payload.tokenDispatch))
            localStorage.setItem("user", JSON.stringify(action.payload.userDispatch))

            return newState
        },
        logout: (state) => {
            localStorage.setItem("token", JSON.stringify(""))
            localStorage.setItem("user", JSON.stringify({
                _id: "",
                name: "",
                gender: "",
                birthday: new Date(),
                photo: "",
                phone: "",
                address: "",
                role: "",
                email: "",
                id: ""
            }))
            return {
                ...state,
                token: '',
                user: {
                    _id: "",
                    name: "",
                    gender: "",
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
        addCartNoToken: (state, action: PayloadAction<{
            name: string
            productId: string,
            quantity: number,
            color: string,
            size: string,
            image: string,
            slug: string,
            newPrice: number
        }>) => {
            const checkCartItem = state.cart.items.findIndex((each, el) => {
                return each.product.product.toLowerCase() === action.payload.productId.toLowerCase() && each.color.toLowerCase() === action.payload.color.toLowerCase() && each.size.toLowerCase() === action.payload.size.toLowerCase()
            })
            if (checkCartItem > -1) {

                state.cart.items[checkCartItem].quantity = state.cart.items[checkCartItem].quantity + action.payload.quantity;

            }
            else {
                state.cart.items.push({
                    product: {
                        product: action.payload.productId,
                        name: action.payload.name,
                        newPrice: action.payload.newPrice,
                        image: action.payload.image,
                        slug: action.payload.slug
                    },
                    quantity: action.payload.quantity,
                    color: action.payload.color,
                    size: action.payload.size
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
            sessionStorage.setItem("carts", JSON.stringify({
                items: [],
                subTotal: 0
            }))

            return {
                ...state,
                cart: {
                    items: [],
                    subTotal: 0
                }
            }
        },


        decCartNoToken: (state, action: PayloadAction<{ productId: string, color: string, size: string }>) => {
            const checkCartItem = state.cart.items.findIndex((each, el) => {
                return each.product.product.toLowerCase() === action.payload.productId.toLowerCase() && each.color.toLowerCase() === action.payload.color.toLowerCase() && each.size.toLowerCase() === action.payload.size.toLowerCase()
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

        inCartNoTken: (state, action: PayloadAction<{ productId: string, color: string, size: string }>) => {
            const checkCartItem = state.cart.items.findIndex((each, el) => {
                return each.product.product.toLowerCase() === action.payload.productId.toLowerCase() && each.color.toLowerCase() === action.payload.color.toLowerCase() && each.size.toLowerCase() === action.payload.size.toLowerCase()
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

        clearEach: (state, action: PayloadAction<{ productId: string, color: string, size: string }>) => {
            state.cart.items = state.cart.items.filter(item => {
                return item.product.product.toLowerCase() !== action.payload.productId.toLowerCase() ||
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

export const { login, logout, addCartNoToken, setEmptyCart, decCartNoToken, inCartNoTken, clearEach, changeInforUserImage } = authSlice.actions

export default authSlice.reducer