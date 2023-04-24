import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { PRODUCT } from '../Detail/Detail';
import { UserInfor } from '../../slices/authSlice';
import styles from './MyBooking.module.css'
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
export interface PRODORDER {
    product: PRODUCT
    quantity: number,
    color: string,
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
    return (
        <div>
            {currentItems && currentItems.length > 0 &&
                currentItems.map((item, idx) => (
                    <div style={{ padding: '20px 30px', border: '1px solid rgb(222, 231, 231)', backgroundColor: '#fff', marginTop: '30px' }} key={idx}>
                        <div className={styles.eachOrder}>
                            <div className={styles.eachOrder_overview}>
                                <p>Mã đơn hàng: #{item._id} | Đặt ngày: {moment(item.createAt).format('DD/MM/YYYY')} | {item.paymentCardName ? `Thanh toán online qua ${item.paymentCardName}` : "Thanh toán khi nhận hàng (COD)"} | Tổng tiền: {item.subTotal}đ</p>
                            </div>
                            <div className={styles.eachOrder_item}>
                                <div className='row'>
                                    {
                                        item.products.length > 0 && item.products.map((each, index) => {
                                            return (
                                                <div className='col-lg-6' key={index}>
                                                    <div className={styles.eachItemOrder}>
                                                        <div style={{ padding: '5px' }}>
                                                            <div style={{ width: '60px' }}>
                                                                <img src={`/products/${each.image}`} alt='' style={{ width: '100%' }} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span>{each.product.name}</span>
                                                            <p>{each.quantity} x {each.product.newPrice.toLocaleString('Vi-VN')}đ</p>
                                                            <p>Màu : {each.color}</p>
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
                                        {item.status === "cancel" && <span className={styles.btnOrderFail}>Đã hủy</span>}
                                        <div>
                                            <button>HỦY BỎ</button>
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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [bookings, setBookings] = useState<ORDER[]>([])
    const itemOffset = parseInt((searchParams.get("page") ?? "0"), 10)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = bookings.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(bookings.length / itemsPerPage);
    const handlePageClick = (event: { selected: number }) => {
        if (event.selected === 0) {
            searchParams.delete("page")
            navigate(`?${searchParams.toString()}`)
        }
        else {
            searchParams.set("page", (event.selected + 1).toString())
            navigate(`?${searchParams.toString()}`)
        }
    };
    useEffect(() => {
        const getBookingsMe = async () => {
            await fetch(apiString)
                .then(res => res.json())
                .then(all => { setBookings(all.bookings) })
        }

        getBookingsMe()
    }, [apiString])
    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                forcePage={(itemOffset - 1) < 0 ? 0 : (itemOffset - 1)}
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