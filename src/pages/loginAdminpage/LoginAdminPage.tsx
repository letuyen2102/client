import React, { useState } from 'react';
import styles from './LoginAdminPage.module.css';

const LoginAdminPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Xử lý đăng nhập ở đây
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
