/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { useNavigate, NavigateFunction, useSearchParams, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import styles from './Collection.module.css'
import PaginatedItems from './Pagination';
import Title from '../Tiltle/Title';
import slugify from 'slugify';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
const Collection: React.FC<{ queryAPI: string, queryString: string }> = (props) => {

    const navigate: NavigateFunction = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [categories, setCategories] = useState<string[]>([])
    const [colors, setColors] = useState<string[]>([])
    useEffect(() => {
        const getCategories = async () => {
            await fetch(`/myway/api/products/getCategories`)
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
    useEffect(() => {
        dispatch(hideLoader())
    }, [searchParams.toString()])
    return (
        <div>
            <Title>
                <ul>
                    <li>
                        <Link to='/' style={{ whiteSpace: 'pre' }}>Trang chủ  {'>'} </Link>
                    </li>
                    <li>
                        <Link to=''>Tất cả sản phẩm</Link>
                    </li>
                </ul>
            </Title>
            <div className={`container-fluid ${styles.shop}`}>
                <div className={`row`}>
                    <div className={`col-lg-3 ${styles.setdisplay}`}>
                        <div className={`${styles.categoryShop}`}>
                            <h2>TÌM THEO</h2>
                            <p>Giá sản phẩm</p>
                            <ul>
                                <li>
                                    <label>
                                        <input type='checkbox' checked={searchParams.get("maxPrice") === "1000000"} onChange={event => {
                                            if (event.target.checked) {
                                                searchParams.delete("startItem")
                                                searchParams.delete("minPrice")
                                                searchParams.delete("maxPrice")
                                                searchParams.set("maxPrice", "1000000")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete("startItem")
                                                searchParams.delete("minPrice")
                                                searchParams.delete("maxPrice")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }} />
                                        Giá thấp hơn 1.000.000đ
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type='checkbox' checked={searchParams.get("minPrice") === "1000000" && searchParams.get("maxPrice") === "3000000"} onChange={event => {
                                            if (event.target.checked) {
                                                searchParams.delete("startItem")
                                                searchParams.delete("minPrice")
                                                searchParams.delete("maxPrice")
                                                searchParams.set("minPrice", "1000000")
                                                searchParams.set("maxPrice", "3000000")

                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete("startItem")
                                                searchParams.delete("minPrice")
                                                searchParams.delete("maxPrice")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }} />
                                        1.000.000đ - 3.000.000đ
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type='checkbox' checked={searchParams.get("minPrice") === "3000000" && searchParams.get("maxPrice") === "5000000"} onChange={event => {
                                            if (event.target.checked) {
                                                searchParams.delete("startItem")
                                                searchParams.delete("minPrice")
                                                searchParams.delete("maxPrice")
                                                searchParams.set("minPrice", "3000000")
                                                searchParams.set("maxPrice", "5000000")

                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete("startItem")
                                                searchParams.delete("minPrice")
                                                searchParams.delete("maxPrice")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }} />
                                        3.000.000đ - 5.000.000đ
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type='checkbox' checked={searchParams.get("minPrice") === "5000000"} onChange={event => {
                                            if (event.target.checked) {
                                                searchParams.delete("startItem")
                                                searchParams.delete("minPrice")
                                                searchParams.delete("maxPrice")
                                                searchParams.set("minPrice", "5000000")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete("startItem")
                                                searchParams.delete("minPrice")
                                                searchParams.delete("maxPrice")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }} />
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
                                                <input type="checkbox" checked={searchParams.get(props.queryString) === slugify(each, { locale: 'vi', lower: true })} onChange={event => {
                                                    if (event.target.checked) {
                                                        searchParams.delete("startItem")
                                                        searchParams.set(props.queryString, slugify(each, { locale: 'vi', lower: true }))
                                                        navigate(`?${searchParams.toString()}`)
                                                    }
                                                    else {
                                                        searchParams.delete("startItem")
                                                        searchParams.delete(props.queryString)
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
                                                <input type="checkbox" checked={searchParams.get("color") === slugify(each, { locale: 'vi', lower: true })} onChange={event => {
                                                    if (event.target.checked) {
                                                        searchParams.delete("startItem")
                                                        searchParams.set("color", slugify(each, { locale: 'vi', lower: true }))
                                                        navigate(`?${searchParams.toString()}`)
                                                    }
                                                    else {
                                                        searchParams.delete("startItem")
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
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label>
                                        <input type='checkbox' checked={searchParams.get("sort") === "name"} onChange={event => {
                                            if (event.target.checked) {
                                                searchParams.delete("startItem")
                                                searchParams.set("sort", "name")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete("startItem")
                                                searchParams.delete("sort")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }} />
                                        Tên A-Z
                                    </label>
                                    <label>
                                        <input type='checkbox' checked={searchParams.get("sort") === "-name"} onChange={event => {
                                            if (event.target.checked) {
                                                searchParams.delete("startItem")
                                                searchParams.set("sort", "-name")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete("startItem")
                                                searchParams.delete("sort")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }} />
                                        Tên Z-A
                                    </label>
                                    <label>
                                        <input type='checkbox' checked={searchParams.get("sort") === "newPrice"} onChange={event => {
                                            if (event.target.checked) {
                                                searchParams.delete("startItem")
                                                searchParams.set("sort", "newPrice")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete("startItem")
                                                searchParams.delete("sort")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }} />
                                        Giá-Thấp đến Cao
                                    </label>
                                    <label>
                                        <input type='checkbox' checked={searchParams.get("sort") === "-newPrice"} onChange={event => {
                                            if (event.target.checked) {
                                                searchParams.delete("startItem")
                                                searchParams.set("sort", "-newPrice")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete("startItem")
                                                searchParams.delete("sort")
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }} />
                                        Giá-Cao đến Thấp
                                    </label>
                                </div>
                            </div>
                            <div className='row'>
                                <PaginatedItems itemsPerPage={8} apiString={props.queryAPI + searchParams.toString()} />
                                {/* {props.queryAPI.endsWith('&') && <PaginatedItems itemsPerPage={8} apiString={props.queryAPI + searchParams.toString()} />} */}

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Collection