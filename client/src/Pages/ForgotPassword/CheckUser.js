import React, { useState } from 'react';
import './CheckUser.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import request from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';

function ResetPasswordOption() {
    const [selectedOption, setSelectedOption] = useState('email');
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy dữ liệu từ state của navigate
    const { email, avatar } = location.state || {};

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const res = await request.post('/api/resetpassword', { email });
            // console.log(res.data.token)
            if (res.status === 200) {
                toast.success("Mã OTP và token đã được gửi tới email của bạn.", {
                    onClose: () => {
                        navigate(`/forgot-password/${res.data.token}`, { state: { email } });
                    }
                });
            } else {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error during reset password request:", error);
            toast.error("Không thể gửi mã OTP. Vui lòng thử lại.");
        }
    };

    const handleCancel = () => {
        navigate('/forgot-password');
    };

    return (
        <div className="reset-password-container">
        <ToastContainer />
            <div className="reset-password-box">
                <h2 className="title">Đặt lại mật khẩu của bạn</h2>
                <p className="description">Đây có phải bạn không?</p>

                {/* Hiển thị thông tin người dùng */}
                <div className="user-info">
                    {avatar && (
                        <img src={`http://localhost:5000/uploads/${avatar}`} loading="lazy" alt="User Avatar" className="user-avatar" />
                    )}
                    <p><strong>Email:</strong> {email}</p>
                </div>

                <div className="options">
                    <label>
                        <input
                            type="radio"
                            value="email"
                            checked={selectedOption === 'email'}
                            onChange={handleOptionChange}
                        />
                        Gửi mã qua email
                    </label>
                </div>
                <div className="buttons">
                    <button className="cancel-button" onClick={handleCancel}>Không phải bạn?</button>
                    <button className="continue-button" onClick={handleSubmit}>Tiếp tục</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordOption;
