/*eslint-disable*/
import axios from "axios"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavigateFunction, useNavigate, useLocation } from 'react-router-dom'
import { RootState } from "../../store/store"
import styles from './Header.module.css'
import { logout } from "../../slices/authSlice"
import { Button, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, chakra, useDisclosure } from "@chakra-ui/react"
import SearchCard from "../searchCard/SearchCard"
import { PRODUCT } from "../Detail/Detail"

const Header: React.FC = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false)
    const [prodSearch, setProdSearch] = useState<PRODUCT[]>()
    const [spinerLoad, setSpiner] = useState(false)
    const handleLogout = async () => {
        try {
            const res = await axios.get('/myway/api/users/logout')
            if (res.data.status === "success") {
                dispatch(logout())
                navigate('/account/login')
            }
        }
        catch (err: any) {
            alert(err.response.data)
        }
    }
    const handleSearch = async (text: string) => {
        try {
            // setSpiner(true)
            const res = await axios.post(`/myway/api/products/search`, { query: text })
            if (res.data.status === 'success') {
                setProdSearch(res.data.products)
            }
            // setSpiner(false)


        }
        catch (err) {
            alert("có lỗi xảy ra ")
            console.log(err)
        }
    }
    return (
        <div>
            <div className={`${styles.HeaderTop} container-lg`}>
                {
                    showMenuMobile && <div className={`${styles.modalMenu}`} onClick={e => setShowMenuMobile(false)}>
                        <div className={`${styles.HeaderModalMenu}`} onClick={e => e.stopPropagation()}>
                            <ul className={`${styles.ul1}`}>
                                <li>
                                    <a href='/'>Trang Chủ</a>
                                </li>
                                <li>
                                    <a href='/collection/all'>Thời Trang</a>
                                </li>
                                <li>
                                    <a href='/collection/all'>Mua Sắm Theo Dịp</a>
                                </li>
                                <li>
                                    <a href='/collection/all'>Bộ Sưu Tập</a>
                                </li>
                                <li>
                                    <Link to=''>Tin Tức</Link>
                                </li>
                                <li>
                                    <Link to=''>Liên Hệ</Link>
                                </li>
                                {!handleLoginAndCart.token ?
                                    <>
                                        <li>
                                            <Link to='/account/login' onClick={e => setShowMenuMobile(false)}>Đăng Nhập</Link>
                                        </li>
                                        <li>
                                            <Link to='/account/signup' onClick={e => setShowMenuMobile(false)}>Đăng Kí</Link>
                                        </li>
                                    </> : <>
                                        <li>
                                            <Link to='/profile/account/user' onClick={e => setShowMenuMobile(false)}>Profile</Link>
                                        </li>
                                        <li>
                                            <Link to='/profile/account/user/change-password' onClick={e => setShowMenuMobile(false)}>Đổi mật khẩu</Link>
                                        </li>
                                        <li>
                                            <Link to='/profile/account/user/myOrder' onClick={e => setShowMenuMobile(false)}>Đơn hàng</Link>
                                        </li>
                                        <li>
                                            <Link to='' onClick={e => {
                                                handleLogout()
                                                setShowMenuMobile(false)
                                            }}>Đăng xuất</Link>
                                        </li>
                                    </>
                                }
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
                                    // handleLoginAndCart.token ? <Link to={'/profile/account/user'} className={`${styles.setDisplay}`}>Tài khoản</Link> :
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
                                {/* <Link to=''>
                                    <i className="fa-regular fa-magnifying-glass"></i>
                                </Link> */}
                                <>
                                    <Link to='' onClick={onOpen}>
                                        <i className="fa-regular fa-magnifying-glass"></i>
                                    </Link>
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent marginTop={"0px"} borderRadius={'0px'}>
                                            <ModalHeader>Tìm kiếm sản phẩm</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                {/* <Input placeholder='Search ...' /> */}
                                                <FormControl style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Input type='email' placeholder="Tìm kiếm sản phẩm ..." onChange={event => {

                                                        setTimeout(() => {
                                                            handleSearch(event.target.value)
                                                        }, 1000)

                                                    }} />
                                                    <Button
                                                        marginLeft='10px'
                                                        colorScheme='teal'
                                                        type='submit'
                                                    // float='right'
                                                    >
                                                        Tìm
                                                    </Button>
                                                </FormControl>
                                            </ModalBody>
                                            <ModalBody maxHeight='300px' overflowY='scroll'>
                                                {/* <div style={{ padding: '5px 0px', marginBottom: '5px' }}>
                                                    <SearchCard></SearchCard>
                                                </div> */}
                                                <div>
                                                    {
                                                        prodSearch && prodSearch.length > 0
                                                        && prodSearch.map((el, idx) => {
                                                            return <div style={{ padding: '5px 0px', marginBottom: '5px' }} key={idx}>
                                                                <SearchCard image={el.image} name={el.name} slug={el.slug}></SearchCard>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                                {spinerLoad && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Spinner />
                                                </div>}

                                            </ModalBody>
                                        </ModalContent>

                                        {/* <div style={{ width: '400px', height: '400px', backgroundColor: 'red' }}>

                                        </div> */}
                                    </Modal>
                                </>
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
                            </Link>
                            {/* <ul className={`${styles.ul1}`}>
                                <li>
                                    <Link to=''>
                                        Đầm
                                    </Link>
                                </li>
                                <li>
                                    <Link to=''>
                                        Áo
                                    </Link>
                                </li>
                                <li>
                                    <Link to=''>
                                        Quần
                                    </Link>
                                </li>
                                <li>
                                    <Link to=''>
                                        Chân váy
                                    </Link>
                                </li>
                                <li>
                                    <Link to=''>
                                        Jumpsuit
                                    </Link>
                                </li>
                            </ul> */}
                        </li>
                        <li>
                            <Link to='/collection/all'>
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
                            <Link to='/collection/all'>
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