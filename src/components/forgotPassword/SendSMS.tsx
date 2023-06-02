import { Link, useNavigate } from 'react-router-dom'
import Title from '../Tiltle/Title'
import styles from '../login/Login.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useDispatch } from 'react-redux'
import { Loader } from '@chatscope/chat-ui-kit-react'
import { hideLoader, showLoader } from '../../slices/loaderSlice'
import { handleNotify } from '../../slices/notifySlice'

const SendSMS = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)

    const [phone, setPhone] = useState("")
    const handleSendPassword = async (phn: string) => {
        try {
            dispatch(hideLoader())
            const res = await axios.patch("/myway/api/users/resetPasswordPhone", { phone })
            dispatch(showLoader())
            if (res.data.status === "success") {
                dispatch(handleNotify({ message: "Đã gửi mật khẩu mới , vui lòng kiểm tra sms", show: true, status: 200 }))
                setTimeout(() => {
                    dispatch(handleNotify({ message: "", show: false, status: 0 }))
                    navigate('/account/login')
                }, 2000)
            }
        }
        catch (err) {
            dispatch(handleNotify({ message: "Đã có lỗi khi gửi mật khẩu , vui lòng thử lại", show: true, status: 400 }))
            setTimeout(() => {
                dispatch(handleNotify({ message: "", show: false, status: 0 }))
            }, 2000)
        }
    }
    return (
        <div>
            {handleLoader.loader && <Loader />}
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
                            handleSendPassword(phone)
                        }}>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Phone">SDT <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Phone" type='text' required placeholder="Nhập Số Điện Thoại" value={phone} onChange={event => {
                                    setPhone(event.target.value)
                                }} />
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