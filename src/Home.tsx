/*eslint-disable*/
import { Link } from "react-router-dom"
import BannerShow from "./components/BannerShow/BannerShow"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import styles from './Home.module.css'
import ProductCard from "./components/ProductCard/ProductCard"
import SimpleSlider from "./components/SimpleSlider/SimpleSlider"
const Home = () => {
    return (
        <div>
            <Header />
            <BannerShow />
            <div className={`${styles.Home} container-md ps-lg-5 pe-lg-5`}>
                <div className={`${styles.HomeTitle}`}>
                    <Link to=''>THỜI TRANG MY WAY</Link>
                    <p>Thể hiện những vẻ đẹp, tri thức, văn hóa và ý tưởng của bạn.</p>
                </div>

                <div className={`${styles.showAll}`}>
                    <button>XEM TẤT CẢ THỜI TRANG MY WAY</button>
                </div>
                <div className={`${styles.productContent}`}>
                    <div className={`row`}>
                        <div className={`col-lg-4 col-md-4 col-sm-12 col-12`}>
                            <div className={`${styles.productContentEach} ${styles.setMargin}`}>
                                <div>
                                    <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/ant_index_banner_1.jpg?1677725914475" />
                                </div>
                                <div className={`${styles.productContentEachButton}`}>
                                    <h2>Bộ Sưu Tập</h2>
                                    <Link to='/collection/all'>XEM TẤT CẢ</Link>
                                </div>
                            </div>
                        </div>
                        <div className={`col-lg-4 col-md-4 col-sm-12 col-12`}>
                            <div className={`${styles.productContentEach} ${styles.setMargin}`}>
                                <div>
                                    <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/ant_index_banner_2.jpg?1677725914475" />
                                </div>
                                <div className={`${styles.productContentEachButton}`}>
                                    <h2>Vest</h2>
                                    <Link to='/ao'>XEM TẤT CẢ</Link>
                                </div>
                            </div>
                        </div>
                        <div className={`col-lg-4 col-md-4 col-sm-12 col-12`}>
                            <div className={`${styles.productContentEach} ${styles.setMargin}`}>
                                <div style={{ width: '100%', height: '100%' }}>
                                    <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/ant_index_banner_3.jpg?1677725914475" />
                                </div>
                                <div className={`${styles.productContentEachButton}`}>
                                    <h2>Đầm</h2>
                                    <Link to='/dam'>XEM TẤT CẢ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.HomeTitle}`} style={{ marginTop: '30px' }}>
                    <Link to='/collection/all'>SẢN  PHẨM BÁN CHẠY</Link>
                    <p>Số lượng có hạn - Đừng để bị bỏ lỡ</p>
                </div>
                <div className={`${styles.showAll}`}>
                    <button>XEM TẤT CẢ SẢN PHẨM BÁN CHẠY</button>
                </div>
                <div className={`${styles.homeInforInsta}`}>
                    <h2>INSTAGRAM</h2>
                    <Link to=''>@mywayvn.official</Link>
                    <div>
                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/banner.jpg?1677725914475" alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home