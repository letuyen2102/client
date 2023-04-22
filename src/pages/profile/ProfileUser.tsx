import { Link, Route, Routes } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Title from "../../components/Tiltle/Title"
import SideBarProfile from "../../components/sideBarProfile/SideBarProfile"
import styles from '../../components/sideBarProfile/SideBarProfile.module.css'
import SectionProfile from "../../components/SectionProfile/SectionProfile"
import ChangePassword from "../../components/SectionProfile/ChangePassword"
import MyBooking from "../../components/SectionProfile/MyBooking"
const ProfileUser = () => {
    return (
        <div>
            <Header />
            <div style={{ backgroundColor: '#F9FAFA' }}>
                <div className={`${styles.middle} container-lg`}>
                    <Title>
                        <ul>
                            <li>
                                <Link to='/' style={{ whiteSpace: 'pre' }}>Tài khoản  {'>'} </Link>
                            </li>
                            <li>
                                <Link to=''>Thông tin tài khoản</Link>
                            </li>
                        </ul>
                    </Title>
                    <div className="row" style={{ marginTop: '50px' }}>
                        <div className="col-lg-4" style={{ borderRight: '1px dashed rgb(224, 224, 224)' }}>
                            <div>
                                <div style={{ width: '85%' }}>
                                    <SideBarProfile />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div>
                                <div style={{ marginLeft: '10%' }}>
                                    <Routes>
                                        <Route path="/" element={<SectionProfile />} />
                                        <Route path="/change-password" element={<ChangePassword />} />
                                        <Route path="/myOrder" element={<MyBooking />} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProfileUser