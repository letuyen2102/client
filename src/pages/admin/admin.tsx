/*eslint-disable*/
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from './admin.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
const Admin: React.FC<{ children: React.ReactNode }> = (props) => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    return (
        <div className='container-fluid'>
            <div className={styles.admin}>
                <div className='row'>
                    <div className={`col-lg-2 ${styles.sidebarAdmin}`}>
                        <div>
                            <div className={styles.imageAdmin}>
                                <div>
                                    <img src={`/users/${handleLoginAndCart.user.photo}`} />
                                </div>
                                <p>Chào Admin</p>
                            </div>

                            <div className={styles.listOptions}>
                                <ul>
                                    <li>
                                        <i className="fa-light fa-house-chimney"></i>
                                        <Link to=''>Dashboard</Link>
                                    </li>
                                    <li>
                                        <i className="fa-thin fa-people-simple"></i>
                                        <Link to=''>Khách hàng</Link>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-list"></i>
                                        <Link to='/myway/admin/product'>Sản phẩm</Link>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-list"></i>
                                        <Link to='/myway/admin/categories'>Danh mục sản phẩm</Link>
                                    </li>
                                    <li>
                                        <i className="fa-duotone fa-list"></i>
                                        <Link to=''>order</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`col-lg-10 ${styles.contentWithSidebar}`}>
                        <div className={styles.adminLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </div>
                        {
                            props.children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
