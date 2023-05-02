/*eslint-disable*/
import { Link } from 'react-router-dom'
import styles from './product.module.css'
import { PRODUCT } from '../../../components/Detail/Detail'
import { useEffect, useState } from 'react'
const Product = () => {
    const [prods, setProds] = useState<PRODUCT[]>([])
    useEffect(() => {
        const getAllProducts = async () => {
            await fetch('/myway/api/products/filterProducts')
                .then(res => res.json())
                .then(all => setProds(all.products))
        }
        getAllProducts()
    }, [])

    return (
        <div className={styles.pageProductAdmin}>
            <div className={styles.tiltle}>
                <p>Quản lý sản phẩm</p>
                <button>Thêm sản phẩm</button>
            </div>
            <table className={`${styles.tableOrderUserAdmin}`}>
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
                            <p>Mô tả</p>
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
                                        <div className={styles.prodImage}>
                                            <img src={`/products/${each.image}`} />
                                        </div>
                                    </td>
                                    <td>
                                        <p>{each.name}</p>
                                    </td>
                                    <td>
                                        <p>
                                            {each.description}
                                        </p>
                                    </td>
                                    <td>
                                        <p>{each.subQuantity}</p>
                                    </td>
                                    <td>
                                        <div className={styles.actionProd}>
                                            <Link to={`/myway/admin/product/${each._id}`} className={styles.editProd}>Edit</Link>
                                            <Link to='' className={styles.deleteProd}>Delete</Link>
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