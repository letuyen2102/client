import { Link, useParams } from 'react-router-dom'
import styles from './EachCategory.module.css'
import { useEffect, useState } from 'react'
import { PRODUCT } from '../Detail/Detail'
import ProductCard from '../ProductCard/ProductCard'
const EachCategory = () => {
    const { cateId } = useParams()
    const [prods, setProds] = useState<PRODUCT[]>([])
    console.log(prods)
    useEffect(() => {
        const getDetailCategory = async () => {
            await fetch(`/myway/api/categories/${cateId}`)
                .then(res => res.json())
                .then(all => setProds(all.products))
        }
        getDetailCategory()
    }, [])

    return (
        <div className={styles.eachCate}>
            <h1>DANH MỤC #{cateId}</h1>
            <div className='row'>
                {
                    prods && prods.length > 0 && prods.map((each, idx) => {
                        return <div className='col-lg-2' key={idx}>
                            <br />
                            <ProductCard
                                image={each.image}
                                oldPrice={each.oldPrice}
                                sale={each.sale}
                                category={each.category}
                                slug={each.slug}
                                name={each.name}
                            />
                            <div className={styles.btnFix}>
                                <Link to={`/myway/admin/product/${each._id}`}>Sửa</Link>
                                <button>Xóa</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}


export default EachCategory