import { useParams } from 'react-router-dom'
import { useState } from 'react'
import styles from './MyBooking.module.css'
import { ORDER } from './PaginitionBooking'

const DetailOrder = () => {
    const { orderId } = useParams()

    const [orderDetail, setOrderDetail] = useState<ORDER>()

    return (
        <div className='col-lg-10 offset-lg-1'>
            <div className={styles.sectionTitle}>
                <p>Chi tiết đơn hàng</p>
            </div>

            <div style={{ padding: '20px 30px', border: '1px solid rgb(222, 231, 231)', backgroundColor: '#fff', marginTop: '30px' }}>
                <div className={styles.eachInfor}>
                    <span>Đơn hàng:</span>
                    <span>#AT1682151996162</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Ngày đặt:</span>
                    <span>23/4/2023</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Trạng thái:</span>
                    <button>Đã xác nhận</button>
                </div>
                <div className={styles.eachInfor}>
                    <span>Tên người nhận:</span>
                    <p>Lê Văn Tuyến</p>
                </div>
                <div className={styles.eachInfor}>
                    <span>Số điện thoại:</span>
                    <span>0984993733</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Email:</span>
                    <span>letuyenkhtn212@gmail.com</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Địa chỉ nhận hàng:</span>
                    <span>Trường đại học CNTT , phường Linh Trung , quận Thủ Đức</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Ghi chú:</span>
                    <span>Nhận hàng mọi lúc</span>
                </div>
                <div className={styles.eachInfor}>
                    <span>Hình thức thanh toán:</span>
                    <span>Thanh toán khi nhận hàng (COD)</span>
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
                        <tr>
                            <td>
                                <div>
                                    <span>ĐẦM MAXI CỔ TYM KHÔNG TAY</span>
                                    <div>
                                        <p>Màu : Do</p>
                                        <p>Kích cỡ : L+</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p>2.000.000đ</p>
                            </td>
                            <td>
                                <p>2</p>
                            </td>
                            <td>
                                <p>4.000.000đ</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <span>ĐẦM MAXI CỔ TYM KHÔNG TAY</span>
                                    <div>
                                        <p>Màu : Do</p>
                                        <p>Kích cỡ : L+</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p>2.000.000đ</p>
                            </td>
                            <td>
                                <p>2</p>
                            </td>
                            <td>
                                <p>4.000.000đ</p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <ul className={styles.detailBill}>
                    <li>
                        <span>Tổng tiền hàng</span>
                        <span>385.000đ</span>
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
                        <span>4.000.000đ</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DetailOrder