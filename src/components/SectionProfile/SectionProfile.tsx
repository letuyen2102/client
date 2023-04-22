import styles from './SectionProfile.module.css'

const SectionProfile = () => {
    return (
        <div>
            <div className={styles.sectionTitle}>
                <p>Thông tin tài khoản</p>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Họ và tên
                        </label>

                        <input />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className={styles.formGroup}>
                        <label>
                            Ngày sinh
                        </label>

                        <input type='datetime-local' />
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
                    <div className={`${styles.genderGroup}`}>
                        <div className={`${styles.setBorder} ${styles.borderGender}`}>
                            <span className={styles.dot}></span>
                        </div>
                        <label>Nam</label>
                    </div>
                    <div className={styles.genderGroup}>
                        <div className={styles.borderGender}>
                            <span></span>
                        </div>
                        <label>Nữ</label>
                    </div>
                    <div className={styles.genderGroup}>
                        <div className={styles.borderGender}>
                            <span></span>
                        </div>
                        <label>Khác</label>
                    </div>
                </div>
            </div>
            <div className={styles.sectionAddress}>
                <div className={styles.formGroup}>
                    <label>Số nhà + Tên đường</label>
                    <input placeholder='Nhập số nhà và tên đường' />
                </div>
            </div>

            <div className={styles.formGroup}>
                <button>CẬP NHẬT</button>
            </div>
        </div>
    )
}

export default SectionProfile