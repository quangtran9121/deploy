import React, { useState } from 'react';
import './ForgotPassword.scss';
import { useNavigate } from 'react-router-dom';
import request from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgotPassword() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleCancel = () => {
        navigate('/'); // Điều hướng về trang chủ hoặc trang khác khi nhấn Hủy
    };

    const handleSearch = async () => {
        try {
            const res = await request.get('/api/getinforfogot', { params: { email: input } });

            if (res.status === 404) {
                return toast.error(res.data.message);
            }

            navigate('/forgot-password/reset-password-option', { state: res.data });
        } catch (error) {
            console.error("Error fetching user information:", error);
            toast.error("Người dùng không tồn tại!");
        }
    };

    return (
        <div className="forgot-password-container">
                    <ToastContainer/>
            <div className="forgot-password-box">
                <h2 className="title">Tìm tài khoản của bạn</h2>
                <p className="description">
                    Vui lòng nhập email tìm kiếm tài khoản của bạn.
                </p>
                <input
                    type="text"
                    placeholder="Your email"
                    value={input}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <div className="buttons">
                    <button className="cancel-button" onClick={handleCancel}>Hủy</button>
                    <button className="search-button" onClick={handleSearch}>Tìm kiếm</button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
