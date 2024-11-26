import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import request from "../../config/config";
import {jwtDecode} from "jwt-decode"; // Nhập đúng jwtDecode

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential; // Nhận token từ Google
      
      // Kiểm tra token từ Google
      if (!tokenId) {
        toast.error("Không nhận được token từ Google.");
        return;
      }

      // Gửi tokenId tới backend
      const response = await request.post("/api/google-login", { tokenId }); 
      const { token } = response.data;

      if (!token) {
        throw new Error("Không nhận được token từ backend.");
      }

      // Decode JWT để lấy thông tin user
      const decoded = jwtDecode(token);

      // Điều hướng dựa trên vai trò của người dùng
      if (decoded.admin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Đăng nhập thành công bằng Google!");
    } catch (error) {
      console.error("Error during Google Login:", error);

      // Phân loại lỗi để xử lý tốt hơn
      if (error.response) {
        // Lỗi từ backend
        toast.error(`Lỗi từ server: ${error.response.data.message || "Đăng nhập thất bại."}`);
      } else if (error.request) {
        // Lỗi khi không kết nối được đến server
        toast.error("Không thể kết nối đến server.");
      } else {
        // Lỗi khác
        toast.error("Đăng nhập bằng Google thất bại.");
      }
    }
  };

  return (
    
    <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
    // <div>KCJ</div>
  );
};

export default GoogleLoginButton;
