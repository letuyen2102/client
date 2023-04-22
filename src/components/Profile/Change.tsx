/*eslint-disable*/
import axios from "axios"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './Change.module.css'
interface UPDATE {
    passwordCurrent: string,
    password: string,
    passwordConfirm: string
}
const Change = () => {
    const navigate = useNavigate()
    const [updatePassword, setUpdatePassword] = useState({
        passwordCurrent: '',
        password: '',
        passwordConfirm: ''
    })
    const handleUpdatePassword = async (objUpdate: UPDATE) => {
        try {
            const res = await axios.patch('/myway/api/users/updateMyPassword', objUpdate)
            if ( res.data.status === "success") {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                navigate('/account/login')
            }
        }
        catch(err){

        }
    }
    return (
        <div className={styles.Change}>
            <div className={`row`}>
                <div className={`col-lg-6`}>
                    <form className={styles.formControl}>
                        <strong>Thay đổi mật khẩu</strong>
                        <div className={styles.formGroup} style={{ marginTop: '10px' }}>
                            <label htmlFor="oldPassword">Mật khẩu hiện tại:</label>
                            <input type='password' placeholder="Nhập mật khẩu cũ" id='oldPassword' value={updatePassword.passwordCurrent} onChange={e => setUpdatePassword({ ...updatePassword, passwordCurrent: e.target.value })} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="newPassword">Mật khẩu mới:</label>
                            <input type='password' placeholder="Nhập mật mới" id='newPassword' value={updatePassword.password} onChange={e => setUpdatePassword({ ...updatePassword, password: e.target.value })} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Mật khẩu hiện tại:</label>
                            <input type='password' placeholder="Xác nhận lại mật khẩu" id='confirmPassword' value={updatePassword.passwordConfirm} onChange={e => setUpdatePassword({ ...updatePassword, passwordConfirm: e.target.value })} required />
                        </div>
                        <button onClick={e => {e.preventDefault() , handleUpdatePassword(updatePassword)}}>Cập nhật</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Change