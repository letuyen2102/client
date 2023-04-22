/*eslint-disable*/
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import styles from './Login.module.css'
// import { tokenStorage } from "../../App"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { login } from "../../slices/authSlice";
import { UserInfor } from "../../slices/authSlice";
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
                    address : '',
                    phone : ''
                }
            })

            if (resPost.data.status === 'success') {
                const userGg: UserInfor = {...resPost.data.data.user}
                dispatch(login({tokenDispatch : resPost.data.token , userDispatch : userGg}))

                navigate('/')
            }

        },
        onError: tokenResponse => console.log(tokenResponse),
    });
    return <Link to='' style={{ marginRight: '8px' }} onClick = {e => {e.preventDefault() , loginGg()}}>
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" />
    </Link>
}




const Login: React.FC = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [messError, setMessError] = useState<string | null>()
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
                // setToken(res.data.token)
                // setUser(res.data.data.user)
                console.log(res.data.data.user)
                dispatch(login({tokenDispatch : res.data.token , userDispatch : res.data.data.user}))
                navigate('/')
            }
        }
        catch (err: any) {
            setMessError(err.response.data.message)
        }
    }

    useEffect(() => {
        setMessError(null)
    }, [account])
    useEffect(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")

    } , [])
    return (
        <div className={`container-md ps-lg-5 pe-lg-5`} style={{ marginTop: '30px', width: '100%', overflow: 'hidden' }}>
            <div className={`row`}>
                <div className={`col-md-6 offset-md-3`}>
                    <div className={`${styles.loginTitle}`}>
                        <h2>ĐĂNG NHẬP TÀI KHOẢN</h2>
                        <div className={`${styles.loginFacebookGoogle}`}>
                            <GoogleOAuthProvider clientId="849429235369-7gor9ae12l6548i14q2mkud9o6bhjoff.apps.googleusercontent.com">
                                <BtnGoogle />
                            </GoogleOAuthProvider>
                            <Link to='' style={{ marginLeft: '8px' }}>
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
                            <p className="error_message">{messError}</p>
                        </div>
                        <div className={`${styles.formGroup}`}>
                            <label htmlFor="Password">MẬT KHẨU <span style={{ color: '#ec1f27' }}>*</span></label>
                            <input id="Password" type='password' placeholder="Nhập Mật Khẩu" value={account.password} required onChange={e => { e.preventDefault(), setAccount({ ...account, password: e.target.value }) }} />
                            <p className="error_message">{messError}</p>

                        </div>

                        <button>ĐĂNG NHẬP</button>
                    </form>

                    <div className={`${styles.forgotPassword}`}>
                        <Link to=''>Quên mật khẩu?</Link>
                        <p>BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ <Link to='/account/signup'>TẠI ĐÂY</Link></p>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login