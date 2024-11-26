import React, { useState, useEffect } from 'react';
import request from '../../../config/config';
import './Comment.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CommentSection({ slug, userEmail }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [visibleComments, setVisibleComments] = useState(5); // Số lượng bình luận hiển thị ban đầu

    const fetchComments = async () => {
        try {
            const response = await request.get(`/api/getallcomment`, {
                params: { slug }
            });
            setComments(response.data.comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    
    useEffect(() => {
        fetchComments();
    }, [slug]);

    const handleAddComment = async () => {
        if (!userEmail) {
            toast.error("Cần đăng nhập để thực hiện bình luận!");
            return;
        }
        if (!newComment.trim()) return;

        try {
            const response = await request.post(`/api/comment`, {
                slug,
                email: userEmail,
                commentText: newComment
            });

            if (response.status === 200) {
                setNewComment(''); // Reset ô nhập
                fetchComments(); // Gọi lại API để cập nhật danh sách bình luận
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Xử lý hiển thị thêm bình luận
    const handleLoadMore = () => {
        setVisibleComments((prev) => prev + 5); // Hiển thị thêm 5 bình luận
    };

    return (
        <div className="comment-section">
            <ToastContainer />
            <h4>Comments</h4>
            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.slice(0, visibleComments).map((comment, index) => (
                        <div key={index} className="comment">
                            <img src={`http://localhost:5000/uploads/${comment.user.avatar || 'default-avatar.png'}`} alt="User Avatar" className="user-avatar" />
                            <p><strong>{comment.user.firstName} {comment.user.lastName}</strong> {comment.commentText}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
                {visibleComments < comments.length && (
                    <button onClick={handleLoadMore} className="load-more-btn">Load more comments</button>
                )}
            </div>
            <div className="comment-input">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Submit</button>
            </div>
        </div>
    );
}

export default CommentSection;
