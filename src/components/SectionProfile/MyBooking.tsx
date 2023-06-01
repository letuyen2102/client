import React, { useEffect, useState } from 'react'
import styles from './MyBooking.module.css'
import PaginatedItems from './PaginitionBooking'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'

const MyBooking: React.FC<{ API: string }> = (props) => {
    const navigate: NavigateFunction = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [apiString, setApiString] = useState(props.API)
    useEffect(() => {
        setApiString('/myway/api/bookings/getBookingsMe' + location.search)
    }, [location.search])
    return (
        <div>
            <div className={styles.sectionTitle}>
                <p>Đơn hàng của tôi</p>
            </div>
            <div className={`row ${styles.selectOrder}`} style={{ marginTop: '24px' }}>
                <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div>
                        <button className={`${styles.btnBooking} ${!searchParams.get("status") && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")
                            navigate(`?${searchParams.toString()}`)
                        }}>TẤT CẢ</button>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "processing" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")

                            searchParams.set("status", "processing")
                            navigate(`?${searchParams.toString()}`)

                        }}>CHƯA XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "success" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")

                            searchParams.set("status", "success")
                            navigate(`?${searchParams.toString()}`)

                        }}>ĐÃ XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "cancel" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("startItem")
                            searchParams.delete("status")

                            searchParams.set("status", "cancel")
                            navigate(`?${searchParams.toString()}`)

                        }}>THẤT BẠI</button>
                    </div>
                </div>
            </div>
            <PaginatedItems itemsPerPage={2} apiString={apiString} />
        </div>
    )
}

export default MyBooking