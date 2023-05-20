import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './MyBooking.module.css'
import { ORDER } from './PaginitionBooking'
import moment from 'moment'

const DetailOrder = () => {
    const { orderId } = useParams()

    const [orderDetail, setOrderDetail] = useState<ORDER>()
    console.log(orderDetail)
    useEffect(() => {
        const getBooking = async () => {
            await fetch(`/myway/api/bookings/getBooking/${orderId}`)
                .then(res => res.json())
                .then(all => setOrderDetail(all.booking))
        }

        getBooking()
    }, [orderId])

    return (
        <div className='col-lg-10 offset-lg-1'>
            <div className={styles.sectionTitle}>
                <p>Chi tiết đơn hàng</p>
            </div>

            <div style={{ padding: '20px 30px', border: '1px solid rgb(222, 231, 231)', backgroundColor: '#fff', marginTop: '30px' }}>
                <div className={styles.eachInfor}>
                    <span>Đơn hàng:</span>
                    <span>#{orderDetail?._id}</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Ngày đặt:</span>
                    <span>{moment(orderDetail?.createAt).format('DD/MM/YYYY')}</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Trạng thái:</span>
                    {
                        orderDetail?.status === "processing"
                        && <button className={styles.btnOrderSuccess}>Đang xử lý</button>
                    }
                    {
                        orderDetail?.status === "success"
                        && <button className={styles.btnOrderSuccess}>Đã xác nhận</button>
                    }
                    {
                        orderDetail?.status === "cancel"
                        && <button className={styles.btnOrderFail}>Đã hủy</button>
                    }
                    {
                        orderDetail?.status === "required"
                        && <button className={styles.btnOrderSuccess}>Đang yêu cầu hủy</button>
                    }
                </div>
                <div className={styles.eachInfor}>
                    <span>Tên người nhận:</span>
                    <p>{orderDetail?.name}</p>
                </div>
                <div className={styles.eachInfor}>
                    <span>Số điện thoại:</span>
                    <span>{orderDetail?.phone}</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Email:</span>
                    <span>{orderDetail?.email ? orderDetail.email : ""}</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Địa chỉ nhận hàng:</span>
                    <span>{orderDetail?.address}</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Ghi chú:</span>
                    <span>{orderDetail?.note ? orderDetail.note : ""}</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Hình thức thanh toán:</span>
                    {
                        orderDetail?.paymentCardName ? <span>Thanh toán online qua {orderDetail.paymentCardName}</span>
                            : <span>Thanh toán khi nhận hàng (COD)</span>
                    }
                </div>
            </div>

            <div style={{ padding: '20px 30px', border: '1px solid rgb(222, 231, 231)', backgroundColor: '#fff', marginTop: '30px' }}>
                <div className={styles.sectionTitle}>
                    <p style={{ fontSize: '20px' }}>Thông tin đơn hàng <span>#{orderDetail?._id}</span></p>
                </div>
                <table className={styles.orderTable}>
                    <thead>
                        <tr>
                            <th>
                                <span>Tên sản phẩm</span>
                            </th>
                            <th>
                                <span>Giá niêm yết</span>
                            </th>
                            <th>
                                <span>Số lượng</span>
                            </th>
                            <th>
                                <span>Thành tiền</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orderDetail?.products.map((each, idx) => {
                                return <tr key={idx}>
                                    <td>
                                        <div>
                                            <span>{each.product.name}</span>
                                            <div>
                                                <p>Màu : {each.colorName}</p>
                                                <p>Kích cỡ : {each.size}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{each.product.newPrice.toLocaleString('Vi-VN')}đ</p>
                                    </td>
                                    <td>
                                        <p>{each.quantity}</p>
                                    </td>
                                    <td>
                                        <p>{each.total.toLocaleString('Vi-VN')}đ</p>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

                <ul className={styles.detailBill}>
                    <li>
                        <span>Tổng tiền hàng</span>
                        <span>{orderDetail?.subTotal.toLocaleString('Vi-VN')}đ</span>
                    </li>

                    <li>
                        <span>Phí vận chuyển</span>
                        <span>Freeship</span>
                    </li>

                    <li>
                        <span>Giảm giá vận chuyển</span>
                        <span>0đ</span>
                    </li>
                    <li>
                        <span>Giảm giá đơn hàng</span>
                        <span>0đ</span>
                    </li>
                    <li>
                        <span>Tổng thanh toán</span>
                        <span>{orderDetail?.subTotal.toLocaleString('Vi-VN')}đ</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DetailOrder