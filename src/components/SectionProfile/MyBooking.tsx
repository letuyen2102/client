import { Link } from 'react-router-dom'
import styles from './MyBooking.module.css'

const MyBooking = () => {
    return (
        <div>
            <div className={styles.sectionTitle}>
                <p>Đơn hàng của tôi</p>
            </div>
            <div className='row' style={{ marginTop: '24px' }}>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${styles.btnColor}`}>TẤT CẢ</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking}`}>CHƯA XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking}`}>ĐÃ XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking}`}>THẤT BẠI</button>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px 30px', border: '1px solid rgb(222, 231, 231)', backgroundColor: '#fff', marginTop: '30px' }}>
                <div className={styles.eachOrder}>
                    <div className={styles.eachOrder_overview}>
                        <p>Mã đơn hàng: #AT1682151996162 | Đặt ngày: 22/04/2023 | Thanh toán khi nhận hàng (COD) | Tổng tiền: 385.000đ</p>
                    </div>
                    <div className={styles.eachOrder_item}>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className={styles.eachItemOrder}>
                                    <div style={{ padding: '5px' }}>
                                        <div style={{ width: '60px' }}>
                                            <img src='/products/clothes-3-main.webp' alt='' style={{ width: '100%' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <span>ÁO KHOÁC DÙ UNISEX - TOTODAY - ACTIVE</span>
                                        <p>1 x 385.000đ</p>
                                        <p>Màu : Xanh</p>
                                        <p>Size : S+</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className={styles.eachItemOrder}>
                                    <div style={{ padding: '5px' }}>
                                        <div style={{ width: '60px' }}>
                                            <img src='/products/clothes-3-main.webp' alt='' style={{ width: '100%' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <span>ÁO KHOÁC DÙ UNISEX - TOTODAY - ACTIVE</span>
                                        <p>1 x 385.000đ</p>
                                        <p>Màu : Xanh</p>
                                        <p>Size : S+</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className={styles.eachItemOrder}>
                                    <div style={{ padding: '5px' }}>
                                        <div style={{ width: '60px' }}>
                                            <img src='/products/clothes-3-main.webp' alt='' style={{ width: '100%' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <span>ÁO KHOÁC DÙ UNISEX - TOTODAY - ACTIVE</span>
                                        <p>1 x 385.000đ</p>
                                        <p>Màu : Xanh</p>
                                        <p>Size : S+</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.detailOrder}>
                                <span>Đã Xác nhận</span>
                                <div>
                                    <button>HỦY BỎ</button>
                                    <Link to='/profile/account/user/myOrder/:orderId'>XEM CHI TIẾT</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBooking