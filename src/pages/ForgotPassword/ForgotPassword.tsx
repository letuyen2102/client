
import { Route, Routes } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ForgotPassword from "../../components/forgotPassword/ForgotPassword"
import SendSMS from "../../components/forgotPassword/SendSMS"

const ForgotPasswordPage = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="email" element={<ForgotPassword />} />
                <Route path="sms" element={<SendSMS />} />
            </Routes>
            <Footer />
        </div>
    )
}
export default ForgotPasswordPage