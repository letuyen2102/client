/*eslint-disable*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { clearEach, decCartNoToken, getItemsCart, inCartNoTken, setEmptyCart } from '../../slices/authSlice'
import { RootState } from '../../store/store'
import { PRODUCT } from '../Detail/Detail'
import Title from '../Tiltle/Title'
import styles from './Cart.module.css'
import { hideLoader, showLoader } from '../../slices/loaderSlice'
import Loader from '../loader/Loader'
export interface PAYMENT {
    amount: number,
    orderInfor: string
}

export interface ITEM {
    product: PRODUCT,
    quantity: number,
    color: string,
    colorName: string,
    size: string,
    image: string
}
export interface ITEMCART {
    items: ITEM[],
    subTotal: number,

}
interface ITEMCLEAR {
    productId: string,
    color: string,
    size: string
}

interface MANYITEM {
    items: ITEM[]
}
const Cart: React.FC = (props) => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const handleLoader = useSelector((state: RootState) => state.loader)

    const dispatch = useDispatch()
    const navigate: NavigateFunction = useNavigate()
    const [itemsCart, setItemsCart] = useState<ITEMCART[]>([])
    console.log(itemsCart)
    const clearEachItem = async (objClear: ITEM) => {
        if (handleLoginAndCart.token) {
            try {
                dispatch(hideLoader())
                const res = await axios({
                    method: "POST",
                    url: "/myway/api/carts/clearEachCart",
                    data: {
                        productId: objClear.product,
                        color: objClear.color,
                        colorName: objClear.colorName,
                        size: objClear.size,
                    }
                })
                dispatch(showLoader())
                if (res.data.status === 'success') {


                    setItemsCart(prev => {
                        const newState = [...prev]

                        newState[0].items = newState[0].items.filter((el) => {
                            return el.product._id !== objClear.product._id || el.color !== objClear.color || el.size !== objClear.size
                        })
                        let subTotal = 0
                        newState[0].items.forEach((item, idx: number) => {
                            subTotal += item.product.newPrice * item.quantity
                        })

                        newState[0].subTotal = subTotal
                        return newState
                    })


                    // axios.get('/myway/api/carts/cartMe')
                    //     .then(response => {
                    //         const all = response.data;
                    //         setItemsCart(all.cartMe);
                    //     })
                }
            }
            catch (err: any) {
                alert(err.response.data)
            }
        }
        else {
            dispatch(clearEach(objClear))
        }
    }
    const handleIncItem = async (objClear: ITEM) => {
        if (handleLoginAndCart.token) {
            try {
                dispatch(hideLoader())
                const res = await axios.post('/myway/api/carts/incCart', {
                    productId: objClear.product,
                    color: objClear.color,
                    colorName: objClear.colorName,
                    size: objClear.size,
                })
                dispatch(showLoader())
                if (res.data.status === "success") {

                    // await axios.get('/myway/api/carts/cartMe')
                    //     .then(response => {
                    //         const all = response.data;
                    //         setItemsCart(all.cartMe);
                    //     })
                    setItemsCart(prev => {
                        const newState = [...prev]

                        newState[0] = {
                            ...newState[0],
                            items: newState[0].items.map((el) => {
                                if (el.product._id === objClear.product._id && el.color === objClear.color && el.size === objClear.size) {
                                    return {
                                        ...el,
                                        quantity: el.quantity + 1,
                                    };
                                }
                                else {
                                    return el;
                                }
                            })
                        }
                        let subTotal = 0
                        newState[0].items.forEach((item, idx: number) => {
                            subTotal += item.product.newPrice * item.quantity
                        })

                        newState[0].subTotal = subTotal
                        return newState
                    })
                }
            }
            catch (err: any) {
                alert(err.response.data)
            }
        }
        else {
            dispatch(inCartNoTken(objClear))
        }
    }
    const handleDecItem = async (objClear: ITEM) => {
        if (handleLoginAndCart.token) {
            try {
                dispatch(hideLoader())
                const res = await axios.post('/myway/api/carts/decCart', {
                    productId: objClear.product,
                    color: objClear.color,
                    colorName: objClear.colorName,
                    size: objClear.size,
                })
                dispatch(showLoader())
                if (res.data.status === "success") {
                    // await axios.get('/myway/api/carts/cartMe')
                    //     .then(response => {
                    //         const all = response.data;
                    //         setItemsCart(all.cartMe);
                    //     })
                    setItemsCart(prev => {
                        const newState = [...prev]

                        newState[0] = {
                            ...newState[0],
                            items: newState[0].items.map((el) => {
                                if (el.product._id === objClear.product._id && el.color === objClear.color && el.size === objClear.size) {
                                    return {
                                        ...el,
                                        quantity: el.quantity - 1,
                                    };
                                }
                                else {
                                    return el;
                                }
                            })
                        }
                        let subTotal = 0
                        newState[0].items.forEach((item, idx: number) => {
                            subTotal += item.product.newPrice * item.quantity
                        })

                        newState[0].subTotal = subTotal
                        return newState
                    })
                }
            }
            catch (err: any) {
                alert(err.response.data)
            }
        }
        else {
            dispatch(decCartNoToken(objClear))
        }
    }
    const addManyCartApi = async (objManyItem: MANYITEM) => {
        console.log("hihihihi")
        const items = objManyItem.items.map((el, id) => {
            return {
                productId: el.product._id,
                quantity: el.quantity,
                color: el.color,
                colorName: el.colorName,
                size: el.size,
                image: el.image
            }
        })
        await axios.post('/myway/api/carts/createManyCart', {
            items: [...items]
        })
    }
    if (handleLoginAndCart.token && handleLoginAndCart.cart && handleLoginAndCart.cart.items.length > 0) {
        addManyCartApi({ items: handleLoginAndCart.cart.items })

        dispatch(setEmptyCart())
    }
    useEffect(() => {
        const getCartApi = async () => {
            dispatch(hideLoader())
            await axios.get('/myway/api/carts/cartMe')
                .then(response => {
                    const all = response.data;
                    console.log(all)
                    setItemsCart(all.cartMe);
                    dispatch(showLoader())
                })
                .catch(err => dispatch(showLoader()))

        }
        if (handleLoginAndCart.token) {
            getCartApi()
        }
    }, [handleLoginAndCart.cart, handleLoginAndCart.token])
    return (
        <div>
            {handleLoader.loader && handleLoginAndCart.token && <Loader />}
            <Title>
                <ul>
                    <li>
                        <Link to='/' style={{ whiteSpace: 'pre' }}>Trang chủ  {'>'} </Link>
                    </li>
                    <li>
                        <Link to=''>Giỏ Hàng</Link>
                    </li>
                </ul>
            </Title>
            <div className={`container-lg ${styles.Cart}`}>
                <div className={`row`}>
                    <div className={`col-md-12`}>
                        <h1 className={`${styles.cartTitle}`}>
                            Giỏ hàng
                            <span>({itemsCart[0] && itemsCart[0].items.length ? itemsCart[0].items.length : handleLoginAndCart.cart.items.length} sản phẩm)</span>
                        </h1>
                    </div>
                </div>

                {((itemsCart[0] && itemsCart[0].items.length > 0) || (handleLoginAndCart.cart && handleLoginAndCart.cart.items.length > 0)) ? <div className={`row`}>
                    <div className={`col-lg-9 col-md-12`}>

                        {
                            handleLoginAndCart.token ? itemsCart[0] && itemsCart[0].items.map((eachProd, idxProd) => {
                                return <div className={`row`} key={idxProd} style={{ marginTop: '15px' }}>   {/*map o day */}
                                    <div className={`col-lg-3 col-md-2 col-sm-2 col-2 ${styles.setPadding}`}>
                                        <div className={`${styles.imagePaymentProduct}`}>
                                            <img src={`${eachProd.image}`} />
                                        </div>
                                    </div>
                                    <div className={`col-lg-9 col-md-10 col-sm-10 col-10`}>
                                        <div className={`${styles.inforPaymentProduct}`}>
                                            <div className={`${styles.inforPaymentProduct1}`}>
                                                <Link to={`/detail/${eachProd.product.slug}`}>{eachProd.product.name} / {eachProd.colorName} / {eachProd.size}</Link>
                                                <p className={`${styles.inforPaymentProduct_delete}`} onClick={e => {

                                                    clearEachItem({
                                                        product: eachProd.product,
                                                        quantity: 0,
                                                        color: eachProd.color,
                                                        colorName: eachProd.colorName,
                                                        size: eachProd.size,
                                                        image: eachProd.image
                                                    })
                                                }}>Xóa</p>
                                                <p className={`${styles.inforPaymentProduct_price}`}>Price: <span>{eachProd.product.newPrice.toLocaleString('vi-VN')}₫</span></p>
                                            </div>
                                            <div className={`${styles.inforPaymentProduct2}`}>
                                                <p>{eachProd.product.newPrice.toLocaleString('vi-VN')}₫</p>
                                            </div>
                                            <div className={`${styles.quantityBox}`}>
                                                <div className={`${styles.inforPaymentProduct3}`}>
                                                    <button onClick={e => {
                                                        let checkExistsQty = 0
                                                        eachProd.product.quantity.forEach(el => {
                                                            if (el.color === eachProd.color) {
                                                                el.size.forEach(el2 => {
                                                                    if (el2.size === eachProd.size) {
                                                                        checkExistsQty = el2.quantity
                                                                    }
                                                                })
                                                            }
                                                        })

                                                        console.log(checkExistsQty)
                                                        if (eachProd.quantity <= 1) {
                                                            if (window.confirm("Bạn có muốn xóa sản phẩm này không")) {
                                                                clearEachItem({
                                                                    product: eachProd.product,
                                                                    quantity: 0,
                                                                    color: eachProd.color,
                                                                    colorName: eachProd.colorName,
                                                                    size: eachProd.size,
                                                                    image: eachProd.image
                                                                })
                                                            }
                                                        }
                                                        else {
                                                            handleDecItem({
                                                                product: eachProd.product,
                                                                quantity: 0,
                                                                color: eachProd.color,
                                                                colorName: eachProd.colorName,
                                                                size: eachProd.size,
                                                                image: eachProd.image
                                                            })
                                                        }
                                                    }}>-</button>
                                                    <input value={eachProd.quantity} disabled />
                                                    <button onClick={e => {
                                                        let checkExistsQty = 0

                                                        eachProd.product.quantity.forEach(el => {
                                                            if (el.color === eachProd.color) {
                                                                el.size.forEach(el2 => {
                                                                    if (el2.size === eachProd.size) {
                                                                        checkExistsQty = el2.quantity
                                                                    }
                                                                })
                                                            }
                                                        })

                                                        console.log(checkExistsQty)
                                                        if (eachProd.quantity >= checkExistsQty) {
                                                            return
                                                        }
                                                        handleIncItem({
                                                            product: eachProd.product,
                                                            quantity: 0,
                                                            color: eachProd.color,
                                                            colorName: eachProd.colorName,
                                                            size: eachProd.size,
                                                            image: eachProd.image
                                                        })
                                                    }}>+</button>
                                                </div>
                                                <p className={`${styles.quantityBox_close}`} onClick={e => {

                                                    clearEachItem({
                                                        product: eachProd.product,
                                                        quantity: 0,
                                                        color: eachProd.color,
                                                        colorName: eachProd.colorName,
                                                        size: eachProd.size,
                                                        image: eachProd.image
                                                    })
                                                }}>Xóa</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }) : handleLoginAndCart.cart.items.map((eachProd, idx) => {
                                return (
                                    <div className={`row`} key={idx} style={{ marginTop: '15px' }}>   {/*map o day */}
                                        <div className={`col-lg-3 col-md-2 col-sm-2 col-2 ${styles.setPadding}`}>
                                            <div className={`${styles.imagePaymentProduct}`}>
                                                <img src={`${eachProd.image}`} />
                                            </div>
                                        </div>
                                        <div className={`col-lg-9 col-md-10 col-sm-10 col-10`}>
                                            <div className={`${styles.inforPaymentProduct}`}>
                                                <div className={`${styles.inforPaymentProduct1}`}>
                                                    <Link to={`/detail/${eachProd.product.slug}`}>{eachProd.product.name} / {eachProd.color} / {eachProd.size}</Link>
                                                    <p className={`${styles.inforPaymentProduct_delete}`} onClick={e => clearEachItem({
                                                        product: eachProd.product,
                                                        quantity: 0,
                                                        color: eachProd.color,
                                                        colorName: eachProd.colorName,
                                                        size: eachProd.size,
                                                        image: eachProd.image
                                                    })}> Xóa</p>
                                                    <p className={`${styles.inforPaymentProduct_price}`}>Price: <span>{eachProd.product.newPrice.toLocaleString('vi-VN')}₫</span></p>
                                                </div>
                                                <div className={`${styles.inforPaymentProduct2}`}>
                                                    <p>{eachProd.product.newPrice.toLocaleString('vi-VN')}₫</p>
                                                </div>
                                                <div className={`${styles.quantityBox}`}>
                                                    <div className={`${styles.inforPaymentProduct3}`}>
                                                        <button onClick={e => {
                                                            let checkExistsQty = 0
                                                            eachProd.product.quantity.forEach(el => {
                                                                if (el.color === eachProd.color) {
                                                                    el.size.forEach(el2 => {
                                                                        if (el2.size === eachProd.size) {
                                                                            checkExistsQty = el2.quantity
                                                                        }
                                                                    })
                                                                }
                                                            })

                                                            console.log(checkExistsQty)
                                                            if (eachProd.quantity <= 1) {
                                                                if (window.confirm("Bạn có muốn xóa sản phẩm này không")) {
                                                                    clearEachItem({
                                                                        product: eachProd.product,
                                                                        quantity: 0,
                                                                        color: eachProd.color,
                                                                        colorName: eachProd.colorName,
                                                                        size: eachProd.size,
                                                                        image: eachProd.image
                                                                    })
                                                                }
                                                            }
                                                            else {
                                                                handleDecItem({
                                                                    product: eachProd.product,
                                                                    quantity: 0,
                                                                    color: eachProd.color,
                                                                    colorName: eachProd.colorName,
                                                                    size: eachProd.size,
                                                                    image: eachProd.image
                                                                })
                                                            }
                                                        }
                                                        }>-</button>
                                                        <input value={eachProd.quantity} disabled />
                                                        <button onClick={e => {

                                                            let checkExistsQty = 0

                                                            eachProd.product.quantity.forEach(el => {
                                                                if (el.color === eachProd.color) {
                                                                    el.size.forEach(el2 => {
                                                                        if (el2.size === eachProd.size) {
                                                                            checkExistsQty = el2.quantity
                                                                        }
                                                                    })
                                                                }
                                                            })

                                                            console.log(checkExistsQty)
                                                            if (eachProd.quantity >= checkExistsQty) {
                                                                return
                                                            }
                                                            handleIncItem({
                                                                product: eachProd.product,
                                                                quantity: 0,
                                                                color: eachProd.color,
                                                                colorName: eachProd.colorName,
                                                                size: eachProd.size,
                                                                image: eachProd.image
                                                            })
                                                        }
                                                        }>+</button>
                                                    </div>
                                                    <p className={`${styles.quantityBox_close}`} onClick={e => clearEachItem({
                                                        product: eachProd.product,
                                                        quantity: 0,
                                                        color: eachProd.color,
                                                        colorName: eachProd.colorName,
                                                        size: eachProd.size,
                                                        image: eachProd.image
                                                    })}>Xóa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                    {handleLoginAndCart.token ? <div className={`col-lg-3 col-md-12`}>
                        <div className={`${styles.tt}`}>
                            <p>
                                <span>Tổng tiền:</span>
                                <strong>{itemsCart[0]?.subTotal.toLocaleString('vi-VN')}₫</strong>
                            </p>
                        </div>
                        <div className={`${styles.tttt}`}>
                            <p>
                                Tổng tiền thanh toán:
                            </p>
                            <strong>
                                {itemsCart[0]?.subTotal.toLocaleString('vi-VN')}₫
                            </strong>
                        </div>
                        <button className={`${styles.payment}`} onClick={e => navigate('/checkout')}>
                            THANH TOÁN
                        </button>
                        <button className={`${styles.continueBuying}`} onClick={e => navigate('/collection/all')}>
                            TIẾP TỤC MUA HÀNG
                        </button>

                    </div> : <div className={`col-lg-3 col-md-12`}>
                        <div className={`${styles.tt}`}>
                            <p>
                                <span>Tổng tiền:</span>
                                <strong>{handleLoginAndCart.cart.subTotal.toLocaleString('vi-VN')}₫</strong>
                            </p>
                        </div>
                        <div className={`${styles.tttt}`}>
                            <p>
                                Tổng tiền thanh toán:
                            </p>
                            <strong>
                                {handleLoginAndCart.cart.subTotal.toLocaleString('vi-VN')}₫
                            </strong>
                        </div>
                        <button className={`${styles.payment}`} onClick={e => navigate('/account/login')}>
                            THANH TOÁN
                        </button>
                        <button className={`${styles.continueBuying}`} onClick={e => navigate('/collection/all')}>
                            TIẾP TỤC MUA HÀNG
                        </button>

                    </div>}
                </div> : <div className={styles.emptyCart}>
                    <div>
                        <img src='https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/empty-cart.png?1661616129384' />
                    </div>
                    <Link to='/collection/all'>Tiếp tục mua sắm</Link>
                </div>}
            </div>
        </div >
    )
}
export default Cart