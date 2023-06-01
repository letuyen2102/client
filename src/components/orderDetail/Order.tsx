import React, { useEffect, useState } from 'react'
import styles from '../SectionProfile/MyBooking.module.css'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import PaginationAdminBooking from './PaginationAdminBooking'
import { useDispatch } from 'react-redux'
import { hideLoader } from '../../slices/loaderSlice'
const Order: React.FC<{ API: string }> = (props) => {
    const navigate: NavigateFunction = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [apiString, setApiString] = useState(props.API)
    // useEffect(() => {
    //     setApiString('/myway/api/bookings/getAllBookings' + location.search)
    // }, [])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(hideLoader())
    }, [searchParams.toString()])
    return (
        <div>
            <div className={styles.orderTitle}>
                <h1>Danh mục đơn hàng</h1>
            </div>
            <div className='row' style={{ marginTop: '24px' }}>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${!searchParams.get("status") && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")
                            navigate(`?${searchParams.toString()}`)
                        }}>TẤT CẢ</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "processing" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")

                            searchParams.set("status", "processing")
                            navigate(`?${searchParams.toString()}`)

                        }}>CHƯA XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "success" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")

                            searchParams.set("status", "success")
                            navigate(`?${searchParams.toString()}`)

                        }}>ĐÃ XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "cancel" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")

                            searchParams.set("status", "cancel")
                            navigate(`?${searchParams.toString()}`)

                        }}>THẤT BẠI</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "required" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")

                            searchParams.set("status", "required")
                            navigate(`?${searchParams.toString()}`)

                        }}>YÊU CẦU HỦY</button>
                    </div>
                </div>
            </div>
            <PaginationAdminBooking itemsPerPage={6} apiString={apiString + location.search} />
        </div>
    )
}

export default Order