import { useDispatch } from 'react-redux'
import styles from './ChangePassword.module.css'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../slices/authSlice'
import axios from 'axios'
import { useState } from 'react'
interface CHANGE_PASSWORD {
    passwordCurrent: string,
    password: string,
    passwordConfirm: string
}
const ChangePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [objUpdatePassword, setUpdatePassword] = useState<CHANGE_PASSWORD>({
        passwordCurrent: "",
        password: "",
        passwordConfirm: ""
    })
    const handleChangePassword = async (objUpdatePassword: CHANGE_PASSWORD) => {
        try {
            const res = await axios.patch('/myway/api/users/updateMyPassword', objUpdatePassword)
            if (res.data.status === "success") {
                dispatch(logout())
                navigate('/account/login')
            }
        }
        catch (err) {
            alert("Đã có lỗi xảy ra")
        }
    }
    return (
        <div className='col-lg-10 offset-lg-1'>
            <div className={styles.sectionTitle}>
                <p>Thay đổi mật khẩu</p>
            </div>

            <form onSubmit={event => {
                event.preventDefault();
                handleChangePassword(objUpdatePassword)
            }}>
                <div className={styles.formGroup}>
                    <label>Mật khẩu hiện tại</label>
                    <input type='password' minLength={8} placeholder='Nhập mật khẩu cũ' required value={objUpdatePassword.passwordCurrent} onChange={event => setUpdatePassword({ ...objUpdatePassword, passwordCurrent: event.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <label>Mật khẩu mới</label>
                    <input type='password' minLength={8} placeholder='Nhập mật mới' required value={objUpdatePassword.password} onChange={event => setUpdatePassword({ ...objUpdatePassword, password: event.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <label>Nhập lại mật khẩu</label>
                    <input type='password' minLength={8} placeholder='Nhập lại mật khẩu mới' required value={objUpdatePassword.passwordConfirm} onChange={event => setUpdatePassword({ ...objUpdatePassword, passwordConfirm: event.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <button>XÁC NHẬN</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword