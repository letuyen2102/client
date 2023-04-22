import styles from './MyBooking.module.css'

const MyBooking = () => {
    return (
        <div>
            <div className={styles.sectionTitle}>
                <p>Đơn hàng của tôi</p>
            </div>
            <div className='row'>
                <div className='col-lg-3'>
                    <div>
                        <button>TẤT CẢ</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button>CHƯA XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button>ĐÃ XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button>THẤT BẠI</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBooking