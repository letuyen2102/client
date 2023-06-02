/*eslint-disable*/
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Checkout.module.css'
import { PRODUCT } from "../Detail/Detail";
import { ITEM, ITEMCART } from "../Cart/Cart";
import Title from "../Tiltle/Title";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface RECEIVER {
    name: string,
    email: string,
    phone: string,
    address: string,
    note: string
}

const Checkout = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [receiver, setReceiver] = useState<RECEIVER>({
        name: handleLoginAndCart.user.name,
        email: handleLoginAndCart.user.email,
        phone: handleLoginAndCart.user.phone,
        address: handleLoginAndCart.user.address,
        note: ""
    })
    const navigate = useNavigate()
    const [payment, setPayment] = useState('cod')
    const [itemsCart, setItemsCart] = useState<ITEMCART[]>([])
    const handlePaymentUrl = async (price: number) => {
        if (payment === "vnpay") {
            const res = await axios({
                method: "POST",
                url: "/myway/api/bookings/create_payment_url",
                data: {
                    amount: price,
                    orderDescription: "Test order",
                    orderType: "billpayment",
                    language: "vn",
                    products: itemsCart[0].items,
                    ...receiver
                }
            })
            console.log(res.data.data)
            if (res.data.status === "00") {
                console.log('ok')
                window.location.href = res.data.data
            }
        }
        else if (payment === "cod") {
            const res = await axios.post('/myway/api/bookings/createBooking', {
                products: itemsCart[0].items,
                status: "processing",
                ...receiver
            })

            if (res.data.status === "success") {
                navigate('/cart')
            }
        }
    }
    useEffect(() => {
        const getCartApi = async () => {
            await fetch('/myway/api/carts/cartMe')
                .then(res => res.json())
                .then(all => setItemsCart(all.cartMe))
        }
        getCartApi()
    }, [])
    return (
        <div>
            <Title>
                <ul>
                    <li>
                        <Link to='/' style={{ whiteSpace: 'pre' }}>Trang chủ  {'>'} </Link>
                    </li>
                    <li>
                        <Link to=''>Thanh toán</Link>
                    </li>
                </ul>
            </Title>
            <div className={`container ${styles.processContainer}`}>
                <div>
                    <div className={styles.processS}>
                        <div>
                            1
                        </div>
                        Giỏ hàng
                    </div>
                    <div className={styles.setSpace}>

                    </div>
                    <div className={styles.processS}>
                        <div>
                            2
                        </div>
                        Đặt hàng
                    </div>
                    <div className={styles.setSpace}>

                    </div>
                    <div className={styles.processS}>
                        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.38)' }}>
                            3
                        </div>
                        Xác nhận
                    </div>
                </div>
            </div>
            <div className={styles.containerCheckout}>
                <div className={`container ${styles.checkout}`}>
                    <div className={`container ${styles.checkoutTitle}`}>
                        <strong>ĐẶT HÀNG</strong>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className={styles.checkoutInforUser}>
                                <div className={styles.checkoutInforUserTitle}>
                                    <p>Thông tin nhận hàng</p>
                                </div>
                                <div className={styles.checkoutFormGroup}>
                                    <label htmlFor="name">Họ tên</label>
                                    <input id="name" type='text' required placeholder="Nhập họ và tên của bạn" value={receiver.name} onChange={event => setReceiver({ ...receiver, name: event.target.value })} />
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className={styles.checkoutFormGroup}>
                                            <label htmlFor="phone">Số điện thoại</label>
                                            <input id="phone" type='text' required placeholder="Nhập số điện thoại của bạn" value={receiver.phone} onChange={event => setReceiver({ ...receiver, phone: event.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className={styles.checkoutFormGroup}>
                                            <label htmlFor="email">Email</label>
                                            <input id="email" type='email' placeholder="Nhập email của bạn" value={receiver.email} onChange={event => setReceiver({ ...receiver, email: event.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.checkoutFormGroup}>
                                    <label htmlFor="address">Địa chỉ nhận hàng</label>
                                    <input id="address" type='text' required placeholder="Nhập địa chỉ của bạn" value={receiver.address} onChange={event => setReceiver({ ...receiver, address: event.target.value })} />
                                </div>
                                <div className={styles.checkoutFormGroup}>
                                    <label htmlFor="note">Ghi chú</label>
                                    <input id="note" type='text' placeholder="Nhập ghi chú của bạn" value={receiver.note} onChange={event => setReceiver({ ...receiver, note: event.target.value })} />
                                </div>

                            </div>
                            <div className={styles.checkoutPayment}>
                                <div className={styles.checkoutPaymentTitle}>
                                    <p>Hình thức thanh toán</p>
                                </div>
                                <div className={payment === "cod" ? `${styles.checkoutGroupPayment} ${styles.checkoutGroupPayment_border_active}` : `${styles.checkoutGroupPayment}`} onClick={e => setPayment('cod')}>
                                    <div className={payment === "cod" ? `${styles.checkoutGroupPaymentDot} ${styles.checkoutGroupPayment_active}` : `${styles.checkoutGroupPaymentDot}`}>
                                        <span className={payment === "cod" ? `${styles.btn_payment_active}` : ``}></span>
                                    </div>
                                    <div className={styles.checkoutGroupPaymentImg}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAYCAYAAAB5j+RNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANTSURBVHgB5ZbPTxNBFMffm/3RLS2wRYm/ElPUm0brP6DgwegJ/HEXT+rJcPQknEg86Ulv1j9AqYkRIkYEExMvgh6NkcUfJBigC7Tpz5nnTKGBwm6bFkhI/Cab3Xkz8+aTN+/NLMAeU3Ksxy5/M9hDkmBR09AmMx+u31dtrDVhujdmW1mwYZdl3Yq6CgwIo6pNJG7qtSaFixCDAI7BLkpGyIl0JTpSE1cHEPGpbE81cZGoCeepgAVgWtCQBAdIr3h2hc+9iC9PXHObOX+PXQm3fjgJph2Oymz1TlfKZQE4B2wK+bqgFRfE31nPvpZzzxPl7/rgqoBRch7E4txqZJQME1hzBHDfgS1jsdkuVaIfYFl1Vasv2HISxPzsOphSIV+CVdBeUoDY2gY7Bue3lWJhzndKRTS3+NOg6nKwDWFLCJgtc6uY9x8kwSiTgkbUULWizkCLHgGtPVJq858/QMz5R69WhGCn4BSYcfK4rMbgus00q88xqvf7qe5t1Y4frQBTIvJ3U6pWvTG4LZFLDvXbhmlEC/mCE7nS71aAtYdBa2upGF/8NQcYbAXWfghEcmE9/+RWKjBm7/deWZ6HtLQANeEyw4NRrrMeBthNQJ3KZpo6pN8+iGdevX5JySUwTp8C/cSxismUywP/vZpraLeDJp9y8mMg6J9rEozPOrJYBFQTLr8Z7NWQPfUbQIguEm25+CmVhtynz0DZKpXq51NFbAOYulv3P5vs2DyuZkH4go2+A5FOw26qsYtfVmfg4gXPLsoVXPHxa4KyObvAs4+KxZRjmW29yLTzJPh4Nr8YNzQ7ZuhGtxoviM8om5evhg5hNA3AUMjjCbs0+d2GHJ8hZjwzjeZYuOnwDU0LnCfUH8n3mSbrYK9pWDah1iFQG1e2cPDQ3R2D80F2i1PfBmAp5bQ+GemPPB5OtD4efijPmR5eLPapNifqk/9rN0oLM5iOPBmJKxsB9Hh5bGxbN2MROMh5l/gz78r6vJu8fSkKVtaFrBWTCzu6riugKYOxbkHkbJzrZStrm5FDV4AYCKYzZ4OX7zmRhwlXXvF9DHGI5YKT8h1TkZGLR5buXJ4WKopEN0GeAETYuWbrLNm8vK+MDnaytVDXI+n8SyiVieOmg/q/0T9xdV00p4jqZgAAAABJRU5ErkJggg==" />
                                    </div>
                                    <div className={styles.checkoutGroupPaymentName}>
                                        <p className={payment === "cod" ? styles.btn_para_active : ''}>COD</p>
                                        <p className={payment === "cod" ? styles.btn_para_active : ''}>Thanh toán tiền mặt khi nhận hàng</p>
                                    </div>
                                </div>
                                <div className={payment === "momo" ? `${styles.checkoutGroupPayment} ${styles.checkoutGroupPayment_border_active}` : `${styles.checkoutGroupPayment}`} onClick={e => setPayment('momo')}>
                                    <div className={payment === "momo" ? `${styles.checkoutGroupPaymentDot} ${styles.checkoutGroupPayment_active}` : `${styles.checkoutGroupPaymentDot}`}>
                                        <span className={payment === "momo" ? `${styles.btn_payment_active}` : ``}></span>
                                    </div>
                                    <div className={styles.checkoutGroupPaymentImg}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL2SURBVHgBtVY9TFNRFP7uozWoJBQksoAWB2EhFkdNCAQcNFHrZMSlRDeGlsFEFwVnE8vipFJijDEOtJrIAhEGiYtpDVMZsAQWFEJJAE2BPs859D4erzVA035J37333J/v/N5eBRuGEfBUwhU0YQayUB4FeHBEKJgp+qZMZEfu4nVkT57DG9zvoMFoMYf/nxThHrzsz/XFEq8brngpSZxkQvQW94ZJFECZkMF2jcEdE8rvnHR7TuB0R7O0/PP4GnHSW1fwIJ7TawuhAobfxR2ny1qfXEfrwA1rvJXetA5Jhsfxvf+99GuIoH20jxQ4JeON1ArmIl8xM/hpH5GC4a14R/ExYYS0kDe1R/uk/2syKVZUVLqRTizAoLaeNF+ampX5zrGQrGdFVr7NCbGeZ9I9IvOH4TSz1nfGIhnvfGbJp/wvsBhLSL+KDm/0+4RklRT4UBOUtcmhCZlvCXU5TjWq84jcnuM4DLQrmUhjI/Vb2mPV+bFyoUgsTc5SLIFzgUvIkOs255fRHLwicwuxeOmI2LUcdE6cllD3PnkyPHEw0bpkzrQVTO4zMmubcgjVgqxhzAx8JMuSaPC3WSSL0XghvaA467Jw/URZoSIFXcdpevH5bcquOrJsWSzgtOVYsLu01pwQLcEuitNlGS/l3Ml78qicFnHKdn95YBVhIcSaHslhV+OPRSk72OWc6vvJVCQvvblAdX2MtT215J/bBndjRKjvOC/ZxiT64FjTQ9nDe5vz6ogqySmoylnC1W6vka3Vv1ifX4Hdcga7ixVgwuTQuMhqLzQeTHRYrCYWpW2gG4IvVY5Xw02fyNZt149G0XXECcEWs/uuUaw02DLnpZqFOW/cQSRlF2bSf2QxZ5jeqGuKZfa5CYrN3Mi0XLgs1/djwazjD/3xUdYpL8oEur1vGbumqRGUDWaqB6+iQrSN7TDk9VIWokH+ClEvImkDO50kjKJEoCdbegeqVz+5lHMBP7uooaeXOosioJBdI5pEBtkoG6Dl/wC+sVAI2SegjAAAAABJRU5ErkJggg==" />
                                    </div>
                                    <div className={styles.checkoutGroupPaymentName}>
                                        <p className={payment === "momo" ? styles.btn_para_active : ''}>Thanh toán bằng ví MoMo</p>
                                    </div>
                                </div>
                                <div className={payment === "vnpay" ? `${styles.checkoutGroupPayment} ${styles.checkoutGroupPayment_border_active}` : `${styles.checkoutGroupPayment}`} onClick={e => setPayment('vnpay')}>
                                    <div className={payment === "vnpay" ? `${styles.checkoutGroupPaymentDot} ${styles.checkoutGroupPayment_active}` : `${styles.checkoutGroupPaymentDot}`}>
                                        <span className={payment === "vnpay" ? `${styles.btn_payment_active}` : ``}></span>
                                    </div>
                                    <div className={styles.checkoutGroupPaymentImg}>
                                        <img src="data:image/png;base64,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" />
                                    </div>
                                    <div className={styles.checkoutGroupPaymentName}>
                                        <p className={payment === "vnpay" ? styles.btn_para_active : ''}>Mobile banking của các ngân hàng qua VNPay Thẻ ATM / Tài khoản ngân hàng VNPay QR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={styles.billPayment}>
                                <div className={styles.billPaymentTitle}>
                                    <p>Thông tin đơn hàng</p>
                                    <button>Sửa</button>
                                </div>
                                <ul>
                                    {
                                        itemsCart[0] && itemsCart[0].items.map((each, ind) => {
                                            return <li key={ind}>
                                                <div className={styles.paymentProductImg}>
                                                    <div>
                                                        <img src={`${each.image}`} />
                                                    </div>
                                                </div>

                                                <div className={styles.paymentProductInfor}>
                                                    <p style={{ textTransform: 'uppercase' }}>{each.product.name}</p>
                                                    <div>
                                                        <p>x{each.quantity}</p>
                                                        <p>Màu: {each.colorName}</p>
                                                        <p>Kích cỡ: {each.size}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        })
                                    }

                                </ul>
                                <div className={styles.subTotal}>
                                    <div>
                                        <p>Tổng tiền hàng</p>
                                        <p>{itemsCart[0] && itemsCart[0].subTotal.toLocaleString('vi-VN')}đ</p>
                                    </div>
                                    <div>
                                        <p>Phí vận chuyển</p>
                                        <p>Freeship</p>
                                    </div>
                                </div>
                                <div className={styles.subTotal}>
                                    <div>
                                        <p>Giảm giá vận chuyển</p>
                                        <p>0d</p>
                                    </div>
                                    <div>
                                        <p>Giảm giá coupon</p>
                                        <p>0d</p>
                                    </div>
                                    <div>
                                        <strong>Tổng giảm giá đơn hàng</strong>
                                        <strong>0d</strong>
                                    </div>
                                    <div>
                                        <span>(Tối đa 500.000đ)</span>
                                    </div>
                                </div>

                                <div className={styles.acceptPrice} style={{ padding: '25px 0px', borderTop: '1px dashed rgba(0, 0, 0, 0.12)', borderBottom: '1px dashed rgba(0, 0, 0, 0.12)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <p className={styles.aa}>Tạm tính</p>
                                        <p className={styles.bb}>{itemsCart[0] && itemsCart[0].subTotal.toLocaleString('vi-VN')}đ</p>
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <span className={styles.cc}>(Đã bao gồm VAT nếu có)</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.billBtn}>
                                <button onClick={e => handlePaymentUrl(itemsCart[0].subTotal)}>Hoàn tất</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container ${styles.processContainer}`}>
                <div>
                    <div className={styles.processS}>
                        <div>
                            1
                        </div>
                        Giỏ hàng
                    </div>
                    <div className={styles.setSpace}>

                    </div>
                    <div className={styles.processS}>
                        <div>
                            2
                        </div>
                        Đặt hàng
                    </div>
                    <div className={styles.setSpace}>

                    </div>
                    <div className={styles.processS}>
                        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.38)' }}>
                            3
                        </div>
                        Xác nhận
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Checkout