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
    const dispatch = useDispatch()
    const navigate: NavigateFunction = useNavigate()
    const [itemsCart, setItemsCart] = useState<ITEMCART[]>([])
    const clearEachItem = async (objClear: ITEM) => {
        if (handleLoginAndCart.token) {
            try {
                const res = await axios({
                    method: "POST",
                    url: "/myway/api/carts/clearEachCart",
                    data: {
                        productId: objClear.product._id,
                        color: objClear.color,
                        size: objClear.size
                    }
                })
                if (res.data.status === 'success') {
                    axios.get('/myway/api/carts/cartMe')
                        .then(response => {
                            const all = response.data;
                            setItemsCart(all.cartMe);
                        })
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
                const res = await axios.post('/myway/api/carts/incCart', {
                    productId: objClear.product._id,
                    color: objClear.color,
                    size: objClear.size
                })

                if (res.data.status === "success") {

                    await axios.get('/myway/api/carts/cartMe')
                        .then(response => {
                            const all = response.data;
                            setItemsCart(all.cartMe);
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
                // setItemsCart(prev => {
                //     const newState = [...prev]
                //     const checkCartItem = newState[0].items.findIndex((each, index) => {
                //         return each.product._id.toLowerCase() === objClear.product._id.toLowerCase() && each.color.toLowerCase() === objClear.color.toLowerCase() && each.size.toLowerCase() === objClear.size.toLowerCase()
                //     })
                //     if (checkCartItem > -1) {
                //         newState[0].items[checkCartItem].quantity = newState[0].items[checkCartItem].quantity - 1
                //     }
                //     let subTotal = 0;
                //     newState[0].items.forEach((item, idx: number) => {
                //         subTotal += item.product.newPrice * item.quantity
                //     })
                //     newState[0].subTotal = subTotal
                //     return newState
                // })
                const res = await axios.post('/myway/api/carts/decCart', {
                    productId: objClear.product._id,
                    color: objClear.color,
                    size: objClear.size
                })
                if (res.data.status === "success") {
                    await axios.get('/myway/api/carts/cartMe')
                        .then(response => {
                            const all = response.data;
                            setItemsCart(all.cartMe);
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
    useEffect(() => {
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
            dispatch(setEmptyCart())
        }
        if (handleLoginAndCart.token && handleLoginAndCart.cart && handleLoginAndCart.cart.items.length > 0) {
            addManyCartApi({ items: handleLoginAndCart.cart.items })
        }
    }, [])
    useEffect(() => {
        const getCartApi = async () => {

            await axios.get('/myway/api/carts/cartMe')
                .then(response => {
                    const all = response.data;
                    console.log(all)
                    setItemsCart(all.cartMe);
                })
        }
        if (handleLoginAndCart.token) {
            getCartApi()
        }
    }, [handleLoginAndCart.token, handleLoginAndCart.cart])
    return (
        <div>
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
                                            <img src={`/products/${eachProd.image}`} />
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
                                                        handleDecItem({
                                                            product: eachProd.product,
                                                            quantity: 0,
                                                            color: eachProd.color,
                                                            colorName: eachProd.colorName,
                                                            size: eachProd.size,
                                                            image: eachProd.image
                                                        })
                                                    }}>-</button>
                                                    <input value={eachProd.quantity} disabled />
                                                    <button onClick={e => {
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
                                                <p className={`${styles.quantityBox_close}`}>Xóa</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }) : handleLoginAndCart.cart.items.map((item, idx) => {
                                return (
                                    <div className={`row`} key={idx} style={{ marginTop: '15px' }}>   {/*map o day */}
                                        <div className={`col-lg-3 col-md-2 col-sm-2 col-2 ${styles.setPadding}`}>
                                            <div className={`${styles.imagePaymentProduct}`}>
                                                <img src={`/products/${item.image}`} />
                                            </div>
                                        </div>
                                        <div className={`col-lg-9 col-md-10 col-sm-10 col-10`}>
                                            <div className={`${styles.inforPaymentProduct}`}>
                                                <div className={`${styles.inforPaymentProduct1}`}>
                                                    <Link to={`/detail/${item.product.slug}`}>{item.product.name} / {item.color} / {item.size}</Link>
                                                    <p className={`${styles.inforPaymentProduct_delete}`} onClick={e => clearEachItem({
                                                        product: item.product,
                                                        quantity: 0,
                                                        color: item.color,
                                                        colorName: item.colorName,
                                                        size: item.size,
                                                        image: item.image
                                                    })}> Xóa</p>
                                                    <p className={`${styles.inforPaymentProduct_price}`}>Price: <span>{item.product.newPrice.toLocaleString('vi-VN')}₫</span></p>
                                                </div>
                                                <div className={`${styles.inforPaymentProduct2}`}>
                                                    <p>{item.product.newPrice.toLocaleString('vi-VN')}₫</p>
                                                </div>
                                                <div className={`${styles.quantityBox}`}>
                                                    <div className={`${styles.inforPaymentProduct3}`}>
                                                        <button onClick={e => handleDecItem({
                                                            product: item.product,
                                                            quantity: 0,
                                                            color: item.color,
                                                            colorName: item.colorName,
                                                            size: item.size,
                                                            image: item.image
                                                        })}>-</button>
                                                        <input value={item.quantity} disabled />
                                                        <button onClick={e => handleIncItem({
                                                            product: item.product,
                                                            quantity: 0,
                                                            color: item.color,
                                                            colorName: item.colorName,
                                                            size: item.size,
                                                            image: item.image
                                                        })}>+</button>
                                                    </div>
                                                    <p className={`${styles.quantityBox_close}`}>Xóa</p>
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