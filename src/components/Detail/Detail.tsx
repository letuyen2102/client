/*eslint-disable*/
import React, { useEffect, useState } from "react"
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
import { addCartNoToken } from "../../slices/authSlice";
import { ITEM } from "../Cart/Cart";
import { handleNotify } from "../../slices/notifySlice";
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
const Detail: React.FC = (props) => {
    const handleCart = useSelector((state: RootState) => state.cart)
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
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
    console.log(handleCart)
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
    useEffect(() => {
        fetch(`/myway/api/products/${slug}`)
            .then(res => res.json())
            .then(data => setProd(data.product))
    }, [])
    useEffect(() => {
        dispatch(defaultTab())
    }, [slug])
    return (
        <div>
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
                                <img src={`/products/${changeImg ? changeImg : prod?.image}`} />
                            </div>
                            <div className={`${styles.productDetailImageSlide}`}>
                                <div>
                                    <Slider {...settings} className="my-slider">
                                        {
                                            prod?.quantity && prod.quantity.map((each, index) => {
                                                return each.imageSlideShows.map((el, idx) => {
                                                    return <div className={styles.carouselSlick} key={idx} onClick={e => setChangeImg(el)}>
                                                        <div className={`${styles.slickSlider}`}>
                                                            <img src={`/products/${el}`} />
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
                                                        <img src={`/products/${prod.quantity[idx].imageSlideShows[0]}`} />
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
                                <button className={`${styles.buying} col-lg-6 col-md-12`}>
                                    MUA NGAY
                                    <br />
                                    Giao hàng tận nơi
                                </button>
                                <button className={`${styles.adding} col-lg-6 col-md-12`} disabled={prod.subQuantity === 0} onClick={e => {
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
                    <div className={`${styles.productReviewsTitle}`}>
                        <button onClick={e => dispatch(setTab(1))}>MÔ TẢ SẢN PHẨM</button>
                        <button onClick={e => dispatch(setTab(2))}>HƯỚNG DẪN CHỌN SIZE</button>
                        <button onClick={e => dispatch(setTab(3))}>ĐÁNH GIÁ SẢN PHẨM</button>
                    </div>
                    <div className={`${styles.productReviewsContent}`}>
                        {
                            1 === handleCart.tab && <div className={`${styles.content1}`}>
                                <p>Chất liệu Gấm nhập khẩu cao cấp đã qua xử lý và tạo form dáng mềm mại, mang lại sự thoải mái cho thượng khách, toát lên vẻ trẻ trung, phong cách hiện đại đầy đẳng cấp</p>
                                <p>Sản phẩm cần giặt khô/tay, tuyệt đối không sử dụng máy giặt, không giặt chung đồ khác màu, tránh dính màu khác...</p>
                                <p>Không nên giặt sản phẩm với xà phòng có chất tẩy mạnh, nên giặt cùng xà phòng pha loãng.</p>
                                <p>Phơi sản phẩm tại chỗ thoáng mát, tránh ánh nắng trực tiếp, nên làm khô quần áo bằng gió sẽ giữ màu vải tốt hơn.</p>
                                <p>Là hơi với nhiệt độ phù hợp để giữ màu sản phẩm được đẹp và bền lâu hơn</p>
                            </div>
                        }
                        {
                            2 === handleCart.tab &&
                            <div className={`${styles.content2}`}>
                                <strong>Quý khách có thể tham khảo bảng thông số size quy chuẩn của My Way để lựa chọn cho mình những sản phẩm có kích thước phù hợp với số đo của mình:</strong>
                                <div className={`${styles.content2Size}`}>
                                    <img src="https://bizweb.dktcdn.net/100/366/518/files/bang-size-chuan-02-d36ef22b-b122-4fe6-9276-fc673e7f3384.jpg?v=1634178971096" />
                                </div>
                            </div>
                        }
                        {
                            3 === handleCart.tab &&
                            <div className={`${styles.content3}`}>
                                <div className={`${styles.ownerComment}`}>
                                    <div className={`${styles.quantityComment}`}>
                                        <p style={{ display: 'inline-block', marginRight: '50px' }}>40 bình luận</p>
                                        <p style={{ display: 'inline-block', cursor: 'pointer' }}>
                                            <i className="fa-light fa-bars-sort" style={{ fontWeight: '600', marginRight: '10px' }}></i>
                                            Sắp xếp theo
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className={`${styles.inputComment}`}>
                                                <div className={`${styles.userImage}`}>
                                                    <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" />
                                                </div>
                                                <input />
                                            </div>
                                            <button style={{ marginTop: '15px', float: 'right', padding: '5px 10px', borderRadius: '30px', border: 'none' }}>Bình luận</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className={styles.allComments}>
                                            <div className={styles.eachComment}>
                                                <div className={`${styles.userImageComment}`}>
                                                    <div>
                                                        <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" />
                                                    </div>
                                                </div>
                                                <div className={`${styles.userCommentContent}`}>
                                                    <div>
                                                        <strong>LeTuyen</strong>
                                                        <p>16/3/2023</p>
                                                    </div>
                                                    <p style={{ wordWrap: 'break-word' }}>ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Detail