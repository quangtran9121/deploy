import React, { useState, useEffect } from 'react';
import './Rating.scss';
import { ToastContainer, toast } from 'react-toastify';
import request from '../../../config/config';

function Rating({ slug, userEmail }) {
    const [rating, setRating] = useState(0); // Giá trị đánh giá của người dùng
    const [hoveredRating, setHoveredRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0); // Đánh giá trung bình

    // Lấy đánh giá trung bình từ server
    const fetchAverageRating = async (slug) => {
        try {
            const response = await request.get('/api/getrating', { params: { slug: slug } });
            console.log('Rating console:', response)
            if (response.status === 200) {
                setAverageRating(response.data || 0); // Cập nhật đánh giá trung bình
            }
        } catch (error) {
            console.error("Error fetching average rating:", error);
            // toast.error("Lỗi khi tải đánh giá trung bình!");
        }
    };

    // Gửi đánh giá của người dùng
    const handleRatingSubmit = async (value) => {
        try {
            if (!userEmail) {
                // toast.error("Cần đăng nhập để đánh giá!");
                return;
            }
    
            const response = await request.post('/api/rating', { email: userEmail, slug, rating: value });
    
            if (response.status === 200) {
                toast.success("Đánh giá thành công!");
                setRating(value);
                fetchAverageRating(slug);
            } else {
                // Chỉ hiển thị lỗi nếu cần
                // toast.error("Không thể gửi đánh giá!");
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            // toast.error("Lỗi khi gửi đánh giá!");
        }
    };
    

    // Lấy đánh giá của người dùng
    // const fetchUserRating = async (slug, email) => {
    //     try {
    //         const response = await request.get('/api/getrating', { params: { slug: slug } });
    //         return response.data.userRating || 0; // Trả về 0 nếu không có đánh giá
    //     } catch (error) {
    //         console.error("Error fetching user rating:", error);
    //         return 0;
    //     }
    // };

    // Gọi API khi component mount
    useEffect(() => {
        if (slug) {
            fetchAverageRating(slug); // Lấy đánh giá trung bình
            // if (userEmail) {
            //     fetchUserRating(slug, userEmail).then(setRating); // Lấy đánh giá của người dùng
            // }
        }
    }, [slug, userEmail]);

    const handleMouseEnter = (value) => setHoveredRating(value);
    const handleMouseLeave = () => setHoveredRating(0);

    return (
        <div className="rating">
            {/* <ToastContainer /> */}
            <h3>
                Rate this Game
                <span className="average-rating">
                    <span className="star">★</span> {averageRating.toFixed(1)} / 5
                </span>
            </h3>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= (hoveredRating || rating) ? 'selected' : ''}`}
                        onClick={() => handleRatingSubmit(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                    >
                        ★
                    </span>
                ))}
            </div>
            {rating > 0 && (
                <p>
                    Đánh giá của bạn là: <strong>{rating} ★</strong>. Bạn có muốn cập nhật lại đánh giá?
                </p>
            )}
        </div>
    );
}

export default Rating;
