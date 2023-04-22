/*eslint-disable*/
import React, { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import styles from './DetailAccount.module.css'
const DetailAccount = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const navigate:NavigateFunction = useNavigate()
    return (
        <div className={`${styles.detailAccount}`}>
            <div className={`row`}>
                <div className={`col-lg-6`}>
                    <div className={`${styles.accountSide1}`}>
                        <strong>Thông tin tài khoản</strong>
                        <div className={`row`} style={{ marginTop: '20px' }}>
                            <div className={`col-lg-3 col-md-3 col-sm-3 col-3`}>
                                <div className={`${styles.accountSide1Image}`}>
                                    <div>
                                        <img src="https://hasaki.vn/images/graphics/account-full.svg" />
                                    </div>
                                    <Link to=''>Tải ảnh bạn</Link>
                                </div>
                            </div>
                            <div className={`col-lg-9 col-md-9 col-sm-9 col-9`}>
                                <div className={`${styles.accountSide1Infor}`}>
                                    <input defaultValue={handleLoginAndCart.user.email} disabled className={styles.inputOne} />
                                    <input placeholder={handleLoginAndCart.user.name} className={styles.inputTwo} />
                                    
                                    <div className={styles.getNewInfor}>
                                        <div>
                                                <input id="1234" type='checkbox'/>
                                                <label htmlFor="1234">Nhận thông tin khuyến mãi qua e-mail</label>
                                        </div>
                                        <button>Cập nhật</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-lg-6`}>
                    <div className={styles.accountSide2}>
                        <strong>Số điện thoại và Email</strong>
                        <div className={`${styles.accountSide2_updatePhone}`}>
                            <div>
                                <i className="fa-light fa-phone"></i>
                                <div>
                                    <p>Số điện thoại</p>
                                    <span>Cập nhật số điện thoại</span>
                                </div>
                            </div>
                            <button onClick={e => navigate('/profile/customer/editPhone')}>Cập nhật</button>
                        </div>
                        

                        <div className={`${styles.accountSide2_updatePhone}`}>
                            <div>
                                <i className="fa-thin fa-envelope"></i>
                                <div>
                                    <p>Email</p>
                                    <span>{handleLoginAndCart.user.email}</span>
                                </div>
                            </div>
                        </div>
                        <br />
                        <strong>Bảo mật</strong>
                        <div className={`${styles.accountSide2_updatePhone}`}>
                            <div>
                                <i className="fa-solid fa-lock-keyhole"></i>
                                <div>
                                    <p>Đổi mật khẩu</p>
                                </div>
                            </div>
                            <button onClick={e => navigate('/profile/customer/editPassword')}>Cập nhật</button>
                        </div>
                        <br />
                        <strong>Liên kết mạng xã hội</strong>
                        <div className={`${styles.accountSide2_updatePhone}`}>
                            <div>
                                <i className="fa-brands fa-facebook" style={{color : '#4285F4'}}></i>
                                <div>
                                    <p>Facebook</p>
                                </div>
                            </div>
                            <button>Cập nhật</button>
                        </div>
                        <div className={`${styles.accountSide2_updatePhone}`}>
                            <div>
                                <i className="fa-brands fa-google" style={{color : '#4285F4'}}></i>
                                <div>
                                    <p>Google</p>
                                </div>
                            </div>
                            <button>Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DetailAccount