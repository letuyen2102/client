/*eslint-disable*/
import { Link } from 'react-router-dom'
import styles from './product.module.css'
import { PRODUCT } from '../Detail/Detail'
import { useEffect, useState } from 'react'
import { Image } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { hideLoader, showLoader } from '../../slices/loaderSlice'
import Loader from '../loader/Loader'
import axios from 'axios'
const Product = () => {
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)
    const [prods, setProds] = useState<PRODUCT[]>([])
    const handleDeleteProd = async (idProd: string) => {
        try {
            const res = await axios.delete(`/myway/api/products/${idProd}`)
            setProds(prev => {
                const newState = [...prev].filter(el => {
                    return el._id !== idProd
                })

                return newState
            })
        }
        catch (err) {
            alert("Có lỗi xảy ra")
            console.log(err)
        }
    }
    useEffect(() => {
        const getAllProducts = async () => {
            dispatch(hideLoader())
            await fetch('/myway/api/products/filterProducts')
                .then(res => res.json())
                .then(all => setProds(all.products))
            dispatch(showLoader())
        }
        getAllProducts()
    }, [])

    return (
        <div className={styles.pageProductAdmin}>
            {handleLoader.loader && <Loader />}
            <div className={styles.tiltle}>
                <p>Quản lý sản phẩm</p>
                <Link to='/myway/admin/addProduct'>Thêm sản phẩm</Link>
            </div>
            <table className={`${styles.table}`}>
                <thead>
                    <tr>
                        <th>
                            <p>STT</p>
                        </th>
                        <th>
                            <p>Hình ảnh</p>
                        </th>
                        <th>
                            <p>Tên</p>
                        </th>
                        <th>
                            <p>Số lượng</p>
                        </th>
                        <th>
                            <p>Hoạt động</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        prods.length > 0 && prods.map((each, index) => {
                            return (
                                <tr key={index}>
                                    <td><p>{index}</p></td>
                                    <td>
                                        {/* <div className={styles.Image}>
                                            <img src={`/products/${each.image}`} />
                                        </div> */}
                                        <Image
                                            borderRadius='50%'
                                            boxSize='60px'
                                            src={`${each.image}`}
                                            alt='Dan Abramov'
                                        />
                                    </td>
                                    <td>
                                        <p>{each.name}</p>
                                    </td>
                                    <td>
                                        <p>{each.subQuantity}</p>
                                    </td>
                                    <td>
                                        <div className={styles.actionProd}>
                                            <Link to={`/myway/admin/product/${each._id}`} className={styles.editProd}>Edit</Link>
                                            <Link to='' className={styles.deleteProd} onClick={event => {
                                                event.preventDefault()
                                                if (window.confirm("Bạn có chắc muốn xóa sản phẩm này")) {
                                                    handleDeleteProd(each._id)
                                                }
                                            }}>Delete</Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default Product