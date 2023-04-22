/*eslint-disable*/
import axios from "axios"
import React, { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { logout } from "../../slices/authSlice"
import { RootState } from "../../store/store"
import Title from "../Tiltle/Title"
import styles from './Profile.module.css'
const Profile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await axios.get('/myway/api/users/logout')
            if (res.data.status === "success") {
                dispatch(logout())
                navigate('/account/login')
            }
        }
        catch (err: any) {
            alert(err.response.data)
        }
    }
    return (
        <div>
            <Title>
                <ul>
                    <li>
                        <Link to='/'>Trang chủ  {'>'}</Link>
                    </li>
                    <li>
                        <Link to=''>Thông tin tài khoản</Link>
                    </li>
                </ul>
            </Title>

            <div className={`${styles.fixBugClass}`}>
                <div className={`container-lg`}>
                    <div className={`row`} style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                        <div className={`col-lg-3`}>
                            <div className={`${styles.profileSideBar}`}>
                                <div className={`${styles.userImageProfile}`}>
                                    <div className={`${styles.userImageProfile_img}`}>
                                        <img src="https://hasaki.vn/images/graphics/account-full.svg" />
                                    </div>
                                    <div className={`${styles.userImageProfile_chose}`}>
                                        <h2>Chào {handleLoginAndCart.user.name}</h2>
                                        <Link to='/profile/detailAccount'>Chỉnh sửa tài khoản</Link>
                                    </div>
                                </div>
                                <div className={`${styles.profileOptions}`}>
                                    <ul>
                                        <li>
                                            <Link to='/profile/customer'>Quản lý tài khoản</Link>
                                        </li>
                                        <li>
                                            <Link to='/profile/detailAccount'>Thông tin tài khoản</Link>
                                        </li>
                                        <li>
                                            <Link to='/profile/history'>Đơn hàng của tôi</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Sổ địa chỉ nhận hàng</Link>
                                        </li>
                                        <li>
                                            <Link to='' style={{ fontSize: '20px', color: '#ec1f27' }} onClick={e => { e.preventDefault(), handleLogout() }}>Đăng xuất</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className={`col-lg-9`}>
                            {children}
                        </div>

                    </div>
                </div>
                <div className={`${styles.fix}`}>
                </div>
            </div>
        </div>
    )
}

export default Profile