/*eslint-disable*/
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Loader } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
import { handleNotify } from '../../slices/notifySlice';
import styles from '../SectionProfile/SectionProfile.module.css'
import { Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const ChangePhone = () => {
    const navigate = useNavigate()
    const [phone, setPhone] = useState("")
    const [showOtp, setShowOtp] = useState(false)
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)
    const handleSendOtp = async (sdt: string) => {
        try {
            dispatch(hideLoader())
            const res = await axios.post('/myway/api/users/sendOtp', { phone: sdt })
            dispatch(showLoader())
            if (res.data.status === "success") {
                setShowOtp(true)
            }

        }
        catch (err: any) {
            console.log(err)
            dispatch(handleNotify({ message: "Dịch vụ đã tạm ngừng do vấn đề chi phí , mong quý khách thông cảm", show: true, status: 400 }))
            setTimeout(() => {
                dispatch(handleNotify({ message: "", show: false, status: 0 }))
            }, 2000)
        }
    }
    const handleResetPhone = async (phn: string, otp: string) => {
        try {
            dispatch(hideLoader())
            const res = await axios.patch(`/myway/api/users/updatePhone`, {
                phone: phn,
                otp: otp
            })
            dispatch(showLoader())
            if (res.data.status === "success") {
                navigate('/profile/account/user/')
            }
        }
        catch (err) {
            dispatch(handleNotify({ message: "Vui lòng kiểm tra lại mã OTP", show: true, status: 400 }))
            setTimeout(() => {
                dispatch(handleNotify({ message: "", show: false, status: 0 }))
            }, 2000)
        }
    }
    return (
        <Container>
            <div className='col-lg-10 offset-lg-1'>
                <div>
                    <p>Do vấn đề chi phí duy trì SMS nên dịch vụ phải tạm dừng , mong quý khách thông cảm</p>
                </div>
                {handleLoader.loader && <Loader />}
                {!showOtp ? <form className={`${styles.formGroup} ${styles.btnSend}`} onSubmit={event => {
                    event.preventDefault()
                    handleSendOtp(phone)
                }}>
                    <label>Nhập số điện thoại mới</label>
                    <input
                        type='text'
                        placeholder='Nhập số điện thoại mới'
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                    <button>Gửi OTP</button>
                </form>
                    :
                    <form className={`${styles.formGroup} ${styles.btnSend}`} onSubmit={event => {
                        event.preventDefault()
                        handleResetPhone(phone, otp)
                    }}>
                        <label>Nhập mã OTP</label>
                        <input
                            type='text'
                            value={otp}
                            onChange={event => {
                                setOtp(event.target.value)
                            }}
                        />
                        <button>Xác nhận</button>

                    </form>}
            </div>
        </Container>

    );
};

export default ChangePhone;

