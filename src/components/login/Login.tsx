/*eslint-disable*/
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { signInWithPopup, FacebookAuthProvider, getAuth } from 'firebase/auth'
import FacebookLogin from '@greatsumini/react-facebook-login';
import styles from './Login.module.css'
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { UserInfor } from "../../slices/authSlice";
import { handleNotify } from "../../slices/notifySlice";
import Title from "../Tiltle/Title";
import { initializeApp } from "firebase/app";
interface Account {
    email: string,
    password: string
}


const BtnGoogle: React.FC = (props) => {
    // const { token, user, setToken, setUser } = useContext(tokenStorage)
    const dispatch = useDispatch()

    const navigate: NavigateFunction = useNavigate()
    const loginGg = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
            console.log(res)
            const resPost = await axios({
                method: 'POST',
                url: '/myway/api/users/signup/googleAccount',
                data: {
                    googleId: res.data.sub,
                    name: res.data.name,
                    email: res.data.email,
                    address: '',
                    phone: ''
                }
            })

            if (resPost.data.status === 'success') {
                const userGg: UserInfor = { ...resPost.data.data.user }
                dispatch(login({ tokenDispatch: resPost.data.token, userDispatch: userGg, timeExpire: resPost.data.timeExpire }))

                navigate('/')
            }

        },
        onError: tokenResponse => console.log(tokenResponse),
    });
    return <Link to='' style={{ marginRight: '8px' }} onClick={e => { e.preventDefault(), loginGg() }}>
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" />
    </Link>
}




const Login: React.FC = () => {

    const dispatch = useDispatch()
    const navigate: NavigateFunction = useNavigate()
    // const { token, setToken, user, setUser } = useContext(tokenStorage)
    const [account, setAccount] = useState<Account>({
        email: '',
        password: ''
    })
    const handleLoginNormal = async (objAccount: Account) => {
        try {
            const res = await axios({
                method: 'POST',
                url: '/myway/api/users/login',
                data: objAccount
            })

            if (res.data.status === 'success') {
                console.log(res.data.data.timeExpire)
                dispatch(login({ tokenDispatch: res.data.token, userDispatch: res.data.data.user, timeExpire: res.data.timeExpire }))
                // dispatch(handleNotify({ message: "Đăng nhập thành công , chờ trong giây lát!", show: true, status: 200 }))
                // setTimeout(() => {
                //     dispatch(handleNotify({ message: "", show: false, status: 0 }))
                navigate('/')
                // }, 1500)
            }
        }
        catch (err: any) {
            dispatch(handleNotify({ message: "Thông tin đăng nhập không chính xác , vui lòng thử lại sau", show: true, status: 400 }))
            setTimeout(() => {
                dispatch(handleNotify({ message: "", show: false, status: 0 }))
            }, 2000)
        }
    }
    // const signInWithFacebook = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    //     event.preventDefault()
    //     signInWithPopup(auth, provider)
    //         .then(result => {
    //             console.log(result)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    const firebaseConfig = {
        apiKey: "AIzaSyBbLgHgOpXJeckQnpxRg0g4uxHCHJR9khs",
        authDomain: "auth-ff3d6.firebaseapp.com",
        projectId: "auth-ff3d6",
        storageBucket: "auth-ff3d6.appspot.com",
        messagingSenderId: "955357172472",
        appId: "1:955357172472:web:43288d1bec7accf4b5a10d",
        measurementId: "G-K0FRV0DD3W"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Đăng nhập thành công, bạn có thể lấy thông tin người dùng từ result.user
                console.log(result.user);
            })
            .catch((error) => {
                // Xử lý lỗi đăng nhập
                console.error(error);
            });
    };
    return (
        <div>
            <Title>
                <ul>
                    <li>
                        <Link to='/' style={{ whiteSpace: 'pre' }}>Trang chủ  {'>'} </Link>
                    </li>
                    <li>
                        <Link to=''>Đăng nhập tài khoản</Link>
                    </li>
                </ul>
            </Title>
            <div className={`container-md ps-lg-5 pe-lg-5`} style={{ marginTop: '30px', width: '100%', overflow: 'hidden' }}>
                <div className={`row`}>
                    <div className={`col-md-6 offset-md-3`}>
                        <div className={`${styles.loginTitle}`}>
                            <h2>ĐĂNG NHẬP TÀI KHOẢN</h2>
                            <div className={`${styles.loginFacebookGoogle}`}>
                                <GoogleOAuthProvider clientId="849429235369-7gor9ae12l6548i14q2mkud9o6bhjoff.apps.googleusercontent.com">
                                    <BtnGoogle />
                                </GoogleOAuthProvider>
                                <Link to='' style={{ marginLeft: '8px' }} onClick={event => {
                                    event.preventDefault()
                                    signInWithFacebook()
                                }}>
                                    <img src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" />
                                </Link>
                            </div>
                        </div>

                        <form className={`${styles.formLogin}`} onSubmit={e => {
                            e.preventDefault()
                            handleLoginNormal(account)
                        }}>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Email">EMAIL <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Email" placeholder="Nhập Địa Chỉ Email Hoặc SDT" value={account.email} required onChange={e => { e.preventDefault(), setAccount({ ...account, email: e.target.value }) }} />

                            </div>
                            <div className={`${styles.formGroup}`}>
                                <label htmlFor="Password">MẬT KHẨU <span style={{ color: '#ec1f27' }}>*</span></label>
                                <input id="Password" type='password' placeholder="Nhập Mật Khẩu" value={account.password} required onChange={e => { e.preventDefault(), setAccount({ ...account, password: e.target.value }) }} />


                            </div>

                            <button>ĐĂNG NHẬP</button>
                        </form>

                        <div className={`${styles.forgotPassword}`}>
                            <Link to='/account/forgotpassword/email'>Quên mật khẩu?</Link>
                            <p>BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ <Link to='/account/signup'>TẠI ĐÂY</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Login