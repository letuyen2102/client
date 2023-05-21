/*eslint-disable*/

import React, { useState } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import classes from './Signup.module.css'
import styles from './../login/Login.module.css'
import Title from "../Tiltle/Title"
import axios from "axios"

interface Account {
    name: string,
    email: string,
    phone: string,
    address: string,
    password: string,
    passwordConfirm: string
}

const Signup: React.FC = (props) => {
    const navigate: NavigateFunction = useNavigate()
    const [messageError, setMessError] = useState<string | null>()
    const [accountSignup, setAccountSignup] = useState<Account>({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        passwordConfirm: ''
    })
    const handleSignup = async (objSignup: Account) => {
        try {
            const res = await axios({
                method: 'POST',
                url: '/myway/api/users/signup',
                data: objSignup
            })

            if (res.data.status === 'success') {
                navigate('/account/login')
            }
        }
        catch (err: any) {
            setMessError(err.response.data.message)
        }
    }

    return (
        <div>
            <Title>
                <ul>
                    <li>
                        <Link to='/'>Trang chủ {`>`}</Link>
                    </li>
                    <li>
                        <Link to=''>Đăng kí tài khoản</Link>
                    </li>
                </ul>
            </Title>
            <div className={`container-md ps-lg-5 pe-lg-5`} style={{ marginTop: '30px', overflow: 'hidden' }}>
                <div className={`row`}>
                    <div className={`col-md-6 offset-md-3`}>
                        <div className={`${styles.loginTitle}`}>
                            <h2>ĐĂNG KÍ TÀI KHOẢN</h2>
                        </div>
                        <p className="error_message">{messageError}</p>
                        <form className={`${styles.formLogin}`} onSubmit={e => {
                            e.preventDefault(),
                                handleSignup(accountSignup)
                        }}>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Name">Tên <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Name" placeholder="Nhập Tên Của Bạn" required value={accountSignup.name} onChange={e => {
                                    e.preventDefault(),
                                        setAccountSignup({ ...accountSignup, name: e.target.value })
                                }} />
                            </div>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Phone">Số Điện Thoại <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Phone" placeholder="Nhập Số Điện Thoại" required value={accountSignup.phone} onChange={e => {
                                    e.preventDefault(),
                                        setAccountSignup({ ...accountSignup, phone: e.target.value })
                                }} />
                            </div>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Email">Email <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Email" placeholder="Nhập Email Của Bạn" required value={accountSignup.email} onChange={e => {
                                    e.preventDefault(),
                                        setAccountSignup({ ...accountSignup, email: e.target.value })
                                }} />
                            </div>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Address">Địa chỉ  <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Address" placeholder="Nhập địa chỉ" required value={accountSignup.address} onChange={e => {
                                    e.preventDefault(),
                                        setAccountSignup({ ...accountSignup, address: e.target.value })
                                }} />
                            </div>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Password">Mật Khẩu <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Password" placeholder="Nhập Mật Khẩu" required type='password' minLength={8} value={accountSignup.password} onChange={e => {
                                    e.preventDefault(),
                                        setAccountSignup({ ...accountSignup, password: e.target.value })
                                }} />
                            </div>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="PasswordConfirm">Mật Khẩu Xác Thực <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="PasswordConfirm" placeholder="Nhập Lại Mật Khẩu" required type='password' minLength={8} value={accountSignup.passwordConfirm} onChange={e => {
                                    e.preventDefault(),
                                        setAccountSignup({ ...accountSignup, passwordConfirm: e.target.value })
                                }} />
                            </div>

                            <button>ĐĂNG KÍ</button>
                        </form>

                        <div className={`${styles.forgotPassword}`}>
                            <Link to='/account/login'>ĐĂNG NHẬP</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup