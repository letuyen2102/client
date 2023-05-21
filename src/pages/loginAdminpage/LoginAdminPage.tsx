import React, { useState } from 'react';
import styles from './LoginAdminPage.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
import { handleNotify } from '../../slices/notifySlice';
import { useNavigate } from 'react-router-dom';

const LoginAdminPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log("aaaaaaaaaaaaaaaaaaaaaa")
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post('/myway/api/users/loginAsAdmin', { email: username, password: password })
            if (res.data.status === 'success') {
                dispatch(login({ tokenDispatch: res.data.token, userDispatch: res.data.data.user }))
                navigate('/myway/admin')
            }
        }
        catch (err) {
            alert('Thông tin admin không đúng')
        }
    };

    return (
        <div className={styles.container}>
            <h2>Đăng nhập Admin Page</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Email hoặc số điện thoại</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default LoginAdminPage;
