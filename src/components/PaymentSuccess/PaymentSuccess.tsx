import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './PaymentSuccess.module.css'
const PaymentSuccess = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    if (searchParams.get("vnp_ResponseCode")) {
        console.log(searchParams.get("vnp_ResponseCode"))
    }
    console.log(location.search)

    useEffect(() => {
        const fetchVNPAYreturn = async () => {
            await axios.get(`/myway/api/bookings/vnpay_return${location.search}`)
        }
        fetchVNPAYreturn()
    }, [])

    return (
        <div>
            {searchParams.get("vnp_ResponseCode") === "00" ?
                <div className={styles.successPage}>
                    <div className={styles.successBox}>
                        <div>
                            <img src="https://openjournalsystems.com/wp-content/uploads/2017/07/payment-success.png" />
                        </div>
                        <h4>Đặt hàng thành công</h4>
                    </div>

                    <div className={styles.btnSuccess}>

                        <button onClick={e => navigate('/')}>Xem đơn hàng</button>
                        <button onClick={e => navigate('/')}>Trang chủ</button>
                    </div>
                </div> : <div className={styles.successPage}>
                    <div className={styles.successBox}>
                        <div>
                            <img src="https://img.freepik.com/premium-vector/payment-error-info-message-smartphone-customer-cross-marks-failure-vector-illustration_106788-3309.jpg?w=360" />
                        </div>
                        <h4>Đặt hàng như vậy thì chịu rồi . THẤT BẠI !</h4>
                    </div>

                    <div className={styles.btnSuccess}>

                        <button onClick={e => navigate('/')}>Xem đơn hàng</button>
                        <button onClick={e => navigate('/')}>Trang chủ</button>
                    </div>
                </div>}
        </div>
    )
}
//https://img.freepik.com/premium-vector/payment-error-info-message-smartphone-customer-cross-marks-failure-vector-illustration_106788-3309.jpg?w=360
export default PaymentSuccess