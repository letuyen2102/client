import React from 'react'
import Order from '../../components/orderDetail/Order'
import { useParams } from 'react-router-dom'

const GetBookingBaseOnUser = () => {
    const { idUser } = useParams()
    const API = `/myway/api/bookings/getBookingBaseOnUser/${idUser}`
    return (
        <Order API={API} />
    )
}

export default GetBookingBaseOnUser