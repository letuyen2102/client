/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from './History.module.css'
import { PRODUCT } from "../Detail/Detail"

export interface EACHBOOKING {
    product: PRODUCT,
    quantity: number,
    color: string,
    size: string,
    image: string,
    total: number
}

export interface BOOKING {
    _id: string,
    products: EACHBOOKING[],
    method: string,

    paymentCardName: string

    orderId: string,
    status: string,
    createAt: string,
    subTotal: number
}

export const convertToVietnamTime = (utcTime: string): string => {
    const inputTime = new Date(utcTime);
    const vietnamTime = new Date(inputTime.getTime() + 7 * 60 * 60 * 1000);
    const formattedTime = vietnamTime.toLocaleDateString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return formattedTime;
}
const History = () => {
    const [tab , setTab] = useState('online')
    const [status , setStatus] = useState('')
    const [bookings, setBookings] = useState<BOOKING[] | null>()
    useEffect(() => {
        const getBookingMe = async () => {
            await fetch(`/myway/api/bookings/getBookingsMe?method=${tab}&status=${status}`)
                .then(res => res.json())
                .then(all => setBookings(all.bookings))
        }

        getBookingMe()
    }, [tab , status])
    return (
        <div className={styles.history}>
            <div className={styles.history_tab}>
                <strong className={tab === 'online' ? styles.history_btn_active_tab : ''} onClick = {e => {setTab('online'), setStatus('')}}>Mua online</strong>
                <strong className={tab === 'offline' ? styles.history_btn_active_tab : ''} onClick = {e => {setTab('offline') , setStatus('')}}>Mua tại cửa hàng</strong>
            </div>
            <div className={styles.history_tab_content}>
                <div className={styles.history_tab_content_sort}>
                    <button className={status ==='' ? `${styles.history_tab_content_button} ${styles.history_tab_content_button_active}` : `${styles.history_tab_content_button}`} onClick={e => setStatus('')}>Tất cả</button>
                    <button className={status ==='processing' ? `${styles.history_tab_content_button} ${styles.history_tab_content_button_active}` : `${styles.history_tab_content_button}`} onClick={e => setStatus('processing')}>Đang xử lý</button>
                    <button className={status ==='success' ? `${styles.history_tab_content_button} ${styles.history_tab_content_button_active}` : `${styles.history_tab_content_button}`} onClick={e => setStatus('success')}>Thành công</button>
                    <button className={status ==='cancel' ? `${styles.history_tab_content_button} ${styles.history_tab_content_button_active}` : `${styles.history_tab_content_button}`} onClick={e => setStatus('cancel')}>Đã hủy</button>
                </div> 
                <div className={styles.history_tab_content_show}>
                    {
                        bookings && bookings.map((each, el) => {
                            return (
                                <div className={styles.eachBooking} key={el}>
                                    <div className={styles.eachBooking_title}>
                                        <div>
                                            <p>Mã đơn hàng:{each.orderId}  |</p>
                                            <p>Đặt ngày:{convertToVietnamTime(each.createAt)}</p>
                                            {
                                                each.status === "processing"
                                                && <button>Đang xử lý</button>
                                            }
                                            {
                                                each.status === "success"
                                                && <button>Thành công</button>
                                            }
                                            {
                                                each.status === "cancel"
                                                && <button>Đã hủy</button>
                                            }
                                            {
                                                each.method === "online"
                                                && <p>Thanh toán: Thanh toán demo qua {each.paymentCardName}  |</p>
                                            }
                                            {
                                                each.method === "offline"
                                                && <p>Thanh toán: Thanh toán khi nhận hàng  |</p>
                                            }
                                            <p>Tổng tiền : {each.subTotal.toLocaleString('Vi-VN')}đ</p>

                                        </div>
                                        <Link to={`/profile/history/order/${each.orderId}`}>
                                            Xem chi tiết
                                            <i className="fa-solid fa-caret-right"></i>
                                        </Link>
                                    </div>
                                    <div className={styles.eachBooking_image}>
                                        <div className='row'>

                                            {
                                                each.products.map((e, i) => {
                                                    return (
                                                        <div className="col-lg-6" key={i}>
                                                            <div className={styles.eachBookingContainer}>
                                                                <div className={styles.eachBooking_image_image}>
                                                                    <img src= {`/products/${e.image}`} />
                                                                </div>
                                                                <div className={styles.eachBooking_content_detail}>
                                                                    <Link to='' style={{
                                                                        display: 'block',
                                                                        fontSize: '15px',
                                                                        color: '#326e51',
                                                                        fontWeight: '700'
                                                                    }}>{e.product.category}</Link>
                                                                    <Link to='' style={{
                                                                        display: 'block',
                                                                        fontSize: '13px',
                                                                        color: '#326e51',
                                                                        fontWeight: '500'
                                                                    }}>{e.product.name}</Link>
                                                                    <p style={{ fontSize: '13px' }}>{e.color}</p>
                                                                    <p style={{ fontSize: '13px' }}>{e.size}</p>
                                                                    <p style={{ fontSize: '13px' }}>{e.quantity} x <strong style={{ color: '#ff6600' }}>{e.product.newPrice.toLocaleString('Vi-VN')}đ</strong></p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div >
    )
}

export default History