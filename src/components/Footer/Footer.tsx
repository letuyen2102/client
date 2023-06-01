/*eslint-disable*/
import React from "react"
import { Link } from "react-router-dom"
import styles from './Footer.module.css'
const Footer: React.FC = (props) => {
    return (
        <div style={{ borderTop: '1px solid #f5f5f5' }}>
            <div className={`container-md ${styles.footer}`}>
                <div className={`row`} style={{ paddingTop: '50px', paddingBottom: '25px' }}>
                    <div className={`col-lg-3 col-md-6 col-sm-12`}>
                        <div className={`${styles.footerBox1}`}>
                            <div className={`${styles.footerBox1_Box1}`}>
                                <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/logo.png?1677145527006" />
                            </div>
                            <div className={`${styles.footerBox1_Box2}`}>
                                <div className={`${styles.footerBox1_Box2_icon}`}>
                                    <i className="fa-sharp fa-solid fa-location-dot" style={{ fontSize: '10px', marginRight: '5px' }}></i>
                                </div>
                                <div className={`${styles.footerBox1_Box2_paragraph}`}>
                                    <p>Công ty TNHH Thời trang và Mỹ phẩm Vĩnh Thịnh</p>
                                    <p>Lô 1/9B, Khu công nghiệp Hoàng Mai, Phường Hoàng Văn Thụ, Quận Hoàng Mai, Hà Nội</p>
                                </div>
                            </div>
                            <div className={`${styles.footerBox1_Box3}`}>
                                <div>
                                    <i className="fa-solid fa-phone" style={{ fontSize: '10px', marginRight: '5px' }}></i>
                                </div>
                                <Link to='tel:0987654321'>0987654321</Link>
                            </div>
                            <div className={`${styles.footerBox1_Box4}`}>
                                <div>
                                    <i className="fa-solid fa-envelope" style={{ fontSize: '10px', marginRight: '5px' }}></i>
                                </div>
                                <div className={`${styles.footerBox1_Box2_paragraph}`}>
                                    <p>letuyen23421xxx@mailsac.com</p>
                                    <p>GPKD: 0101445319</p>
                                    <p>Đăng ký lần đầu: 30/1/2004</p>
                                    <p>Sở Kế hoạch và Đầu tư Tp. Hà Nội</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-lg-3 col-md-6 col-sm-12`}>
                        <div className={`${styles.footerContactAndService}`}>
                            <h2>Thông tin công ty</h2>
                            <ul>
                                <li>
                                    <Link to=''>Trang chủ</Link>
                                </li>
                                <li>
                                    <Link to=''>Giới thiệu</Link>
                                </li>
                                <li>
                                    <Link to=''>Chính sách</Link>
                                </li>
                                <li>
                                    <Link to=''>Chính sách bảo mật</Link>
                                </li>
                            </ul>
                            <div>
                                <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/dathongbao.png?1677145527006" />
                            </div>
                        </div>
                    </div>
                    <div className={`col-lg-3 col-md-6 col-sm-12`}>
                        <div className={`${styles.footerContactAndService}`}>
                            <h2>Dich vụ khách hàng</h2>
                            <ul>
                                <li>
                                    <Link to=''>Hình thức thanh toán</Link>
                                </li>
                                <li>
                                    <Link to=''>Hướng dẫn chọn size</Link>
                                </li>
                                <li>
                                    <Link to=''>Giao hàng</Link>
                                </li>
                                <li>
                                    <Link to=''>Hỗ trợ chỉnh sửa</Link>
                                </li>
                                <li>
                                    <Link to=''>Chính sách đổi trả</Link>
                                </li>
                                <li>
                                    <Link to=''>Hướng dẫn đặt hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`col-lg-3 col-md-6 col-sm-12`}>
                        <div className={`${styles.footerGetInfor}`}>
                            <h2>Đăng kí nhận tin</h2>
                            <p>Điền email để được cập nhật các xu hướng thời trang mới nhất cùng những tin tức KOLS fashion tại đây: </p>
                            <form>
                                <input type='text' placeholder="Email của bạn" />
                                <br />
                                <button>Đăng kí</button>
                            </form>
                            <ul>
                                <li>
                                    <Link to=''>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/facebook.png?1671010643070" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to=''>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/instagram.png?1671418927584" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to=''>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/icon_mess-1.png?1671418927584" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to=''>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/icon_zalo-1.png?1671418927584" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer