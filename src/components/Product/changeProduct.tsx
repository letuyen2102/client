/*eslint-disable*/
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PRODUCT } from "../Detail/Detail";
import styles from './changeProduct.module.css'
import axios from "axios";
import slugify from 'slugify'
import { useDispatch, useSelector } from "react-redux";
import { handleNotify } from "../../slices/notifySlice";
import { IMAGE_SHOW, IMAGE_SHOW_FORMDATA, sizeArray } from "../AddProduct/AddProduct";
import { hideLoader, showLoader } from "../../slices/loaderSlice";
import { RootState } from "../../store/store";
import Loader from "../loader/Loader";

const ChangeProduct = () => {
    const handleLoader = useSelector((state: RootState) => state.loader)
    const dispatch = useDispatch()
    const { idProd } = useParams()
    const [prod, setProd] = useState<PRODUCT>({ _id: "", name: "", description: "", oldPrice: 0, sale: 0, quantity: [], image: "", category: "", categoryName: "", subQuantity: 0, newPrice: 0, slug: "" })
    console.log(prod)
    const [selectSize, setSelectSize] = useState<string[]>([''])
    const [image, setImage] = useState("");
    const [imgFormData, setImgFormData] = useState<any>()
    const [imageSlideShows, setImageSlideShows] = useState<IMAGE_SHOW>({ quantity: [] })
    const [imageSlideShowsFormdata, setImageSlideShowsFormData] = useState<IMAGE_SHOW_FORMDATA>({ quantity: [] })
    console.log(imageSlideShowsFormdata)
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
    };
    const loadImage = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const image = reader.result as string;
                resolve(image);
            };
            reader.onerror = reject;
        });
    };
    const handleUpdateProduct = async (objUpdate: any) => {
        try {
            dispatch(hideLoader())
            const res = await axios.patch(`/myway/api/products/${idProd}`, objUpdate)
            dispatch(showLoader())
            if (res.data.status === "success") {
                dispatch(handleNotify({ message: "Thay đổi sản phẩm thành công", show: true, status: 200 }))
                setTimeout(() => {
                    dispatch(handleNotify({ message: "", show: false, status: 0 }))
                }, 2000)
            }
        }
        catch (err: any) {
            // dispatch(handleNotify({ message: "Thay đổi sản phẩm thất bại , vui lòng kiểm tra lại", show: true, status: 400 }))
            // setTimeout(() => {
            //     dispatch(handleNotify({ message: "", show: false, status: 0 }))
            // }, 2000)
            alert("Có lỗi xảy ra , kiểm tra console")
            console.log(err)
        }
    }
    useEffect(() => {
        const getEachProduct = async () => {
            dispatch(hideLoader())
            await fetch(`/myway/api/products/getProductById/${idProd}`)
                .then(res => res.json())
                .then(all => {
                    setProd(all.product),
                        setSelectSize(Array(all.product.quantity.length).fill('')),
                        setImageSlideShows({ quantity: Array(all.product.quantity.length).fill({ color: "", imageSlideShows: [] }) }),
                        setImageSlideShowsFormData({ quantity: Array(all.product.quantity.length).fill({ color: "", imageSlideShows: [] }) })
                })
            dispatch(showLoader())
        }
        getEachProduct()
    }, [])
    return (
        <div className="row">
            {handleLoader.loader && <Loader />}
            <div className="col-lg-10 offset-lg-1">
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
                                    <textarea id="productDes" required value={prod.description} onChange={e => setProd({ ...prod, description: e.target.value })} />
                                </div>
                                {/* <div className={styles.formGroup}>
                                    <label htmlFor="oldPrice">Giá cũ</label>
                                    <input id="oldPrice" type='number' required value={prod.oldPrice} onChange={e => setProd({ ...prod, oldPrice: +e.target.value })} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="sale">Giảm giá (0-1)</label>
                                    <input id="sale" type='number' required value={prod.sale} onChange={event => {
                                        setProd({ ...prod, sale: +event.target.value })
                                    }} />
                                </div> */}
                                <div className="row">
                                    {/* <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className={styles.formGroup}>
                                            <label >Mã danh mục</label>
                                            <input type="text" value={prod.category} onChange={event => setProd({ ...prod, category: event.target.value })} />
                                        </div>
                                    </div> */}

                                    <div className="col-lg-4 col-md-6 col-sm-6">
                                        <div className={styles.formGroup}>
                                            <label >Tên danh mục</label>
                                            <input type="text" value={prod.categoryName} onChange={event => setProd({ ...prod, categoryName: event.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="oldPrice">Giá cũ</label>
                                            <input id="oldPrice" type='number' required value={prod.oldPrice} onChange={e => setProd({ ...prod, oldPrice: +e.target.value })} />
                                        </div>

                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="sale">Giảm giá (0-1)</label>
                                            <input id="sale" type='number' required value={prod.sale} onChange={event => {
                                                setProd({ ...prod, sale: +event.target.value })
                                            }} />
                                        </div>
                                    </div>
                                    <div className={styles.imageMain}>
                                        <p>Ảnh chính</p>
                                        <div>
                                            <input type="file" onChange={handleImageChange} />
                                            {image ? <img src={image} alt="Ảnh của bạn" style={{ width: '20%' }} /> : <img src={`${prod.image}`} style={{ width: '20%' }} />}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '20px', letterSpacing: '2px', color: '#333' }}>* Màu sắc : {prod.quantity.length} loại</p>
                                    {
                                        prod.quantity.length > 0 && prod.quantity.map((each, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <div style={{ borderBottom: '2px dashed #00b156', margin: '10px 0px' }}>
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                                <div className={styles.formGroup} >
                                                                    <label>Tên màu</label>
                                                                    <input value={prod.quantity[idx]?.colorName}
                                                                        onChange={event => setProd(prev => {
                                                                            const newState = { ...prev }
                                                                            newState.quantity[idx].colorName = event.target.value;
                                                                            return newState;
                                                                        })} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className={styles.formGroup} >
                                                                    <label>Kích thước</label>
                                                                    <select style={{ width: '100%', height: '40px' }} value={selectSize[idx]} onChange={event => setSelectSize(prev => {
                                                                        const newState = [...prev]
                                                                        newState[idx] = event.target.value
                                                                        return newState
                                                                    })}>
                                                                        <option value=''>-- Chọn kích thước --</option>
                                                                        {
                                                                            each.size.length > 0 && each.size.map((pe, pidx) => {
                                                                                return (
                                                                                    <option value={pe.size} key={pidx}>{pe.size}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className={styles.formGroup} >
                                                                    <label>Số lượng</label>
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
                                                        <div className={styles.postImage}>
                                                            <div className={styles.imageSlideShow}>
                                                                <div className="row">
                                                                    <p style={{ fontSize: '18px', letterSpacing: '2px', marginBottom: '10px' }}>Ảnh slideshow màu {each.colorName} <label className={styles.btnUploadImage}>
                                                                        THÊM ẢNH
                                                                        <input type="file" multiple style={{ display: 'none' }}
                                                                            onChange={async (event) => {
                                                                                const files = event.target.files
                                                                                let images: string[] = []

                                                                                if (files) {
                                                                                    setImageSlideShowsFormData(prev => {
                                                                                        const newState = { ...prev }
                                                                                        console.log(each.color)
                                                                                        newState.quantity[idx] = {
                                                                                            colorName: each.colorName,
                                                                                            imageSlideShows: [...Array.from(files)]
                                                                                        }

                                                                                        return newState
                                                                                    })

                                                                                    for (let i = 0; i < files.length; i++) {
                                                                                        const image = await loadImage(files[i]);

                                                                                        images.push(image)
                                                                                    }
                                                                                }
                                                                                setImageSlideShows(prev => {
                                                                                    const newState = { ...prev }
                                                                                    newState.quantity[idx] = {
                                                                                        colorName: each.colorName,
                                                                                        imageSlideShows: Array.from(new Set([...images, ...newState.quantity[idx].imageSlideShows]))
                                                                                    }
                                                                                    return newState
                                                                                })
                                                                            }} />
                                                                    </label>
                                                                        <button className={styles.btnDeleteColor} onClick={event => {
                                                                            setProd(prev => {
                                                                                const newState = { ...prev }

                                                                                newState.quantity = newState.quantity.filter((mm, nn) => {
                                                                                    return nn !== idx
                                                                                })

                                                                                return newState
                                                                            })
                                                                        }}>Xóa màu</button>

                                                                    </p>
                                                                    {
                                                                        each.imageSlideShows.map((ei, ii) => {

                                                                            return <div key={ii} className="col-lg-2">

                                                                                <div>

                                                                                    <img src={`${ei}`} style={{ width: '100%' }} />

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
                                                                                </div>
                                                                            </div>
                                                                        })
                                                                    }
                                                                    {
                                                                        imageSlideShows.quantity[idx]?.imageSlideShows.map((ei, ii) => {
                                                                            return <div key={ii} className="col-lg-2">

                                                                                <div>

                                                                                    <img src={`${ei}`} style={{ width: '100%' }} />

                                                                                </div>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={styles.btnAddColor}>
                                    <button onClick={event => {

                                        setProd(prev => {
                                            const newState = { ...prev }
                                            newState.quantity = [
                                                ...newState.quantity,
                                                {
                                                    color: "",
                                                    colorName: "",
                                                    size: [...sizeArray],
                                                    imageSlideShows: [],
                                                    // _id: ""
                                                }
                                            ]
                                            return newState
                                        })
                                        setSelectSize(prev => {
                                            const newState = [...prev, '']
                                            return newState
                                        })
                                        setImageSlideShows(prev => {
                                            const newState = { ...prev }

                                            newState.quantity = [
                                                ...newState.quantity,
                                                {
                                                    colorName: "",
                                                    imageSlideShows: []
                                                }
                                            ]

                                            return newState
                                        })
                                        setImageSlideShowsFormData(prev => {
                                            const newState = { ...prev }

                                            newState.quantity = [
                                                ...newState.quantity,
                                                {
                                                    colorName: "",
                                                    imageSlideShows: []
                                                }
                                            ]

                                            return newState
                                        })
                                    }}>THÊM MÀU</button>
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
                                        formData.append('categoryName', prod.categoryName)
                                        // formData.append('type', prod.type)
                                        formData.append('imageMainProduct', imgFormData)
                                        imageSlideShowsFormdata.quantity.forEach((gg, hh) => {
                                            gg.imageSlideShows.forEach((jj, kk) => {
                                                formData.append(`imageSlideShow${slugify(gg.colorName, { locale: 'vi', lower: true })}`, jj)
                                            })
                                        })

                                        handleUpdateProduct(formData)
                                    }
                                    }
                                    >Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div >
            </div>
        </div>
    )
}

export default ChangeProduct