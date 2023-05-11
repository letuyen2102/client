import styles from '../Product/changeProduct.module.css'
import { PRODUCT } from '../Detail/Detail'
import { useState } from 'react'

const AddProduct = () => {
    const [prod, setProd] = useState<PRODUCT>(
        {
            _id: "",
            name: "",
            description: "",
            oldPrice: 0,
            sale: 0,
            quantity: [],
            image: "",
            category: "",
            categoryName: "",
            subQuantity: 0,
            newPrice: 0,
            slug: ""
        })
    const [categoryProd, setCategoryProd] = useState<string[]>([''])

    return (
        <div className={styles.editDetail}>
            <div className={styles.editDetailTitle}>
                <p>THÊM SẢN PHẨM</p>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className={styles.action}>
                        <div className={styles.formGroup}>
                            <label htmlFor="productName">Tên sản phẩm</label>
                            <input id="productName"
                                required
                                value={prod?.name}
                                onChange={event =>
                                    setProd({ ...prod, name: event.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="productDes">Mô tả sản phẩm</label>
                            <input id="productDes"
                                required
                                value={prod?.name}
                                onChange={event =>
                                    setProd({ ...prod, name: event.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="oldPrice">Giá cũ</label>
                            <input id="oldPrice" type='number'
                                required
                                value={prod.oldPrice}
                                onChange={event => {
                                    setProd({ ...prod, oldPrice: +event.target.value })
                                }} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="sale">Giảm giá (0-1)</label>
                            <input id="sale" type='number'
                                required
                                value={prod.sale}
                                onChange={event => {
                                    setProd({ ...prod, sale: +event.target.value })
                                }}
                            />
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className={styles.formGroup}>
                                    <label htmlFor="category">Category</label>
                                    <select id="category" required>
                                        {
                                            categoryProd.length > 0 && categoryProd.map((eachCate, idxCate) => {
                                                if (eachCate) {
                                                    return <option value={eachCate}>{eachCate}</option>
                                                }
                                                else {
                                                    return <option value={''}>--Chọn Category</option>
                                                }
                                            })
                                        }
                                    </select>
                                    <button onClick={event => {
                                        setCategoryProd(prev => {
                                            const newState = [...prev]
                                            // newState.push
                                            return newState
                                        })
                                    }}>Add</button>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className={styles.formGroup}>
                                    <label htmlFor="type1">Loại sản phẩm</label>
                                    <select id="type1" required >
                                        <option>--Chọn Type</option>
                                        <option value='AoSoMi'>Áo sơ mi</option>
                                        <option value='AoKieu'>Áo kiểu</option>
                                        <option value='AoVest'>Áo vest</option>
                                        <option value='AoKhoac'>Áo khoác</option>
                                        <option value='AoDai'>Áo dài</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.imageMain}>
                                <p>Ảnh chính</p>
                                <div>
                                    <input type="file" />

                                </div>
                            </div>

                        </div>
                        <div className={styles.btnAddColor}>
                            <button>THÊM MÀU</button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button className={styles.btnUpdate}
                            >Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default AddProduct