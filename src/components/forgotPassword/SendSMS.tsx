import { Link } from 'react-router-dom'
import Title from '../Tiltle/Title'
import styles from '../login/Login.module.css'

const SendSMS = () => {
    return (
        <div>
            <Title>
                <ul>
                    <li>
                        <Link to='/' style={{ whiteSpace: 'pre' }}>Trang chủ  {'>'} </Link>
                    </li>
                    <li>
                        <Link to=''>Quên mật khẩu</Link>
                    </li>
                </ul>
            </Title>
            <div className={`container-md ps-lg-5 pe-lg-5`} style={{ marginTop: '30px', width: '100%', overflow: 'hidden' }}>
                <div className={`row`}>
                    <div className={`col-md-6 offset-md-3`}>
                        <div className={`${styles.loginTitle}`}>
                            <h2>QUÊN MẬT KHẨU</h2>
                            <p style={{ color: '#ec1f27', fontWeight: '600' }}>Do vấn đề chi phí nên dịch vụ này phải tạm ngừng ! Vui lòng dùng dịch vụ bằng EMAIL . Trân trọng !</p>
                        </div>

                        <form className={`${styles.formLogin}`} onSubmit={event => {
                            event.preventDefault()

                        }}>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Phone">SDT <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Phone" type='text' placeholder="Nhập Số Điện Thoại" />
                            </div>

                            <button>Gửi Mật Khẩu</button>
                        </form>

                        <div className={`${styles.forgotPassword}`}>
                            <Link to='/account/forgotpassword/email'>Gửi Email</Link>
                            <p>QUAY LẠI {'->'} <Link to='/account/login'>TẠI ĐÂY</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendSMS