import { useEffect, useState } from 'react'
import styles from '../../components/Product/product.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserInfor } from '../../slices/authSlice'
import { Button, Image, ButtonGroup } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { hideLoader, showLoader } from '../../slices/loaderSlice'
import Loader from '../../components/loader/Loader'

const User = () => {
    const [users, setUsers] = useState<UserInfor[]>([])
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)
    const handleDeleteUser = async (idUser: string) => {
        try {
            const res = await axios.delete(`/myway/api/users/${idUser}`)
            setUsers(prev => {
                const newState = [...prev].filter(each => {
                    return each._id !== idUser
                })

                return newState
            })
        }
        catch (err: any) {
            alert(err.response.data.message)
        }
    }
    useEffect(() => {
        const getAllUsers = async () => {
            dispatch(hideLoader())
            const res = await axios.get('/myway/api/users')
            setUsers(res.data.data.users)
            dispatch(showLoader())
        }
        getAllUsers()
    }, [])

    return (
        <div className={styles.pageProductAdmin}>
            {handleLoader.loader && <Loader />}
            <div className={styles.tiltle}>
                <p>Quản lý khách hàng</p>
                <Link to=''>Thêm khách hàng</Link>
            </div>
            <table className={`${styles.table}`}>
                <thead>
                    <tr>
                        <th>
                            <p>STT</p>
                        </th>
                        <th>
                            <p>Tên</p>
                        </th>
                        <th>
                            <p>Ảnh</p>
                        </th>
                        <th>
                            <p>Địa chỉ</p>
                        </th>
                        <th>
                            <p>Email</p>
                        </th>
                        <th>
                            <p>Số điện thoại</p>
                        </th>
                        <th>
                            <p>Hoạt động</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.length > 0 && users.map((each, idx) => {
                            return (
                                <tr key={idx}>
                                    <td><p>{idx}</p></td>
                                    <td>
                                        <p>{each.name}</p>
                                    </td>
                                    <td>
                                        <Image
                                            borderRadius='50%'
                                            boxSize='50px'
                                            src={`${each.photo}`}
                                            alt='Dan Abramov'
                                        />
                                    </td>
                                    <td>
                                        <p>{each.address}</p>
                                    </td>
                                    <td>
                                        <p>{each.email}</p>
                                    </td>
                                    <td>
                                        <p>{each.phone}</p>
                                    </td>
                                    <td>
                                        <div className={styles.actionProd}>
                                            <Link to={`/myway/admin/user/${each._id}`} className={styles.editProd}>Edit</Link>
                                            <Link to='' className={styles.deleteProd} onClick={event => {
                                                event.preventDefault()
                                                if (window.confirm("Bạn có chắc xóa khách hàng này ?")) {
                                                    handleDeleteUser(each._id)
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

export default User