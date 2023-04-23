import { useSelector } from 'react-redux'
import styles from './SectionProfile.module.css'
import { RootState } from '../../store/store'

const SectionProfile = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    return (
        <div className='col-lg-10 offset-lg-1'>
            <div className={styles.sectionTitle}>
                <p>Thông tin tài khoản</p>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Họ và tên
                        </label>

                        <input value={handleLoginAndCart.user.name} />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Ngày sinh
                        </label>

                        <input type='date' value={new Date(handleLoginAndCart.user.birthday).toISOString().substr(0, 10)} onChange={event => console.log(event.target.value)} />


                    </div>
                </div>

                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Số điện thoại
                        </label>

                        <input />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Email
                        </label>

                        <input />
                    </div>
                </div>
            </div>
            <div className={styles.gender}>
                <label>
                    Giới tính
                </label>
                <div className={styles.genderRow}>

                    {
                        ["Nam", "Nữ", "Khác"].map((each, idx) => {
                            return <div className={`${styles.genderGroup}`} key={idx}>
                                <div className={each === handleLoginAndCart.user.gender ? `${styles.setBorder} ${styles.borderGender}` : `${styles.borderGender}`}>
                                    <span className={each === handleLoginAndCart.user.gender ? styles.dot : ""}></span>
                                </div>
                                <label>{each}</label>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={styles.sectionAddress}>
                <div className={styles.formGroup}>
                    <label>Địa chỉ</label>
                    <input placeholder='Nhập địa chỉ của bạn' />
                </div>
            </div>

            <div className={styles.formGroup}>
                <button>CẬP NHẬT</button>
            </div>
        </div>
    )
}

export default SectionProfile