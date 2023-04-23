import styles from './MyBooking.module.css'
import PaginatedItems from './PaginitionBooking'

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
            <PaginatedItems itemsPerPage={2} apiString='/myway/api/bookings/getBookingsMe' />
        </div>
    )
}

export default MyBooking