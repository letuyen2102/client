/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { useNavigate, NavigateFunction, useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import styles from './Collection.module.css'
import PaginatedItems from './Pagination';
const Collection: React.FC<{ queryAPI: string }> = (props) => {

    const navigate: NavigateFunction = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [categories, setCategories] = useState<string[]>([])
    const [colors, setColors] = useState<string[]>([])
    useEffect(() => {
        const getCategories = async () => {
            await fetch('/myway/api/products/getCategories')
                .then(res => res.json())
                .then(all => setCategories(all.categories))
        }
        const getColors = async () => {
            await fetch('/myway/api/products/getColors')
                .then(res => res.json())
                .then(all => setColors(all.colors))
        }
        getCategories()
        getColors()
    }, [props.queryAPI])
    return (
        <div className={`container-fluid ${styles.shop}`}>
            <div className={`row`}>
                <div className={`col-lg-3 ${styles.setdisplay}`}>
                    <div className={`${styles.categoryShop}`}>
                        <h2>TÌM THEO</h2>
                        <p>Giá sản phẩm</p>
                        <ul>
                            <li>
                                <label htmlFor='checkboxa'>
                                    <input type='checkbox' />
                                    Giá thấp hơn 1.000.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor='checkboxb'>
                                    <input type='checkbox' />
                                    1.000.000đ - 3.000.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor='checkboxc'>
                                    <input type='checkbox' />
                                    3.000.000đ - 5.000.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor='checkboxd'>
                                    <input type='checkbox' />
                                    Giá cao hơn 5.000.000đ
                                </label>
                            </li>
                        </ul>
                        <p>Loại</p>
                        <ul className={`${styles.categoryProductType}`}>
                            {
                                categories && categories.length > 0
                                && categories.map((each, index) => {
                                    return <li key={index}>
                                        <label>
                                            <input type="checkbox" checked={searchParams.get("category") === each} onChange={event => {
                                                if (event.target.checked) {
                                                    searchParams.delete("page")
                                                    searchParams.set("category", each)
                                                    navigate(`?${searchParams.toString()}`)
                                                }
                                                else {
                                                    searchParams.delete("page")
                                                    searchParams.delete("category")
                                                    navigate(`?${searchParams.toString()}`)
                                                }
                                            }} />
                                            {each}
                                        </label>
                                    </li>
                                })
                            }

                        </ul>
                        <p>Màu sắc</p>
                        <ul className={`${styles.categoryProductType}`}>
                            {
                                colors && colors.length > 0
                                && colors.map((each, index) => {
                                    return <li key={index}>
                                        <label>
                                            <input type="checkbox" checked={searchParams.get("color") === each} onChange={event => {
                                                if (event.target.checked) {
                                                    searchParams.delete("page")
                                                    searchParams.set("color", each)
                                                    navigate(`?${searchParams.toString()}`)
                                                }
                                                else {
                                                    searchParams.delete("page")
                                                    searchParams.delete("color")
                                                    navigate(`?${searchParams.toString()}`)
                                                }
                                            }} />
                                            {each}
                                        </label>
                                    </li>
                                })
                            }

                        </ul>
                    </div>
                </div>
                <div className={`col-lg-9 col-md-12 col-sm-12 sol-12`}>
                    <div className={`${styles.productShop}`}>
                        <div className={`${styles.productShopFilter}`}>
                            <h2>Filters:</h2>
                            <div>
                                <label>
                                    <input type='checkbox' />
                                    Tên A-Z
                                </label>
                                <label>
                                    <input type='checkbox' />
                                    Tên Z-A
                                </label>
                                <label>
                                    <input type='checkbox' />
                                    Mới
                                </label>
                                <label>
                                    <input type='checkbox' />
                                    Giá-Thấp đến Cao
                                </label>
                                <label>
                                    <input type='checkbox' />
                                    Giá-Cao đến Thấp
                                </label>
                            </div>
                        </div>
                        <div className='row'>
                            <PaginatedItems itemsPerPage={8} apiString='' />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Collection