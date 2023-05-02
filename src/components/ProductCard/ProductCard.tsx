/*eslint-disable*/

import React from "react"
import { Link } from "react-router-dom"
import styles from './ProductCard.module.css'
const ProductCard: React.FC<{ image: string, oldPrice: number, sale: number, name: string, type: string, slug: string }> = (props) => {
    return (
        <div className={`${styles.ProductCard}`}>
            <div className={`${styles.ProductCardImage}`}>
                <Link to={`/detail/${props.slug}`}>
                    <img src={`/products/${props.image}`} />
                </Link>
            </div>
            <h2 style={{ textTransform: 'uppercase' }}>{props.type} - LIMITED</h2>
            <Link to={`/detail/${props.slug}`}>
                <Link to={`/detail/${props.slug}`} style={{ textTransform: 'uppercase' }}>{props.name}</Link>
            </Link>
            <div className={`${styles.ProductCardPrice}`}>
                <del>{props.oldPrice}₫</del>
                {
                    props.sale ? <strong>{props.oldPrice * props.sale}₫</strong> : <strong>{props.oldPrice}₫</strong>
                }
            </div>
            {props.sale && <span>-{props.sale * 100}%</span>}
        </div>
    )
}

export default ProductCard