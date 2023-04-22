import styles from './ChangePassword.module.css'

const ChangePassword = () => {
    return (
        <div>
            <div className={styles.sectionTitle}>
                <p>Thay đổi mật khẩu</p>
            </div>

            <form>
                <div className={styles.formGroup}>
                    <label>Mật khẩu hiện tại</label>
                    <input type='password' placeholder='Nhập mật khẩu cũ' required />
                </div>
                <div className={styles.formGroup}>
                    <label>Mật khẩu mới</label>
                    <input type='password' placeholder='Nhập mật mới' required />
                </div>
                <div className={styles.formGroup}>
                    <label>Nhập lại mật khẩu</label>
                    <input type='password' placeholder='Nhập lại mật khẩu mới' required />
                </div>
                <div className={styles.formGroup}>
                    <button>XÁC NHẬN</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword