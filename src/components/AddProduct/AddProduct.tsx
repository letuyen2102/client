import styles from '../Product/changeProduct.module.css'
import { PRODUCT } from '../Detail/Detail'
import { useState } from 'react'
import axios from 'axios';
import slugify from 'slugify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Loader from '../loader/Loader';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
export interface IMAGE_SHOW {
    quantity: {
        colorName: string;
        imageSlideShows: string[];
    }[];
}
export interface IMAGE_SHOW_FORMDATA {
    quantity: {
        colorName: string;
        imageSlideShows: File[];
    }[];
}
export interface CREATE_PROD {
    name: string;
    description: string;
    oldPrice: number;
    sale: number;
    quantity: {
        colorName: string;
        size: {
            size: string;
            quantity: number;
        }[];
        imageSlideShows: string[];
    }[];
    image: string;
    categoryName: string;
}
export const sizeArray = ['S', 'S+', 'M', 'M+', 'L', 'L+', 'XL', 'XL+', '2XL', '2XL+'].map((each, idx) => {
    return {
        size: each,
        quantity: 0,
    }
})
const AddProduct = () => {
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)
    const [prod, setProd] = useState<CREATE_PROD>(
        {
            name: "",
            description: "",
            oldPrice: 0,
            sale: 0,
            quantity: [],
            image: "",
            categoryName: ""
        }
    )
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
    const handleCreateProd = async (objCreate: any) => {
        try {

            dispatch(hideLoader())
            const res = await axios({
                method: "POST",
                url: '/myway/api/products',
                data: objCreate
            })
            dispatch(showLoader())
            console.log(res)
        }
        catch (err) {
            alert("Có lỗi , kiểm tra lại console")
            console.log(err)
        }
    }
    return (
        <div className={styles.editDetail}>
            {handleLoader.loader && <Loader />}
            <div className="row">
                <div className="col-lg-10 offset-lg-1">
                    <div className={styles.editDetail}>
                        <div className={styles.editDetailTitle}>
                            <p>THÊM SẢN PHẨM</p>
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
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className={styles.formGroup}>
                                                <label >Tên danh mục</label>
                                                <input type="text"
                                                    value={prod.categoryName}
                                                    onChange={event =>
                                                        setProd({ ...prod, categoryName: event.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className={styles.formGroup}>
                                                <label htmlFor="oldPrice">Giá cũ</label>
                                                <input id="oldPrice"
                                                    type='number'
                                                    required
                                                    value={prod.oldPrice}
                                                    onChange={e =>
                                                        setProd({ ...prod, oldPrice: +e.target.value })}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className={styles.formGroup}>
                                                <label htmlFor="sale">Giảm giá (0-1)</label>
                                                <input id="sale"
                                                    type='number'
                                                    required
                                                    value={prod.sale}
                                                    onChange={event => {
                                                        setProd({ ...prod, sale: +event.target.value })
                                                    }} />
                                            </div>
                                        </div>
                                        <div className={styles.imageMain}>
                                            <p>Ảnh chính</p>
                                            <div>
                                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                                {image && <img src={image} alt="Ảnh của bạn" style={{ width: '20%' }} />}
                                            </div>
                                        </div>
                                        {/* <p style={{ fontSize: '20px', letterSpacing: '2px', color: '#333' }}>* Màu sắc : {prod.quantity.length} loại</p> */}
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
                                                                                accept="image/*"
                                                                                onChange={async (event) => {
                                                                                    const files = event.target.files
                                                                                    let images: string[] = []

                                                                                    if (files) {
                                                                                        setImageSlideShowsFormData(prev => {
                                                                                            const newState = { ...prev }
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

                                                                                        <img src={`/products/${ei}`} style={{ width: '100%' }} />

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
                                                        colorName: "",
                                                        size: [...sizeArray],
                                                        imageSlideShows: [],
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
                                        <button className={styles.btnUpdate}
                                            onClick={event => {
                                                event.preventDefault()
                                                const formData = new FormData()
                                                formData.append('name', prod.name)
                                                formData.append('description', prod.description)
                                                formData.append('oldPrice', prod.oldPrice.toString())
                                                formData.append('sale', prod.sale.toString())
                                                formData.append('quantity', JSON.stringify(prod.quantity))
                                                formData.append('categoryName', prod.categoryName)
                                                formData.append('imageMainProduct', imgFormData)
                                                imageSlideShowsFormdata.quantity.forEach((gg, hh) => {
                                                    gg.imageSlideShows.forEach((jj, kk) => {
                                                        formData.append(`imageSlideShow${slugify(gg.colorName, { locale: 'vi', lower: true })}`, jj)
                                                    })
                                                })
                                                handleCreateProd(formData)
                                            }}
                                        >ADD</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div >
                </div>
            </div>

        </div >
    )
}

export default AddProduct