/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import styles from './Detail.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from "../Tiltle/Title";
import axios from "axios";
import { RootState } from "../../store/store";
import { decCart, defaultTab, inCart, setDisable, setEnable, setTab, setTabColor, setTabSize } from "../../slices/cartSlice";
import { UserInfor, addCartNoToken } from "../../slices/authSlice";
import { ITEM } from "../Cart/Cart";
import { handleNotify } from "../../slices/notifySlice";
import { hideLoader, showLoader } from "../../slices/loaderSlice";
import Loader from "../loader/Loader";
import { Image, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import moment from "moment";
export interface PRODUCT {
    _id: string;
    name: string;
    description: string;
    oldPrice: number;
    sale: number;
    quantity: {
        color: string;
        colorName: string;
        size: {
            size: string;
            quantity: number;
            // _id: string;
        }[];
        imageSlideShows: string[];
        // _id: string;
    }[];
    image: string;
    category: string;
    categoryName: string;
    subQuantity: number;
    newPrice: number;
    slug: string;
}
export interface CART {
    productId: string,
    quantity: number,
    color: string,
    size: string,
    image: string,
    slug: string,
    newPrice: number,
    name: string
}

interface COMMENT {
    _id: string,
    user: UserInfor,
    product: PRODUCT,
    text: string,
    response: {
        user: UserInfor,
        text: string,
        createAt: string,
        _id: string
    }[],
    createAt: string
}
const Detail: React.FC = (props) => {
    const handleCart = useSelector((state: RootState) => state.cart)
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const handleLoader = useSelector((state: RootState) => state.loader)

    const dispatch = useDispatch()
    const { slug } = useParams()
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5
    };
    const [changeImg, setChangeImg] = useState<string | null>()
    const [prod, setProd] = useState<PRODUCT>({ _id: "", name: "", description: "", oldPrice: 0, sale: 0, quantity: [], image: "", category: "", categoryName: "", subQuantity: 0, newPrice: 0, slug: "" })
    const [comments, setComments] = useState<COMMENT[]>([])
    const [userComment, setUserComment] = useState<{ productId: string, content: string }>({
        productId: '',
        content: ''
    })
    const countRan = useRef(false)
    const [resComment, setResComment] = useState('')
    const [count, setCount] = useState<boolean[]>([])
    const addToCart = async (objCart: ITEM) => {
        if (handleLoginAndCart.token) {
            try {
                const res = await axios.post('/myway/api/carts/createCart', {
                    productId: objCart.product._id,
                    quantity: objCart.quantity,
                    color: objCart.color,
                    colorName: objCart.colorName,
                    size: objCart.size,
                    image: objCart.image
                })
                if (res.data.status === "success") {
                    dispatch(handleNotify({ message: "Thêm sản phẩm vào giỏ hàng thành công", show: true, status: 200 }))
                    setTimeout(() => {
                        dispatch(handleNotify({ message: "", show: false, status: 0 }))
                    }, 2000)
                }
            }
            catch (err: any) {
                dispatch(handleNotify({ message: "Đã có lỗi xảy ra", show: true, status: 400 }))
                setTimeout(() => {
                    dispatch(handleNotify({ message: "", show: false, status: 0 }))
                }, 2000)
            }
        }
        else {
            try {
                dispatch(addCartNoToken(objCart))
                dispatch(handleNotify({ message: "Thêm sản phẩm vào giỏ hàng thành công", show: true, status: 200 }))
                setTimeout(() => {
                    dispatch(handleNotify({ message: "", show: false, status: 0 }))
                }, 2000)
            }
            catch (err: any) {
                dispatch(handleNotify({ message: "Đã có lỗi xảy ra", show: true, status: 400 }))
                setTimeout(() => {
                    dispatch(handleNotify({ message: "", show: false, status: 0 }))
                }, 2000)
            }
        }
    }

    const createComment = async (productId: string, text: string) => {
        try {
            const res = await axios.post('/myway/api/reviews/', { product: productId, text })
            if (res.data.status === 'success') {
                setComments(prev => {
                    const newState = [...prev]

                    newState.push(res.data.review)

                    return newState
                })
            }
        }
        catch (err) {
            alert("có lỗi")
            console.log(err)
        }
    }
    const deleteComment = async (idCmt: string) => {
        try {
            const res = await axios.delete(`/myway/api/reviews/${idCmt}`)
            setComments(prev => {
                const newState = [...prev].filter(el => el._id !== idCmt)
                return newState
            })
        }
        catch (err) {
            alert("có lỗi")
            console.log(err)
        }
    }
    const replyComment = async (idCmt: string, text: string) => {
        try {
            const res = await axios.post(`/myway/api/reviews/comments/${idCmt}`, { text })
            if (res.data.status === 'success') {
                setComments(prev => {
                    if (countRan.current === false) {
                        const newState = [...prev]
                        newState.forEach((each, idx) => {
                            if (each._id === idCmt) {
                                each.response = [...each.response, res.data.newResponse]
                            }
                        })
                        countRan.current = true
                        return newState
                    }
                    else {
                        return prev
                    }

                })
            }
        }
        catch (err) {
            alert("có lỗi")
            console.log(err)
        }
    }
    const deleteResponse = async (idCmt: string, idRes: string) => {
        try {
            const res = await axios.delete(`/myway/api/reviews/${idCmt}/${idRes}`)
            console.log(res)
            setComments(prev => {
                const newState = [...prev]
                newState.forEach(el => {
                    if (el._id === idCmt) {
                        el.response = el.response.filter(el2 => {
                            return el2._id !== idRes
                        })
                    }
                })
                return newState
            })
        }
        catch (err) {
            alert("có lỗi")
            console.log(err)
        }
    }
    useEffect(() => {
        const getProductDetail = async () => {
            await fetch(`/myway/api/products/${slug}`)
                .then(res => res.json())
                .then(data => setProd(data.product))
            dispatch(showLoader())
        }
        const getAllComments = async () => {
            await fetch(`/myway/api/reviews`)
                .then(res => res.json())
                .then(data => {
                    setComments(data.reviews)
                    setCount(Array(data.reviews.length).fill(false))
                })
        }
        getProductDetail()
        getAllComments()
    }, [])
    useEffect(() => {
        dispatch(defaultTab())
    }, [slug])
    return (
        <div>
            {handleLoader.loader && <Loader />}
            <Title>
                <ul>
                    <li>
                        <Link to='/' style={{ whiteSpace: 'pre' }}>Trang chủ  {'>'} </Link>
                    </li>
                    <li>
                        <Link to=''>{prod?.name}</Link>
                    </li>
                </ul>
            </Title>
            <div className={`container-md ${styles.detailPage}`} style={{ marginTop: '30px' }}>
                <div className={`${styles.productDetail}`}>
                    <div className={`row`}>
                        <div className={`${styles.productDetailImage} col-lg-6 col-md-6`}>
                            <div className={`${styles.productDetailImageMain}`}>
                                <img src={`${changeImg ? changeImg : prod?.image}`} />
                            </div>
                            <div className={`${styles.productDetailImageSlide}`}>
                                <div>
                                    <Slider {...settings} className="my-slider">
                                        {
                                            prod?.quantity && prod.quantity.map((each, index) => {
                                                return each.imageSlideShows.map((el, idx) => {
                                                    return <div className={styles.carouselSlick} key={idx} onClick={e => setChangeImg(el)}>
                                                        <div className={`${styles.slickSlider}`}>
                                                            <img src={`${el}`} />
                                                        </div>
                                                    </div>
                                                })
                                            })
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.productDetailAll} col-lg-6 col-md-6`}>
                            <h2 className={`${styles.productName}`}>{prod?.name}</h2>
                            <p className={`${styles.productId}`}>MASP : <i>{prod?._id}</i></p>
                            <div className={`${styles.review}`}>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <Link to=''>Đánh giá</Link>
                            </div>
                            <p className={`${styles.price}`}><del>{prod?.oldPrice.toLocaleString('vi-VN')}₫</del> <h2>{prod?.newPrice.toLocaleString('vi-VN')}₫</h2></p>
                            <p className={`${styles.status}`}>Tình trạng : {prod?.subQuantity && prod.subQuantity > 0 ? <p>Còn hàng</p> : <p>Hết hàng</p>}</p>
                            <div className={`${styles.colorOrder}`}>
                                <p>Màu sắc : </p>
                                <div className={styles.allColor}>
                                    {
                                        prod?.quantity && prod.quantity.map((el, idx) => {
                                            return (
                                                <div key={idx} className={handleCart.tabColor === idx ? `${styles.setBorder}` : `${styles.setUnBorder}`} onClick={e => {
                                                    // setTabColor(idx)
                                                    dispatch(setTabColor(idx))
                                                    setChangeImg(prod.quantity[idx].imageSlideShows[0])
                                                }}>
                                                    <div className={styles.colorOderImage}>
                                                        <img src={`${prod.quantity[idx].imageSlideShows[0]}`} />
                                                    </div>
                                                    <p>{el.colorName}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={`${styles.size}`}>
                                <p>Kích thước : </p>
                                <div>
                                    {
                                        prod.quantity[handleCart.tabColor]?.size.map((each, index) => {
                                            if (each.quantity > 0) {
                                                return (
                                                    <button key={index} className={handleCart.tabSize === index ? `${styles.setBorderButton}` : `${styles.setUnBorderButton}`} onClick={e => { dispatch(setTabSize(index)) }}>{each.size}</button>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className={`${styles.quantity}`}>
                                <p>Số lượng :</p>
                                {prod.subQuantity && prod.subQuantity > 0 ? <div>
                                    <button onClick={e => {
                                        if (handleCart.tabSize === null) {
                                            alert("Vui lòng chọn size")
                                            return
                                        }
                                        if (handleCart.tabSize && (handleCart.orderQuantity <= prod.quantity[handleCart.tabColor].size[handleCart.tabSize].quantity)) {
                                            dispatch(setEnable())
                                        }
                                        dispatch(decCart())
                                    }}>-</button>
                                    <input disabled
                                        value={handleCart.orderQuantity}
                                        style={{ backgroundColor: '#fff' }}
                                        onChange={e => {
                                        }} />
                                    <button
                                        disabled={handleCart.disableBtn}
                                        onClick={e => {
                                            if (handleCart.tabSize === null) {
                                                alert("Vui lòng chọn size")
                                                return
                                            }
                                            if ((handleCart.orderQuantity >= prod.quantity[handleCart.tabColor].size[handleCart.tabSize || 0].quantity)) {
                                                dispatch(setDisable())
                                                return
                                            }
                                            dispatch(inCart())
                                        }}
                                    >+</button>
                                </div> : <div></div>}
                            </div>
                            <div className="row">
                                <button className={`${styles.buying} col-lg-6 col-md-6 col-sm-6 col-6`}>
                                    MUA NGAY
                                    <br />
                                    Giao hàng tận nơi
                                </button>
                                <button className={`${styles.adding} col-lg-6 col-md-6 col-sm-6 col-6`} disabled={prod.subQuantity === 0} onClick={e => {
                                    if (handleCart.tabSize === null) {
                                        alert("Vui lòng chọn size")
                                        return
                                    }
                                    addToCart({
                                        product: prod,
                                        quantity: handleCart.orderQuantity,
                                        color: prod.quantity[handleCart.tabColor].color,
                                        colorName: prod.quantity[handleCart.tabColor].colorName,
                                        size: prod.quantity[handleCart.tabColor].size[handleCart.tabSize || 0].size,
                                        image: prod.quantity[handleCart.tabColor].imageSlideShows[0]
                                    })
                                    dispatch(defaultTab())


                                }}>
                                    THÊM VÀO GIỎ HÀNG
                                </button>
                            </div>
                            <ul>
                                <li>
                                    <div>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/policy_images_1.svg?1677725914475" />
                                    </div>
                                    <strong>THANH TOÁN DỄ DÀNG VÀ BẢO MẬT</strong>
                                </li>
                                <li>
                                    <div>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/policy_images_2.svg?1677725914475" />
                                    </div>
                                    <strong>MIỄN PHÍ VẬN CHUYỂN VỚI ĐƠN HÀNG THANH TOÁN ONLINE</strong>
                                </li>
                                <li>
                                    <div>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/policy_images_3.svg?1677725914475" />
                                    </div>
                                    <strong>HỖ TRỢ ĐỔI TRONG 7 NGÀY CHO MỌI SẢN PHẨM</strong>
                                </li>
                                <li>
                                    <div>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/themes/740709/assets/policy_images_4.svg?1677725914475" />
                                    </div>
                                    <strong>HỖ TRỢ ĐỔI TRONG 7 NGÀY CHO MỌI SẢN PHẨM</strong>
                                </li>
                            </ul>
                            <div className={`${styles.supportBuying}`} style={{ marginTop: '30px' }}>
                                <i>Cần hỗ trợ mua hàng ?</i>
                                <div>
                                    <i className="fa-solid fa-phone"></i>
                                    <i>Gọi ngay để được tư vấn miễn phí qua hotline hoặc Zalo số  <strong>0862.278.465</strong> (8:30 - 22:00).</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.productReviews}`}>
                    <Tabs isLazy>
                        <TabList>
                            <Tab _selected={{ color: '#ec1f27' }} className={styles.tabBtn}>Mô tả sản phẩm</Tab>
                            <Tab _selected={{ color: '#ec1f27' }} className={styles.tabBtn}>Hướng dẫn chọn size</Tab>
                            <Tab _selected={{ color: '#ec1f27' }} className={styles.tabBtn}>Bình luận</Tab>

                        </TabList>
                        <TabPanels>
                            {/* initially mounted */}
                            <TabPanel>
                                <div className={`${styles.content1}`}>
                                    <p>Chất liệu Gấm nhập khẩu cao cấp đã qua xử lý và tạo form dáng mềm mại, mang lại sự thoải mái cho thượng khách, toát lên vẻ trẻ trung, phong cách hiện đại đầy đẳng cấp</p>
                                    <p>Sản phẩm cần giặt khô/tay, tuyệt đối không sử dụng máy giặt, không giặt chung đồ khác màu, tránh dính màu khác...</p>
                                    <p>Không nên giặt sản phẩm với xà phòng có chất tẩy mạnh, nên giặt cùng xà phòng pha loãng.</p>
                                    <p>Phơi sản phẩm tại chỗ thoáng mát, tránh ánh nắng trực tiếp, nên làm khô quần áo bằng gió sẽ giữ màu vải tốt hơn.</p>
                                    <p>Là hơi với nhiệt độ phù hợp để giữ màu sản phẩm được đẹp và bền lâu hơn</p>
                                </div>
                            </TabPanel>
                            {/* initially not mounted */}
                            <TabPanel>
                                <div className={`${styles.content2}`}>
                                    <strong>Quý khách có thể tham khảo bảng thông số size quy chuẩn của My Way để lựa chọn cho mình những sản phẩm có kích thước phù hợp với số đo của mình:</strong>
                                    <div className={`${styles.content2Size}`}>
                                        <img src="https://bizweb.dktcdn.net/100/366/518/files/bang-size-chuan-02-d36ef22b-b122-4fe6-9276-fc673e7f3384.jpg?v=1634178971096" />
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className={`${styles.content3}`}>
                                    <div className={`${styles.ownerComment}`}>
                                        <div className={`${styles.quantityComment}`}>
                                            <p style={{ display: 'inline-block', marginRight: '50px' }}>{comments.length} bình luận</p>
                                            <p style={{ display: 'inline-block', cursor: 'pointer' }}>
                                                <i className="fa-light fa-bars-sort" style={{ fontWeight: '600', marginRight: '10px' }}></i>
                                                Sắp xếp theo
                                            </p>
                                        </div>
                                        <div className="row">
                                            {handleLoginAndCart.token ? <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className={`${styles.inputComment}`}>
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize='40px'
                                                        src='https://res.cloudinary.com/dalz888e7/image/upload/v1684910195/my_image_user/default-user.jpg.jpg'
                                                        alt='Dan Abramov'
                                                        marginRight='5px'
                                                    />
                                                    <input value={userComment.content} onChange={event => setUserComment({ ...userComment, content: event.target.value })} />
                                                </div>
                                                <button
                                                    style={{ marginTop: '15px', float: 'right', padding: '5px 10px', borderRadius: '30px', border: 'none' }}
                                                    onClick={event => {
                                                        createComment(prod._id, userComment.content)
                                                    }}
                                                >Bình luận</button>
                                            </div> : <div style={{ textAlign: 'center', height: '60px', lineHeight: '60px' }}>
                                                Hãy <Link to='/account/login' style={{ color: '#ec1f27' }}>đăng nhập </Link>để bình luận
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className={styles.allComments}>
                                                {
                                                    comments && comments.length > 0
                                                    && comments.map((comment, idx) => {
                                                        return <div className={styles.eachComment} key={idx}>
                                                            <div className={`${styles.userCommentContent}`}>
                                                                <Image
                                                                    borderRadius='full'
                                                                    boxSize='40px'
                                                                    src={comment.user.photo}
                                                                    alt={comment.user.name}
                                                                    marginRight='20px'
                                                                />
                                                                <div>
                                                                    <strong>{comment.user.name}</strong>
                                                                    <p>{moment(comment.createAt).format('DD/MM/YYYY')}</p>
                                                                </div>
                                                                {
                                                                    comment.user._id === handleLoginAndCart.user._id && <div className={styles.editComment}>
                                                                        <button onClick={() => deleteComment(comment._id)}>Xóa</button>
                                                                        {/* <button>Chỉnh sửa</button> */}
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div>
                                                                <p style={{ marginLeft: '60px' }}>{comment.text}</p>
                                                            </div>
                                                            <div style={{ marginLeft: '60px' }}>
                                                                <button style={{ color: '#00b156' }} onClick={event => {
                                                                    setCount(prev => {
                                                                        const newState = [...prev]
                                                                        newState.fill(false)
                                                                        newState[idx] = true
                                                                        return newState
                                                                    })
                                                                }}>Trả lời</button>
                                                                {count[idx] && <div style={{ marginBottom: '25px' }}>
                                                                    <div className={`${styles.inputComment}`}>
                                                                        <Image
                                                                            borderRadius='full'
                                                                            boxSize='40px'
                                                                            src='https://res.cloudinary.com/dalz888e7/image/upload/v1684910195/my_image_user/default-user.jpg.jpg'
                                                                            alt='Dan Abramov'
                                                                            marginRight='5px'
                                                                        />
                                                                        <input value={resComment} onChange={event => setResComment(event.target.value)} />
                                                                    </div>
                                                                    <button
                                                                        style={{ marginTop: '15px', float: 'right', padding: '5px 10px', borderRadius: '30px', border: 'none' }}
                                                                        onClick={event => {
                                                                            setCount(prev => {
                                                                                const newState = [...prev]
                                                                                newState[idx] = false
                                                                                return newState
                                                                            })
                                                                        }}
                                                                    >Hủy</button>
                                                                    <button
                                                                        style={{ marginTop: '15px', float: 'right', padding: '5px 10px', borderRadius: '30px', border: 'none' }}
                                                                        onClick={event => {
                                                                            replyComment(comment._id, resComment)
                                                                        }}
                                                                    >Bình luận</button>
                                                                </div>}
                                                            </div>
                                                            {
                                                                comment.response && comment.response.length > 0
                                                                && comment.response.map((res, index) => {
                                                                    return <div className={styles.eachComment} style={{ marginLeft: '60px', marginTop: '10px' }}>
                                                                        <div className={`${styles.userCommentContent}`}>
                                                                            <Image
                                                                                borderRadius='full'
                                                                                boxSize='40px'
                                                                                src={res.user.photo}
                                                                                alt={res.user.name}
                                                                                marginRight='20px'
                                                                            />
                                                                            <div>
                                                                                <strong>{res.user.name}</strong>
                                                                                <p>{moment(res.createAt).format('DD/MM/YYYY')}</p>
                                                                            </div>
                                                                            {
                                                                                res.user._id === handleLoginAndCart.user._id && <div className={styles.editComment}>
                                                                                    <button onClick={event => {
                                                                                        deleteResponse(comment._id, res._id)
                                                                                    }}>Xóa</button>
                                                                                    {/* <button>Chỉnh sửa</button> */}
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            <p style={{ marginLeft: '60px' }}>{res.text}</p>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
export default Detail