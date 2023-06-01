import { Link } from 'react-router-dom'
import { useState } from 'react'
import Title from '../Tiltle/Title'
import styles from '../login/Login.module.css'
import { useDispatch } from 'react-redux'
import { handleNotify } from '../../slices/notifySlice'
import axios from 'axios'
const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(true)
    const handleSendLink = async (email: string) => {
        try {
            const res = await axios.post('/myway/api/users/forgotPassword', { email })

            if (res.data.status === "success") {
                setShow(false)
            }
        }
        catch (err) {
            dispatch(handleNotify({ message: "Thông tin email không chính xác , vui lòng kiểm tra lại ", show: true, status: 400 }))
            setTimeout(() => {
                dispatch(handleNotify({ message: "", show: false, status: 0 }))
            }, 2000)
        }
    }
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
                        </div>

                        {show && <form className={`${styles.formLogin}`} onSubmit={event => {
                            event.preventDefault()
                            handleSendLink(email)
                        }}>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Email">EMAIL <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Email" type='email' required placeholder="Nhập Địa Chỉ Email" value={email} onChange={event => setEmail(event.target.value)} />
                            </div>

                            <button>Gửi liên kết</button>
                        </form>}

                        {show ? <div className={`${styles.forgotPassword}`}>
                            <Link to='/account/forgotpassword/sms'>Gửi SMS</Link>
                            <p>QUAY LẠI {'->'} <Link to='/account/login'>TẠI ĐÂY</Link></p>
                        </div> : <div className={`${styles.forgotPassword}`}>
                            <Link to='' onClick={event => {
                                event.preventDefault()
                                setEmail("")
                                setShow(true)
                            }}>Gửi Lại</Link>
                            <p>QUAY LẠI {'->'} <Link to='/account/login'>TẠI ĐÂY</Link></p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword