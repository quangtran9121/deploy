import React, { useRef } from 'react';
import './ProfileHeader.scss';

function ProfileHeader({ user, onAvatarChange }) {
    const fileInputRef = useRef(null);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            onAvatarChange(file); // Call the function passed as a prop to handle avatar upload
        }
    };

    return (
        <div className="profile-header">
            <img 
                src={`http://localhost:5000/uploads/${user.avatar}`} 
                alt={`${user.lastName}'s avatar`} 
                className="avatar" 
                onClick={handleAvatarClick}
                title="Click to change avatar"
            />
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleAvatarChange} 
                accept="image/*"
            />
            <h1 className="name">{user.lastName} {user.firstName}</h1>
            {/* <p className="bio">{user.bio}</p> */}
        </div>
    );
}

export default ProfileHeader;
