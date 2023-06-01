import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserInfor } from '../../slices/authSlice'
import axios from 'axios'
import styles from './DetailUser.module.css'
const DetailUser = () => {
    const { userId } = useParams()
    const [userDetail, setUserDetail] = useState<UserInfor>()

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`/myway/api/users/${userId}`)
            setUserDetail(res.data.data.user)
        }
        getUser()
    }, [])
    return (
        <div className='row'>
            <div className={styles.detailTitle}>
                <p>Chi tiết khách hàng #{userDetail?.name}</p>
            </div>
            <div className='col-lg-10 offset-lg-1'>
                <div className='row'>
                    <div className="col-lg-4">
                        <div className={styles.imageUser}>
                            <img src={`${userDetail?.photo}`} alt="" />
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className={styles.inforUser}>
                            <div className={styles.formGroup}>
                                <label>Tên khách hàng</label>
                                <input defaultValue={userDetail?.name} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Địa chỉ</label>
                                <input defaultValue={userDetail?.address} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input defaultValue={userDetail?.email} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Số điện thoại</label>
                                <input defaultValue={userDetail?.phone} />
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className={styles.formGroup}>
                                        <label>Gới tính</label>
                                        <input defaultValue={userDetail?.gender} onChange={event => {

                                        }} />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className={styles.formGroup}>
                                        <label>Vai trò</label>
                                        <input defaultValue={userDetail?.role} onChange={event => {

                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btnAccess}>
                <Link to={`/myway/admin/user/${userDetail?._id}/orders`}>Xem đơn hàng đặt</Link>
                {/* <Link to='' onClick={event => {
                    event.preventDefault()
                    if (window.confirm("Bạn có chắc xóa khách hàng này ?")) {
                        console.log("ok , xoa")
                    }
                }}>Xóa khách hàng</Link> */}
            </div>
        </div>
    )
}

export default DetailUser