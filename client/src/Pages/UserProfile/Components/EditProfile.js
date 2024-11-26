import React, { useState, useEffect } from 'react';
import './EditProfile.scss';
import request from '../../../config/config';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function EditProfile({ user, onSave }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [website, setWebsite] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setEmail(user.email || '');
            setCountry(user.country || '');
            setWebsite(user.website || '');
            setCompanyName(user.companyName || '');
        }
    }, [user]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setCountries(data.map(country => country.name.common).sort());
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);
    

    const handleSave = async () => {
        try {
            const response = await request.post('/api/editprofile', {
                firstName,
                lastName,
                email,
                country,
                website,
                companyName
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật hồ sơ.');
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }
        try {
            const response = await request.post('/api/changepassword', {
                email: user.email,
                password: currentPassword,
                newpassword: newPassword,
                repassword: confirmPassword,
            });
            toast.success(response.data.message);
            setShowPasswordModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đã xảy ra lỗi khi đổi mật khẩu.');
        }
    };

    return (
        <div className="edit-profile">
            <ToastContainer />
            <h3>Edit Profile</h3>

            <div className="name-fields">
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </div>
            </div>

            <label>Email</label>
            <input type="email" value={email} readOnly onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="deactive"/>

            <label>Country</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="country-dropdown">
                <option value="">Select a country</option>
                {countries.map((countryName, index) => (
                    <option key={index} value={countryName}>
                        {countryName}
                    </option>
                ))}
            </select>

            <label>Website</label>
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />

            <label>Company Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />

            <div className="button-container">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setShowPasswordModal(true)}>Change password</button>
            </div>

            {showPasswordModal && (
                <div className="overlays">
                    <div className="password-modal">
                        <div className="modal-contents">
                            <h3>Change Password</h3>
                            <label>Current Password</label>
                            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" />
                            <label>New Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                            <label>Confirm New Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" />
                            <div className="button-container">
                                <button onClick={handleChangePassword}>Change Password</button>
                                <button onClick={() => setShowPasswordModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditProfile;
