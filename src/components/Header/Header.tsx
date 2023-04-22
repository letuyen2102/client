/*eslint-disable*/
import axios from "axios"
import React, {useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavigateFunction, useNavigate, useLocation } from 'react-router-dom'
import { RootState } from "../../store/store"
import styles from './Header.module.css'
const Header: React.FC = (props) => {
    const dispatch = useDispatch()
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const location = useLocation();
    const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false)
    return (
        <div>
            <div className={`${styles.HeaderTop} container-lg`}>
                {
                    showMenuMobile && <div className={`${styles.modalMenu}`} onClick={e => setShowMenuMobile(false)}>
                        <div className={`${styles.HeaderModalMenu}`} onClick={e => e.stopPropagation()}>
                            <ul className={`${styles.ul1}`}>
                                <li>
                                    <Link to='/'>Trang Chủ</Link>
                                </li>
                                <li>
                                    <Link to=''>Thời Trang</Link>
                                    <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                                </li>
                                <li>
                                    <Link to=''>Mua Sắm Theo Dịp</Link>
                                    <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                                </li>
                                <li>
                                    <Link to=''>Bộ Sưu Tập</Link>
                                    <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                                </li>
                                <li>
                                    <Link to=''>Tin Tức</Link>
                                    <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                                </li>
                                <li>
                                    <Link to=''>Liên Hệ</Link>
                                    <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                                </li>
                                <li>
                                    <Link to='/account/login' onClick={e => setShowMenuMobile(false)}>Đăng Nhập</Link>
                                </li>
                                <li>
                                    <Link to='/account/signup' onClick={e => setShowMenuMobile(false)}>Đăng Kí</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
                <div className={`row`}>
                    <div className={`col-lg-4 col-md-4 col-sm-4 col-4`} style={{ display: 'flex' }}>
                        <div className={`${styles.HeaderTopContact}`}>
                            <h2>Hotline : </h2>
                            <Link to='tel:0987654321'>0987654321</Link>
                        </div>
                        <div className={`${styles.HeaderTopMenu}`} onClick={e => setShowMenuMobile(true)}>
                            <i className="fa-regular fa-bars"></i>
                        </div>

                    </div>
                    <div className={`col-lg-4 col-md-4 col-sm-4 col-4`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={`${styles.HeaderTopLogo}`}>
                            <Link to='/'>
                                <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/logo.png?1677145527006" />
                            </Link>
                        </div>
                    </div>
                    <div className={`col-lg-4 col-md-4 col-sm-4 col-4`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                        <div className={`${styles.HeaderTopAccount}`}>
                            <div className={`${styles.HeaderTopAccount_Account}`}>
                                
                                {
                                    handleLoginAndCart.token ? <Link to={'/profile'} className={`${styles.setDisplay}`}>Tài khoản</Link> :
                                    <Link to={'/account/login'} className={`${styles.setDisplay}`}>Tài khoản</Link>
                                }
                            </div>
                            <div className={`${styles.HeaderTopAccount_Cart}`}>
                                <Link to='/cart'>
                                    <p className={`${styles.setDisplay}`}>Giỏ hàng</p>
                                    <i className="fa-solid fa-cart-arrow-down"></i>
                                    {/* <span>5</span> */}
                                </Link>

                            </div>
                            <div className={`${styles.HeaderTopAccount_Search}`}>
                                <Link to=''>
                                    <i className="fa-regular fa-magnifying-glass"></i>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.HeaderBottom} container-md ps-lg-5 pe-lg-5`}>
                <div>
                    <ul className={`${styles.HeaderBottomUl}`}>
                        <li>
                            <Link to='/'>Trang chủ</Link>
                        </li>
                        <li>
                            <Link to='/collection/all'>
                                Thời trang
                                <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                            </Link>
                            <ul className={`${styles.ul1}`}>
                                <li>
                                    <Link to='/dam'>
                                        Đầm
                                        <i className={`fa-regular fa-angle-right ${styles.iconAngleDown}`}></i>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to=''>Đầm xòe</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Đầm ôm</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Đầm maxi</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to='/ao'>
                                        Áo
                                        <i className={`fa-regular fa-angle-right ${styles.iconAngleDown}`}></i>

                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to=''>Áo sơ mi</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Áo kiểu</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Áo vest</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Áo khoác</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Áo dài</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to='/quan'>
                                        Quần
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/chan-vay'>
                                        Chân váy
                                        <i className={`fa-regular fa-angle-right ${styles.iconAngleDown}`}></i>

                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to=''>Chân váy ôm</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Chân váy dài</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to='/jumpsuit'>
                                        Jumpsuit
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to=''>
                                Mua sắm theo dịp
                                <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                            </Link>
                            <ul className={`${styles.ul1}`}>
                                <li>
                                    <Link to=''>
                                        Thời trang công sở
                                        <i className={`fa-regular fa-angle-right ${styles.iconAngleDown}`}></i>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to=''>Đầm công sở</Link>
                                        </li>
                                        <li>
                                            <Link to=''>Áo công sở</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to=''>Tiệc-Sự kiện</Link>
                                </li>
                                <li>
                                    <Link to=''>Dạo phố</Link>
                                </li>
                                <li>
                                    <Link to=''>Váy cưới</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to=''>
                                Bộ sưu tập
                                <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                            </Link>
                            <ul>
                                <li>
                                    <Link to=''>Thời trang cao cấp Xuân-Hè 2023</Link>
                                </li>
                                <li>
                                    <Link to=''>Thời trang cao cấp Thu-Đông 2022</Link>
                                </li>
                                <li>
                                    <Link to=''>Thời trang cao cấp Xuân-Hè 2022</Link>
                                </li>
                                <li>
                                    <Link to=''>Thời trang cao cấp Thu-Đông 2021</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to=''>
                                Tin tức
                                <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                            </Link>
                            <ul className={`${styles.ul1}`}>
                                <li>
                                    <Link to=''>Out client</Link>
                                </li>
                                <li>
                                    <Link to=''>
                                        MY WAY news
                                        <i className={`fa-regular fa-angle-right ${styles.iconAngleDown}`}></i>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to=''>Thông tin liên hệ</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to=''>Chất liệu</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to=''>
                                Liên hệ
                                <i className={`fa-solid fa-angle-down ${styles.iconAngleDown}`}></i>
                            </Link>
                            <ul>
                                <li>
                                    <Link to=''>Thông tin liên hệ</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header