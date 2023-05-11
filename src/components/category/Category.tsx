import { useEffect, useState } from 'react'
import styles from './Category.module.css'
import { Link } from 'react-router-dom'
interface CATEGORY_STATS {
    name: string,
    displayName: string,
    productCount: number
}
const Category = () => {
    const [stats, setStats] = useState<CATEGORY_STATS[]>([])
    console.log(stats)
    useEffect(() => {
        const getStats = async () => {
            await fetch('/myway/api/categories/statsCategory')
                .then(res => res.json())
                .then(all => setStats(all.stats))
        }
        getStats()
    }, [])
    return (
        <div>
            <div className="row">

                <div className="col-lg-10 offset-lg-1">
                    <div className={styles.category}>
                        <h1>DANH MUC SẢN PHẨM</h1>
                        <button>THÊM DANH MỤC</button>
                        <table className={styles.category_table}>
                            <thead>
                                <tr>
                                    <th>
                                        <p>Mã danh mục</p>
                                    </th>
                                    <th>
                                        <p>Tên danh mục</p>
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
                                    stats.map((each, idx) => {
                                        return <tr key={idx}>
                                            <td>
                                                <p>#{each.name}</p>
                                            </td>
                                            <td>
                                                <p>{each.displayName}</p>
                                            </td>
                                            <td>
                                                <p>{each.productCount}</p>
                                            </td>
                                            <td>
                                                <p>
                                                    <Link to={`/myway/admin/categories/${each.name}`}>Xem</Link>
                                                    <Link to=''>Xóa</Link>
                                                </p>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Category