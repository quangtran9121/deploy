import React, { useState } from 'react';
import './Verify.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import request from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyCode() {
    const location = useLocation();
    const { email } = location.state || {};
    const [otp, setOtp] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái cho modal
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleSubmit = async () => {
        try {
            const res = await request.post('/api/verifyotp', { email, otp });

            if (res.status === 200) {
                toast.success("Mã bảo mật chính xác!");
                setIsModalOpen(true); // Hiển thị modal nhập mật khẩu mới
            } else {
                toast.error("Mã bảo mật không chính xác.");
            }
        } catch (error) {
            console.error('Error verifying otp:', error);
            toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu không khớp!");
            return;
        }

        try {
            // Gọi API để đặt lại mật khẩu
            const res = await request.post('/api/resetnewpassword', {
                email,
                newPassword
            });

            if (res.status === 200) {
                toast.success(res.data.message, {
                    onClose: () => {
                        navigate('/');
                    }
                }); // Hiển thị thông báo từ server
            } else {
                toast.error("Không thể đặt lại mật khẩu. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error("Có lỗi xảy ra khi đặt lại mật khẩu.");
        }
    };

    return (
        <div className="verify-code-container">
            <ToastContainer /> {/* Container để hiển thị thông báo */}
            <div className="verify-code-box">
                <h2 className="title">Nhập mã bảo mật</h2>
                <p className="description">
                    Vui lòng kiểm tra mã trong email của bạn. Mã này gồm 6 số.
                </p>
                <input
                    type="text"
                    placeholder="Nhập mã"
                    value={otp}
                    onChange={handleOtpChange}
                    className="input-field"
                />
                <p className="subtext">Chúng tôi đã gửi mã cho bạn qua email</p>
                <div className="buttons">
                    <button className="cancel-button" onClick={handleCancel}>Hủy</button>
                    <button className="continue-button" onClick={handleSubmit}>Tiếp tục</button>
                </div>
            </div>

            {/* Modal nhập mật khẩu mới */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="title">Đặt lại mật khẩu</h2>
                        <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input-field"
                        />
                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field"
                        />
                        <div className="buttons">
                            <button className="cancel-button" onClick={() => setIsModalOpen(false)}>Hủy</button>
                            <button className="continue-button" onClick={handlePasswordChange}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerifyCode;
