/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import Title from "../Tiltle/Title"
import styles from './Profile.module.css'
import { BOOKING } from "./History"
import { convertToVietnamTime } from "./History"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
const ProfileWithContent = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [bookings, setBookings] = useState<BOOKING[]>()
    useEffect(() => {
        const getBookingMe = async () => {
            await fetch(`/myway/api/bookings/getBookingsMe`)
                .then(res => res.json())
                .then(all => setBookings(all.bookings))
        }

        getBookingMe()
    }, [])
    return (

        <div className={`${styles.contentWithSideBar}`}>
            <div className={`${styles.contentWithSideBar_title}`}>
                Đơn hàng mới nhất
                <Link to='/profile/history'>Xem tất cả</Link>
            </div>
            <table style={{ width: '100%' }} className={`${styles.tableOrderUser}`}>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ngày mua</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings?.map((each, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/profile/history/order/${each.orderId}`}>{each.orderId}</Link>
                                    </td>
                                    <td>{convertToVietnamTime(each.createAt)}</td>
                                    <td>{each.subTotal}</td>
                                    <td>{(each.status === "success" || each.status === "processing") ? 'Đang xử lý' : 'Thất bại' }</td>
                                    <td>
                                        <Link to={`/profile/history/order/${each.orderId}`}>Xem đơn hàng</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className={`${styles.inforAccount}`}>
                <strong className={`${styles.inforAccount_Title}`}>
                    Thông tin tài khoản
                </strong>
                <div className={`row`} style={{ marginTop: '10px' }}>
                    <div className={`col-lg-6`}>
                        <div className={`${styles.fixAccount}`}>
                            <div>
                                <strong>{handleLoginAndCart.user.name}</strong>
                                <Link to=''>Chỉnh sửa</Link>
                            </div>
                            <p>{handleLoginAndCart.user.email}</p>
                        </div>
                    </div>
                    <div className={`col-lg-6`}>
                        <div className={`${styles.getNewInfor}`}>
                            <div>
                                <strong>Tùy chọn đăng ký, cập nhật thông tin khuyến mãi</strong>
                                <button>Lưu thay đổi</button>
                            </div>
                            <p>
                                <input type='checkbox' />
                                Đăng kí
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.fixAddress}`}>
                <div className={`${styles.fixAddress_Title}`}>
                    <strong>Sổ địa chỉ</strong>
                    <Link to=''>Quản lý sổ địa chỉ</Link>
                </div>
                <div className={`row`}>
                    <div className={`col-lg-6`}>
                        <div className={`${styles.showAddress}`}>
                            <div>
                                <strong>{handleLoginAndCart.user.name}</strong>
                                -
                                <p>{handleLoginAndCart.user.phone}</p>
                            </div>
                            <p>{handleLoginAndCart.user.address}</p>
                            <img src="https://hasaki.vn/images/graphics/bg_icon_check_diachi.gif" />
                        </div>
                    </div>
                    <div className={`col-lg-6`}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileWithContent