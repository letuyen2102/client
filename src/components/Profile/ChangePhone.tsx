/*eslint-disable*/
import styles from './ChangePhone.module.css'
const ChangePhone = () => {
    return (
        <div className={styles.changePhone}>
            <strong>Thay đổi số điện thoại</strong>
            <div className="row">
                <div className='col-lg-4'>
                    <p>Số điện thoại</p>
                </div>
                <div className='col-lg-4'>
                    <div className={styles.getOTP}>
                        <input placeholder='Nhập số điện thoại mới'/>
                        <p>Mã xác thực (OTP) sẽ được gởi đến số điện thoại này để xác minh số điện thoại của bạn</p>
                        <button>Gửi OTP</button>
                    </div>
                </div>
                <div className='col-lg-4'>

                </div>
            </div>
        </div>
    )
}

export default ChangePhone