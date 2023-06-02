/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { PRODUCT } from "../Detail/Detail"
import styles from './DetailBooking.module.css'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
export interface PRODORDER {
    product: PRODUCT
    quantity: number,
    color: string,
    size: string,
    image: string,
    total: number
}
export interface ORDER {
    _id: string
    products: PRODORDER[],
    method: string,
    orderId: string,
    status: string,
    createAt: string,
    subTotal: number,
    paymentCardName: string
}
const convertToVietnamTime = (utcTime: string): string => {
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
const DetailBooking = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const { orderId } = useParams()
    const [order, setOrder] = useState<ORDER>()
    console.log(order)
    useEffect(() => {
        const getOrder = async () => {
            await fetch(`/myway/api/bookings/getBooking/${orderId}`)
                .then(res => res.json())
                .then(all => setOrder(all.booking))
        }

        getOrder()
    }, [])
    return (
        <div className={styles.detail_booking}>
            <strong className={styles.detail_booking_title}>Chi tiết đơn hàng</strong>
            <div className={styles.detail_booking_address}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className={styles.bookingDate}>
                            <p>Đơn hàng <span>#{orderId}</span></p>
                            <p>Ngày đặt : {convertToVietnamTime(order?.createAt === undefined ? '' : order.createAt)}</p>
                            {
                                order?.status === "success" &&
                                <button className={styles.btnSuccess}>Thành công</button>
                            }
                            {
                                order?.status === "processing" &&
                                <button className={styles.btnProcessing}>Đang xử lý</button>
                            }
                            {
                                order?.status === "required" &&
                                <button className={styles.btnProcessing}>Đang yêu cầu hủy</button>
                            }
                            {
                                order?.status === "cancel" &&
                                <button className={styles.btnCancel}>Đã hủy</button>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={styles.bookingAddress}>
                            <h4>Địa chỉ người nhận</h4>
                            <p>{handleLoginAndCart.user.address}</p>
                            <p>{handleLoginAndCart.user.phone}</p>
                            <p>{handleLoginAndCart.user.address}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={styles.bookingPayment}>
                            <h4>Phương thức thanh toán :</h4>
                            {
                                order?.method === "offline" ?
                                    <p>Thanh toán khi nhận hàng (cod)</p>
                                    : <p>Thanh toán {order?.method} qua {order?.paymentCardName}</p>
                            }
                            {
                                (order?.method === "online" && (order.status === "processing" || order.status === "success")) && <span>Thanh toán thành công</span>
                            }
                            {
                                order?.method === "offline" && order.status === "processing"
                                && <span>Đang chờ xử lý</span>
                            }
                            {
                                order?.method === "offline" && order.status === "success"
                                && <span>Đặt hàng thành công</span>
                            }
                            {order?.status === "cancel" && <span>Thanh toán thất bại</span>}
                        </div>
                    </div>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Tạm tính</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order?.products.map((each, idx) => {
                            return (
                                <tr key={idx}>
                                    <td style={{ width: '60%' }}>
                                        <div className={styles.eachBookingRow}>
                                            <div className={styles.eachBookingRow_img}>
                                                <div>
                                                    <img src={`/products/${each.image}`} />
                                                </div>
                                            </div>
                                            <div className={styles.eachBookingRow_infor}>
                                                <h4>{each.product.category}</h4>
                                                <Link to=''>{each.product.name}</Link>
                                                <span>Size : {each.size}</span>
                                                <div>Màu : {each.color}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: '14px' }}>{each.product.newPrice.toLocaleString('Vi-VN')}đ</td>
                                    <td style={{ fontSize: '14px' }}>{each.quantity}</td>
                                    <td style={{ fontSize: '14px' }}>{each.total.toLocaleString('Vi-VN')}đ</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className={styles.endBill}>
                <div>
                    <div className={styles.endBill1}>
                        <p>Tạm tính</p>
                        <p>{order?.subTotal.toLocaleString('Vi-VN')}đ</p>

                    </div>
                    <div className={styles.endBill1}>
                        <p>Phí vận chuyển</p>
                        <p>0đ</p>
                    </div>
                    <div className={styles.endBill1}>
                        <p>Giảm giá</p>
                        <p>-0đ</p>
                    </div>
                    <div className={styles.endBill2}>
                        <p style={{ fontSize: '15px', fontWeight: '600' }}>Thành tiền </p>
                        <p style={{ fontSize: '18px', fontWeight: '600', color: '#ff6600' }}>{order?.subTotal.toLocaleString('Vi-VN')}đ</p>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to='/profile/history'>Quay lại đơn hàng</Link>
            </div>
        </div>
    )
}
export default DetailBooking