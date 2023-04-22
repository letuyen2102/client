/*eslint-disable*/

import React, { useEffect, useState } from 'react'
import { useNavigate, NavigateFunction, useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import _ from "lodash";
import PaginatedItems from '../Pagination/Pagination'
import styles from './Shop.module.css'
function convertString(inputString: string): string {
    const normalizedString = inputString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const words = normalizedString.split(/[\s-]+/);
    const capitalizedWords = words.map(word => {
        const lowerCaseWord = word.toLowerCase();
        if (lowerCaseWord.charAt(0) === "đ" || lowerCaseWord.charAt(0) === "Đ") {
            return "D" + lowerCaseWord.slice(1);
        }
        return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
    });
    const outputString = capitalizedWords.join("");
    return outputString;
}

const Shop: React.FC<{ typeArr: string[], colorArr: string[], queryAPI: string }> = (props) => {

    const navigate: NavigateFunction = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryString: number = parseInt(searchParams.get('page') || '1');
    const getInitialCheckedState = () => {
        const storedState = sessionStorage.getItem('isChecked');
        if (storedState) {
            return JSON.parse(storedState);
        } else {
            return {
                isCheckeda: false,
                isCheckedb: false,
                isCheckedc: false,
                isCheckedd: false,
            };
        }
    }
    const getInitialFilterState = () => {
        const storedState = sessionStorage.getItem('filterItems');
        if (storedState) {
            return JSON.parse(storedState);
        } else {
            return {
                filter1: false,
                filter2: false,
                filter3: false,
                filter4: false,
                filter5: false,

            };
        }
    }
    const [isChecked, setIsChecked] = useState(getInitialCheckedState);
    const [filterItems, setFilterItems] = useState(getInitialFilterState)
    const [queryApiStorage, setQueryApiStorage] = useState(() => {
        const queryStorage = sessionStorage.getItem('queryApi')
        if (queryStorage) {
            return JSON.parse(queryStorage)
        }
        else {
            return ''
        }
    })
    const [checkedArr, setCheckedArr] = useState<boolean[]>(() => {
        const savedState = sessionStorage.getItem('checkedArr');
        return savedState ? JSON.parse(savedState) : Array(props.typeArr.length).fill(false);
    });
    const [checkedArrColor, setCheckedArrColor] = useState<boolean[]>(() => {
        const savedStateColor = sessionStorage.getItem('checkedArrColor');
        return savedStateColor ? JSON.parse(savedStateColor) : Array(props.colorArr.length).fill(false);
    });
    const handleCheckboxChange = (index: number, typeProd: string) => {

        const newCheckedArr = Array.from(checkedArr);
        newCheckedArr.fill(false);
        newCheckedArr[index] = true;
        setCheckedArr(newCheckedArr);
        searchParams.delete('type')
        setCurrentPage(0)
        searchParams.delete('page')
        searchParams.set('type', typeProd)
        navigate(`?${searchParams.toString()}`)
    };
    const handleUncheckboxChange = (index: number) => {
        const newCheckedArr = Array.from(checkedArr);
        newCheckedArr.fill(false);
        newCheckedArr[index] = false;
        setCheckedArr(newCheckedArr);
        searchParams.delete('type');
        setCurrentPage(0)
        searchParams.delete('page')
        navigate(`?${searchParams.toString()}`)
    };
    const handleCheckboxChangeColor = (index: number, typeProd: string) => {

        const newCheckedArr = Array.from(checkedArrColor);
        newCheckedArr.fill(false);
        newCheckedArr[index] = true;
        setCheckedArrColor(newCheckedArr);
        searchParams.delete('color')
        setCurrentPage(0)
        searchParams.delete('page')
        searchParams.set('color', typeProd)
        navigate(`?${searchParams.toString()}`)
    };
    const handleUncheckboxChangeColor = (index: number) => {
        const newCheckedArr = Array.from(checkedArrColor);
        newCheckedArr.fill(false);
        newCheckedArr[index] = false;
        setCheckedArrColor(newCheckedArr);
        searchParams.delete('color');
        setCurrentPage(0)
        searchParams.delete('page')
        navigate(`?${searchParams.toString()}`)
    };
    const [currentPage, setCurrentPage] = useState(queryString - 1);
    const queryAPI = props.queryAPI;

    useEffect(() => {
        sessionStorage.setItem('isChecked', JSON.stringify(isChecked));
        sessionStorage.setItem('checkedArr', JSON.stringify(checkedArr));
        sessionStorage.setItem('checkedArrColor', JSON.stringify(checkedArrColor));
        sessionStorage.setItem('filterItems', JSON.stringify(filterItems));
        sessionStorage.setItem('queryApi', JSON.stringify(queryApiStorage));
        setQueryApiStorage(searchParams.toString())
    }, [searchParams, queryApiStorage]);

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
                                    <input type='checkbox' id='checkboxa' checked={isChecked.isCheckeda}
                                        onChange={e => {
                                            const checked = e.target.checked
                                            setIsChecked({
                                                isCheckeda: checked,
                                                isCheckedb: false,
                                                isCheckedc: false,
                                                isCheckedd: false
                                            })
                                            if (checked) {
                                                searchParams.delete('minPrice')
                                                searchParams.delete('maxPrice')
                                                setCurrentPage(0)
                                                searchParams.delete('page')
                                                searchParams.set('maxPrice', '1000000')
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                            else {
                                                searchParams.delete('maxPrice')
                                                searchParams.delete('minPrice')
                                                setCurrentPage(0)
                                                searchParams.delete('page')
                                                navigate(`?${searchParams.toString()}`)
                                            }
                                        }}
                                    />
                                    Giá thấp hơn 1.000.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor='checkboxb'>
                                    <input type='checkbox' id='checkboxb' checked={isChecked.isCheckedb} onChange={e => {
                                        const checked = e.target.checked
                                        setIsChecked({
                                            isCheckeda: false,
                                            isCheckedb: checked,
                                            isCheckedc: false,
                                            isCheckedd: false
                                        })
                                        if (checked) {
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('minPrice')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            searchParams.set('minPrice', '1000000')
                                            searchParams.set('maxPrice', '3000000')
                                            navigate(`?${searchParams.toString()}`)
                                            // setQueryApiStorage(searchParams.toString())
                                            // sessionStorage.setItem('queryApi' , searchParams.toString())
                                        }
                                        else {
                                            searchParams.delete('minPrice')
                                            searchParams.delete('maxPrice')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            navigate(`?${searchParams.toString()}`)
                                            // setQueryApiStorage(searchParams.toString())
                                            // sessionStorage.setItem('queryApi' , searchParams.toString())
                                        }

                                    }} />
                                    1.000.000đ - 3.000.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor='checkboxc'>
                                    <input type='checkbox' id='checkboxc' checked={isChecked.isCheckedc}
                                        onChange={e => {
                                            const checked = e.target.checked
                                            setIsChecked({
                                                isCheckeda: false,
                                                isCheckedb: false,
                                                isCheckedc: checked,
                                                isCheckedd: false
                                            })
                                            if (checked) {
                                                searchParams.delete('minPrice')
                                                searchParams.delete('maxPrice')
                                                setCurrentPage(0)
                                                searchParams.delete('page')
                                                searchParams.set('minPrice', '3000000')
                                                searchParams.set('maxPrice', '5000000')
                                                navigate(`?${searchParams.toString()}`)
                                                // setQueryApiStorage(searchParams.toString())
                                                // sessionStorage.setItem('queryApi' , searchParams.toString())
                                            }
                                            else {
                                                searchParams.delete('minPrice')
                                                searchParams.delete('maxPrice')
                                                setCurrentPage(0)
                                                searchParams.delete('page')
                                                navigate(`?${searchParams.toString()}`)
                                                // setQueryApiStorage(searchParams.toString())
                                                // sessionStorage.setItem('queryApi' , searchParams.toString())
                                            }
                                        }}
                                    />
                                    3.000.000đ - 5.000.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor='checkboxd'>
                                    <input type='checkbox' id='checkboxd' checked={isChecked.isCheckedd}
                                        onChange={e => {
                                            const checked = e.target.checked
                                            setIsChecked({
                                                isCheckeda: false,
                                                isCheckedb: false,
                                                isCheckedc: false,
                                                isCheckedd: checked
                                            })
                                            if (checked) {
                                                searchParams.delete('minPrice')
                                                searchParams.delete('maxPrice')
                                                setCurrentPage(0)
                                                searchParams.delete('page')
                                                searchParams.set('minPrice', '5000000')
                                                navigate(`?${searchParams.toString()}`)
                                                // setQueryApiStorage(searchParams.toString())
                                                // sessionStorage.setItem('queryApi' , searchParams.toString())
                                            }
                                            else {
                                                searchParams.delete('minPrice')
                                                searchParams.delete('maxPrice')
                                                setCurrentPage(0)
                                                searchParams.delete('page')
                                                navigate(`?${searchParams.toString()}`)
                                                // setQueryApiStorage(searchParams.toString())
                                                // sessionStorage.setItem('queryApi' , searchParams.toString())
                                            }
                                        }}
                                    />
                                    Giá cao hơn 5.000.000đ
                                </label>
                            </li>
                        </ul>
                        <p>Loại</p>
                        <ul className={`${styles.categoryProductType}`}>
                            {props.typeArr && props.typeArr.map((each, index) => (
                                <li key={index}>
                                    <label htmlFor={`checkbox${index + 1}`}>
                                        <input
                                            type="checkbox"
                                            id={`checkbox${index + 1}`}
                                            checked={checkedArr[index]}
                                            onChange={(e) => {
                                                const checked = e.target.checked

                                                if (checked) {
                                                    handleCheckboxChange(index, convertString(each))
                                                }
                                                else {
                                                    handleUncheckboxChange(index)
                                                }
                                            }}
                                        />
                                        {each}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p>Màu sắc</p>
                        <ul className={`${styles.categoryProductType}`}>
                            {props.colorArr && props.colorArr.map((each, index) => (
                                <li key={index}>
                                    <label htmlFor={`color${index + 1}`}>
                                        <input
                                            type="checkbox"
                                            id={`color${index + 1}`}
                                            checked={checkedArrColor[index]}
                                            onChange={(e) => {
                                                const checked = e.target.checked

                                                if (checked) {
                                                    handleCheckboxChangeColor(index, convertString(each))
                                                }
                                                else {
                                                    handleUncheckboxChangeColor(index)
                                                }
                                            }}
                                        />
                                        {each}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={`col-lg-9 col-md-12 col-sm-12 sol-12`}>
                    <div className={`${styles.productShop}`}>
                        <div className={`${styles.productShopFilter}`}>
                            <h2>Filters:</h2>
                            <div>
                                <label>
                                    <input type='checkbox' id='filter1' checked={filterItems.filter1} onChange={e => {
                                        const checked = e.target.checked
                                        setFilterItems({
                                            filter1: checked,
                                            filter2: false,
                                            filter3: false,
                                            filter4: false,
                                            filter5: false,

                                        })
                                        if (checked) {
                                            searchParams.delete('minPrice')
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            searchParams.set('sort', 'name')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                        else {
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('minPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                    }} />
                                    Tên A-Z
                                </label>
                                <label>
                                    <input type='checkbox' id='filter2' checked={filterItems.filter2} onChange={e => {
                                        const checked = e.target.checked
                                        setFilterItems({
                                            filter1: false,
                                            filter2: checked,
                                            filter3: false,
                                            filter4: false,
                                            filter5: false,

                                        })
                                        if (checked) {
                                            searchParams.delete('minPrice')
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            searchParams.set('sort', '-name')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                        else {
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('minPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                    }} />
                                    Tên Z-A
                                </label>
                                <label>
                                    <input type='checkbox' id='filter3' checked={filterItems.filter3} onChange={e => {
                                        const checked = e.target.checked
                                        setFilterItems({
                                            filter1: false,
                                            filter2: false,
                                            filter3: checked,
                                            filter4: false,
                                            filter5: false,

                                        })
                                        if (checked) {
                                            searchParams.delete('minPrice')
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                        else {
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('minPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                    }} />
                                    Mới
                                </label>
                                <label>
                                    <input type='checkbox' id='filter4' checked={filterItems.filter4} onChange={e => {
                                        const checked = e.target.checked
                                        setFilterItems({
                                            filter1: false,
                                            filter2: false,
                                            filter3: false,
                                            filter4: checked,
                                            filter5: false,

                                        })
                                        if (checked) {
                                            searchParams.delete('minPrice')
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            searchParams.set('sort', '-newPrice')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                        else {
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('minPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                    }} />
                                    Giá-Thấp đến Cao
                                </label>
                                <label>
                                    <input type='checkbox' id='filter5' checked={filterItems.filter5} onChange={e => {
                                        const checked = e.target.checked
                                        setFilterItems({
                                            filter1: false,
                                            filter2: false,
                                            filter3: false,
                                            filter4: false ,
                                            filter5: checked ,

                                        })
                                        if (checked) {
                                            searchParams.delete('minPrice')
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            searchParams.set('sort', 'newPrice')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                        else {
                                            searchParams.delete('maxPrice')
                                            searchParams.delete('minPrice')
                                            searchParams.delete('sort')
                                            setCurrentPage(0)
                                            searchParams.delete('page')
                                            navigate(`?${searchParams.toString()}`)
                                        }
                                    }}/>
                                    Giá-Cao đến Thấp
                                </label>
                            </div>
                        </div>
                        <div className='row'>
                            <PaginatedItems itemsPerPage={8} queryAPI={queryAPI + queryApiStorage}  currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Shop