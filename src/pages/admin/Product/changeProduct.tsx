/*eslint-disable*/
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PRODUCT } from "../../../components/Detail/Detail";
import styles from './changeProduct.module.css'
import axios from "axios";

interface IMAGE_SHOW {
    quantity: {
        color: string;
        size: {
            size: string;
            quantity: number;
            _id: string;
        }[];
        imageSlideShows: string[];
        _id: string;
    }[];
}
const ChangeProduct = () => {
    const { idProd } = useParams()
    const [prod, setProd] = useState<PRODUCT>({ _id: "", name: "", description: "", oldPrice: 10, sale: 0, quantity: [], image: "", category: "", type: "", subQuantity: 0, newPrice: 0, slug: "" })
    console.log(prod)
    const [selectSize, setSelectSize] = useState<string[]>([''])
    const [image, setImage] = useState("");
    const [imgFormData, setImgFormData] = useState<any>()
    const imageSlideShowFormData: IMAGE_SHOW = { quantity: [...prod.quantity] }
    console.log(imageSlideShowFormData)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileTest = e.target.files
        const file = e.target.files?.[0];
        console.log(fileTest)
        if (file) {
            setImgFormData(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result as string);
            };
        }
        // console.log(file)
    };
    const handleUpdateProduct = async (objUpdate: any) => {
        try {
            const res = await axios.patch(`/myway/api/products/${prod._id}`, objUpdate)

            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const getEachProduct = async () => {
            await fetch(`/myway/api/products/${idProd}`)
                .then(res => res.json())
                .then(all => { setProd(all.product), setSelectSize(Array(all.product.quantity.length).fill('')) })
        }
        getEachProduct()
    }, [])
    return (
        <div className={styles.editDetail}>
            <div className={styles.editDetailTitle}>
                <p>Edit Product Detail #{`${prod._id}-${prod.name}`}</p>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className={styles.action}>
                        <div className={styles.formGroup}>
                            <label htmlFor="productName">Tên sản phẩm</label>
                            <input id="productName" required value={prod.name} onChange={e => setProd({ ...prod, name: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="productDes">Mô tả sản phẩm</label>
                            <input id="productDes" required value={prod.description} onChange={e => setProd({ ...prod, description: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="oldPrice">Giá cũ</label>
                            <input id="oldPrice" type='number' required value={prod.oldPrice} onChange={e => setProd({ ...prod, oldPrice: +e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="sale">Giảm giá (0-1)</label>
                            <input id="sale" type='number' required value={prod.sale} onChange={event => {
                                setProd({ ...prod, sale: +event.target.value })
                            }} />
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className={styles.formGroup}>
                                    <label htmlFor="category">Category</label>
                                    <select id="category" value={prod.category} onChange={e => setProd(prev => {
                                        const newState = { ...prev }
                                        if (e.target.value === "Ao") {
                                            return {
                                                ...prev,
                                                category: e.target.value,
                                                type: 'AoSoMi'
                                            }
                                        }
                                        else if (e.target.value === "Dam") {
                                            return {
                                                ...prev,
                                                category: e.target.value,
                                                type: 'DamMaxi'
                                            }
                                        }
                                        else if (e.target.value === "ChanVay") {
                                            return {
                                                ...prev,
                                                category: e.target.value,
                                                type: 'ChanVayOm'
                                            }
                                        }
                                        else if (e.target.value === "Quan") {
                                            return {
                                                ...prev,
                                                category: e.target.value,
                                                type: 'Quan'
                                            }
                                        }
                                        else {
                                            return {
                                                ...prev,
                                                category: e.target.value,
                                                type: 'Jumpsuit'
                                            }
                                        }
                                    })} required>
                                        <option value='Ao'>Áo</option>
                                        <option value='Dam'>Đầm</option>
                                        <option value='ChanVay'>Chân váy</option>
                                        <option value='Quan'>Quần</option>
                                        <option value='Jumpsuit'>Jumpsuit</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                {
                                    prod.category === 'Ao' && <div className={styles.formGroup}>
                                        <label htmlFor="type1">Loại sản phẩm</label>
                                        <select id="type1" required value={prod.type} onChange={e => setProd({ ...prod, type: e.target.value })}>
                                            <option value='AoSoMi'>Áo sơ mi</option>
                                            <option value='AoKieu'>Áo kiểu</option>
                                            <option value='AoVest'>Áo vest</option>
                                            <option value='AoKhoac'>Áo khoác</option>
                                            <option value='AoDai'>Áo dài</option>
                                        </select>
                                    </div>
                                }
                                {
                                    prod.category === 'Dam' && <div className={styles.formGroup}>
                                        <label htmlFor="type2">Loại sản phẩm</label>
                                        <select id="type2" required value={prod.type} onChange={e => setProd({ ...prod, type: e.target.value })}>
                                            <option value='DamMaxi'>Đầm Maxi</option>
                                            <option value='DamXoe'>Đầm xòe</option>
                                            <option value='DamOm'>Đầm ôm</option>
                                        </select>
                                    </div>
                                }
                                {
                                    prod.category === 'ChanVay' && <div className={styles.formGroup}>
                                        <label htmlFor="type3">Loại sản phẩm</label>
                                        <select id="type3" required value={prod.type} onChange={e => setProd({ ...prod, type: e.target.value })}>
                                            <option value='ChanVayOm'>Chân váy ôm</option>
                                            <option value='ChanVayXoe'>Chân váy xòe</option>
                                        </select>
                                    </div>
                                }
                                {
                                    prod.category === 'Quan' && <div className={styles.formGroup}>
                                        <label htmlFor="type4">Loại sản phẩm</label>
                                        <select id="type4" required value={prod.type} onChange={e => setProd({ ...prod, type: e.target.value })}>
                                            <option value='Quan'>Quần</option>
                                        </select>
                                    </div>
                                }
                                {
                                    prod.category === 'Jumpsuit' && <div className={styles.formGroup}>
                                        <label htmlFor="type5">Loại sản phẩm</label>
                                        <select id="type5" required value={prod.type} onChange={e => setProd({ ...prod, type: e.target.value })}>
                                            <option value='Jumpsuit'>Jumpsuit</option>
                                        </select>
                                    </div>
                                }

                            </div>
                            <div className={styles.imageMain}>
                                <p>Ảnh chính</p>
                                <div>
                                    <input type="file" onChange={handleImageChange} />
                                    {image ? <img src={image} alt="Ảnh của bạn" style={{ width: '20%' }} /> : <img src={`/products/${prod.image}`} style={{ width: '20%' }} />}
                                </div>
                            </div>
                            <p style={{ fontSize: '20px', letterSpacing: '2px', color: '#333' }}>* Màu sắc : {prod.quantity.length} loại</p>
                            {
                                prod.quantity.length > 0 && prod.quantity.map((each, idx) => {
                                    // console.log(prod.quantity[idx]);
                                    return (
                                        <div key={idx}>
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <label htmlFor="color" style={{ minWidth: '80px' }}>Màu sắc</label>
                                                        <select id="color" required style={{ width: '100%', height: '40px' }} value={prod.quantity[idx]?.color} onChange={event => setProd(prev => {
                                                            const newState = { ...prev }
                                                            newState.quantity[idx].color = event.target.value;
                                                            return newState;
                                                        })}>
                                                            <option value=''>Chọn màu</option>
                                                            <option value='Xanh'>Xanh</option>
                                                            <option value='Do'>Đỏ</option>
                                                            <option value='Tim'>Tím</option>
                                                            <option value='Vang'>Vàng</option>
                                                            <option value='Trang'>Trắng</option>
                                                            <option value='Den'>Đen</option>
                                                            <option value='Nau'>Nâu</option>
                                                            <option value='Ghi'>Ghi</option>
                                                            <option value='XanhLam'>Xanh Lam</option>
                                                            <option value='Be'>Be</option>
                                                            <option value='Hong'>Hồng</option>
                                                            <option value='Cam'>Cam</option>
                                                            <option value='Ke'>Kẻ</option>
                                                            <option value='Other'>Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center' }}>
                                                            <label style={{ minWidth: '80px' }}>Kích thước</label>
                                                            <select style={{ width: '100%', height: '40px' }} value={selectSize[idx]} onChange={event => setSelectSize(prev => {
                                                                const newState = [...prev]
                                                                newState[idx] = event.target.value
                                                                return newState
                                                            })}>
                                                                <option value=''>-- Chọn kích thước --</option>
                                                                {
                                                                    each.size.map((pe, pidx) => {
                                                                        return (
                                                                            <option value={pe.size} key={pidx}>{pe.size}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center' }}>
                                                            <label style={{ minWidth: '80px' }}>Số lượng</label>
                                                            <input style={{ width: '100%', height: '40px' }} type='number' value={each.size.find((aa, ii) => aa.size === selectSize[idx])?.quantity ?? ''} onChange={event => {
                                                                setProd(prev => {
                                                                    const newState = { ...prev }
                                                                    newState.quantity[idx].size.forEach((aa, ii) => {
                                                                        if (aa.size === selectSize[idx]) {
                                                                            aa.quantity = +event.target.value
                                                                        }
                                                                    })
                                                                    return newState
                                                                })
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className={styles.postImage}>
                                                <div className={styles.imageSlideShow}>
                                                    {/* <Dropzone onDrop={onDrop}>
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div {...getRootProps()}>
                                                                <input {...getInputProps()} />
                                                                <button>Ảnh slideshow</button>
                                                            </div>
                                                        )}
                                                    </Dropzone> */}
                                                    <div className="row">
                                                        {/* {files.length > 0 ? files.map((file, index) => (
                                                            <div key={index} className="col-lg-3">
                                                                <Img
                                                                    key={index}
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={file.name}
                                                                    style={{ width: '100%' }}
                                                                />
                                                            </div>
                                                        )) :  */}
                                                        <p style={{ fontSize: '18px', letterSpacing: '2px' }}>Ảnh slideshow màu {each.color}</p>
                                                        {each.imageSlideShows.map((ei, ii) => {

                                                            return <div key={ii} className="col-lg-2">

                                                                <div>
                                                                    {/* <img src={prod.quantity[idx].imageSlideShows[ii] ? prod.quantity[idx].imageSlideShows[ii] : `/products/${ei}`} style={{ width: '100%' }} /> */}

                                                                    {
                                                                        prod.quantity[idx].imageSlideShows[ii].startsWith('data:image') ?
                                                                            <img src={prod.quantity[idx].imageSlideShows[ii]} style={{ width: '100%' }} /> : <img src={`/products/${ei}`} style={{ width: '100%' }} />
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <p onClick={e => {
                                                                        setProd(prev => {
                                                                            const newState = { ...prev };
                                                                            newState.quantity[idx] = {
                                                                                ...newState.quantity[idx],
                                                                                imageSlideShows: newState.quantity[idx].imageSlideShows.filter(image => image !== ei)
                                                                            };
                                                                            return newState;
                                                                        });
                                                                    }}>Xóa ảnh</p>
                                                                    <label htmlFor={`changeImage${idx}${ii}`}>
                                                                        Thay đổi ảnh
                                                                        <input
                                                                            id={`changeImage${idx}${ii}`}
                                                                            type="file"
                                                                            style={{ display: 'none' }}
                                                                            onChange={event => {
                                                                                const file = event.target.files?.[0];
                                                                                if (file) {
                                                                                    const reader = new FileReader();
                                                                                    reader.readAsDataURL(file);
                                                                                    reader.onload = () => {
                                                                                        setProd(prev => {
                                                                                            const newState = { ...prev }
                                                                                            newState.quantity[idx].imageSlideShows[ii] = (reader.result as string)
                                                                                            
                                                                                            return newState
                                                                                        })
                                                                                    };
                                                                                }

                                                                            }}
                                                                        />

                                                                        {/* reader.result as string */}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button className={styles.btnUpdate} onClick={event => {
                                event.preventDefault()
                                console.log(JSON.stringify(prod.quantity))
                                const formData = new FormData();
                                formData.append('name', prod.name)
                                formData.append('description', prod.description)
                                formData.append('oldPrice', prod.oldPrice.toString())
                                formData.append('sale', prod.sale.toString())
                                formData.append('quantity', JSON.stringify(prod.quantity))
                                formData.append('category', prod.category)
                                formData.append('type', prod.type)
                                formData.append('imageMainProduct', imgFormData)
                                handleUpdateProduct(formData)
                            }
                            }
                            >Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ChangeProduct