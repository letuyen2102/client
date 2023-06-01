import { Link, useNavigate } from 'react-router-dom'
import styles from './SideBarProfile.module.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { changeInforUserImage, logout } from '../../slices/authSlice';
import Loader from '../loader/Loader';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
const SideBarProfile = () => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const handleLoader = useSelector((state: RootState) => state.loader)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirm, setConfirm] = useState(false)
    const [avatar, setAvatar] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setAvatar(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);

            setConfirm(true)
        }
    };
    const handleChangeImageUser = async (objUpdateImage: FormData) => {
        try {
            dispatch(hideLoader())
            const res = await axios.patch('/myway/api/users/updateMe', objUpdateImage)
            dispatch(showLoader())
            if (res.data.status === "success") {
                setConfirm(false)
                dispatch(changeInforUserImage({ userDispatch: res.data.user }))
            }
        }
        catch (err) {
            console.log(err)
            alert('Đã có lỗi khi tải ảnh lên , vui lòng kiểm tra lại')
        }
    }
    const handleLogout = async () => {
        try {
            const res = await axios.get('/myway/api/users/logout')
            console.log(res)
            if (res.data.status === "success") {
                dispatch(logout())
                navigate('/account/login')
            }
        }
        catch (err: any) {
            alert(err.response.data)
        }
    }
    return (
        <div>
            {handleLoader.loader && <Loader />}
            <div className={styles.sideBarImageName}>
                <div className={styles.sideBarImageUpload}>
                    <div>
                        <div>
                            {imagePreviewUrl ? <img src={imagePreviewUrl} alt='' /> : <img src={`${handleLoginAndCart.user.photo}`} alt='' />}
                        </div>
                    </div>

                    <label htmlFor="fileInput" className={styles.chooseImage}>

                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PhotoCameraIcon">
                            <circle cx="12" cy="12" r="3.2"></circle>
                            <path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z">
                            </path>
                        </svg>

                        <input id="fileInput" type="file" onChange={handleFileChange} />

                    </label>
                </div>

                <div className={styles.sideBarName}>
                    <p>{handleLoginAndCart.user.name}</p>
                    <p>Myway memmber</p>
                </div>
            </div>
            {confirm && <div className={styles.confirmUploadImg}>
                <button onClick={event => {
                    const formData = new FormData()
                    if (avatar) {
                        formData.append('users', avatar)
                    }
                    handleChangeImageUser(formData)
                }}>CẬP NHẬT</button>
                <button onClick={event => {
                    setAvatar(null)
                    setImagePreviewUrl(null)
                    setConfirm(false)

                }}>HỦY</button>

            </div>}
            <ul className={styles.sideBarListOptions}>
                <li>
                    <Link to=''>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccountCircleOutlinedIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z">
                        </path>
                        </svg>
                        <p>Thông tin tài khoản</p>
                    </Link>
                </li>
                {!handleLoginAndCart.user.googleId && <li>
                    <Link to={`/profile/account/user/change-password`}>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LockOpenOutlinedIcon"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>
                        <p>Thay đổi mật khẩu</p>
                    </Link>
                </li>}
                <li>
                    <Link to='/profile/account/user/myOrder'>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ListAltOutlinedIcon"><path d="M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z"></path></svg>
                        <p>Đơn hàng của tôi</p>
                    </Link>
                </li>
                <li>
                    <Link to=''>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FavoriteBorderOutlinedIcon"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg>
                        <p>Danh sách yêu thích</p>
                    </Link>
                </li>

                <li>
                    <Link to='' onClick={event => {
                        event.preventDefault();
                        handleLogout()
                    }}>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LogoutOutlinedIcon"><path d="m17 8-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4-4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5z"></path></svg>
                        <p>Đăng xuất</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBarProfile