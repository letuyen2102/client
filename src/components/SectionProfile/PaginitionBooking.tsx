import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { PRODUCT } from '../Detail/Detail';
import { UserInfor, login } from '../../slices/authSlice';
import styles from './MyBooking.module.css'
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { handleNotify } from '../../slices/notifySlice';
import { Image } from '@chakra-ui/react';
import { RootState } from '../../store/store';
import Loader from '../loader/Loader';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
export interface PRODORDER {
    product: PRODUCT
    quantity: number,
    color: string,
    colorName: string,
    size: string,
    image: string,
    total: number
}
export interface ORDER {
    _id: string,
    user: UserInfor,
    name: string,
    email: string,
    address: string,
    phone: string,
    note: string,
    products: PRODORDER[],
    method: string,
    orderId: string,
    status: string,
    createAt: string,
    subTotal: number,
    paymentCardName: string
}
function Items({ currentItems }: { currentItems: ORDER[] }) {
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)
    const [items, setItems] = useState<ORDER[]>(currentItems)
    const cancelOrder = async (idBooking: string) => {
        try {
            const res = await axios.patch(`/myway/api/bookings/userCancelBooking/${idBooking}`)
            if (res.data.status === "success") {
                setItems(prev => {
                    const newState = [...prev]

                    newState.forEach((each, idx) => {
                        if (each._id === idBooking) {
                            each.status = 'required'
                        }
                    })

                    return newState
                })
                dispatch(handleNotify({ message: "Đơn hàng đang chờ hủy", show: true, status: 200 }))
                setTimeout(() => {
                    dispatch(handleNotify({ message: "", show: false, status: 0 }))
                }, 1500)
            }
        }
        catch (err) {
            dispatch(handleNotify({ message: "Hủy đơn hàng thất bại !", show: true, status: 400 }))
            setTimeout(() => {
                dispatch(handleNotify({ message: "", show: false, status: 0 }))
            }, 1500)
        }
    }
    useEffect(() => {
        setItems(currentItems)
    }, [currentItems])
    return (
        <div>
            {items && items.length > 0 &&
                currentItems.map((item, idx) => (
                    <div style={{ padding: '10px 10px', border: '1px solid rgb(222, 231, 231)', backgroundColor: '#fff', marginTop: '30px' }} key={idx}>
                        <div className={styles.eachOrder}>
                            <div className={styles.eachOrder_overview}>
                                <p>Mã đơn hàng: #{item._id} | Đặt ngày: {moment(item.createAt).format('DD/MM/YYYY')} | {item.paymentCardName ? `Thanh toán online qua ${item.paymentCardName}` : "Thanh toán khi nhận hàng (COD)"} | Tổng tiền: {item.subTotal}đ</p>
                            </div>
                            <div className={styles.eachOrder_item}>
                                <div className='row'>
                                    {
                                        item.products.length > 0 && item.products.map((each, index) => {
                                            return (
                                                <div className='col-lg-6 col-md-12' key={index}>
                                                    <div className={styles.eachItemOrder}>
                                                        <div style={{ padding: '5px' }}>
                                                            {/* <div style={{ width: '60px' }}>
                                                                <img src={`/products/${each.image}`} alt='' style={{ width: '100%' }} />
                                                            </div> */}
                                                            <Image
                                                                // borderRadius='full'
                                                                boxSize='70px'
                                                                src={`${each.image}`}
                                                                alt='Dan Abramov'
                                                            />
                                                        </div>
                                                        <div>
                                                            <span>{each.product.name}</span>
                                                            <p>{each.quantity} x {each.product.newPrice.toLocaleString('Vi-VN')}đ</p>
                                                            <p>Màu : {each.colorName}</p>
                                                            <p>Kích cỡ : {each.size}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className={styles.detailOrder}>
                                        {item.status === "processing" && <span className={styles.btnOrderSuccess}>Đang xử lý</span>}
                                        {item.status === "success" && <span className={styles.btnOrderSuccess}>Chờ nhận hàng</span>}
                                        {item.status === "required" && <span className={styles.btnOrderSuccess}>Yêu cầu hủy</span>}
                                        {item.status === "cancel" && <span className={styles.btnOrderFail}>Đã hủy</span>}
                                        <div>
                                            {item.status === "processing" && <button onClick={event => {
                                                cancelOrder(item._id)
                                            }}>HỦY BỎ</button>}
                                            {item.status === "required" && <button>ĐANG HỦY</button>}
                                            {item.status === "cancel" && <Link to={`/cart`}>MUA LẠI</Link>}
                                            <Link to={`/profile/account/user/myOrder/${item._id}`}>XEM CHI TIẾT</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

function PaginatedItems({ itemsPerPage, apiString }: { itemsPerPage: number, apiString: string }) {
    const navigate: NavigateFunction = useNavigate()
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [bookings, setBookings] = useState<ORDER[]>([])
    const [itemOffset, setItemOffset] = useState(parseInt(searchParams.get("startItem") ?? "0", 10));
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = bookings.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(bookings.length / itemsPerPage);
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % bookings.length;
        if (event.selected === 0) {
            searchParams.delete("startItem")
        }
        else {
            searchParams.set("startItem", newOffset.toString())
        }
        navigate(`?${searchParams.toString()}`)
        setItemOffset(newOffset);
    };
    useEffect(() => {
        const getBookingsMe = async () => {
            dispatch(hideLoader())

            await fetch(apiString)
                .then(res => res.json())
                .then(all => { setBookings(all.bookings) })
            dispatch(showLoader())

        }

        getBookingsMe()
    }, [apiString])
    useEffect(() => {
        if (!searchParams.get("startItem")) {
            setItemOffset(0)
        }
    }, [searchParams])
    return (
        <>
            {handleLoader.loader && <Loader />}
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                forcePage={(itemOffset / itemsPerPage)}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    );
}

export default PaginatedItems