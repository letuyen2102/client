import { useEffect, useState } from 'react'
import styles from './MyBooking.module.css'
import PaginatedItems from './PaginitionBooking'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'

const MyBooking = () => {
    const navigate: NavigateFunction = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [apiString, setApiString] = useState('/myway/api/bookings/getBookingsMe')
    useEffect(() => {
        setApiString('/myway/api/bookings/getBookingsMe' + location.search)
    }, [location.search])
    return (
        <div>
            <div className={styles.sectionTitle}>
                <p>Đơn hàng của tôi</p>
            </div>
            <div className='row' style={{ marginTop: '24px' }}>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${!searchParams.get("status") && styles.btnColor}`} onClick={() => {
                            searchParams.delete("page")
                            searchParams.delete("status")
                            navigate(`?${searchParams.toString()}`)
                        }}>TẤT CẢ</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "processing" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("page")
                            searchParams.delete("status")

                            searchParams.set("status", "processing")
                            navigate(`?${searchParams.toString()}`)

                        }}>CHƯA XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "success" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("page")
                            searchParams.delete("status")

                            searchParams.set("status", "success")
                            navigate(`?${searchParams.toString()}`)

                        }}>ĐÃ XÁC NHẬN</button>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div>
                        <button className={`${styles.btnBooking} ${searchParams.get("status") === "cancel" && styles.btnColor}`} onClick={() => {
                            searchParams.delete("page")
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