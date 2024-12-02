import React, { useState, useEffect } from 'react';

import "./Auth.Module.scss";
import request from "../../config/config";
import GoogleLoginButton from './GoogleLogin';
import {Link, useNavigate} from 'react-router-dom';
import { toast, ToastContainer, useToast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoGG from './unnamed.png'
// import { faX } from '@fortawesome/free-solid-svg-icons';




const Auth = ({onClose}) => {
  //XỬ LÝ ĐĂNG NHẬP
  console.log('aaa')
  var [isLogin, setIsLogin] = useState(true);
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState(''); 

  // const [err, setErr] = useState(null);
  const navigator = useNavigate();
  const handleLogin = async() =>{
    var pattern = /[A-Z]/;
    const test = pattern.test(email);
    if (email === '' || password === '' || test === true) {
      toast.error("Vui lòng kiểm tra và nhập lại thông tin")
    } else {
      try {
        const response = await request.post('/api/login', {
          email: email,
          password: password
        });
        console.log(response.data)
        const token = document.cookie;
        console.log(token);
        const decode = jwtDecode(token.slice(6, 9999));
        console.log(decode); console.log(decode.admin);
        if (decode.admin === true){
          navigator('/admin');
          setTimeout(() => {
            window.location.reload();
          }, 100);
          toast.success(response.data.message);
          console.log("Login successful");
        } else {
          navigator('/');
          toast.success(response.data.message);
          console.log("Login successful");
        }
      } catch (error) {
        toast.error(error);
      }
      
    }
  }

  //XỬ LÝ ĐĂNG KÝ
  var [firstName, setFirstName] = useState('');
  var [lastName, setLastname] = useState('');
  // var [email, setEmail] = useState('');
  // var [password, setPassword] =us
  var [rePassword, setRePassword] = useState('');
  var [country, setCountry] = useState('');
  var [companyName, setCompanyName] = useState('');
  var [website, setWebsite] = useState('');
  var [traffic, setTraffic] = useState('');
  var [isPublisher, setIsPublisher] = useState(false);
  var [isDeveloper, setIsDeveloper] = useState(false);
  var [condition, setCondition] = useState(false);
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    // Gọi API để lấy danh sách các nước
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all'); // Gọi API ngoài để lấy danh sách các nước
        const data = await response.json();
        const countryNames = data.map(country => country.name.common); // Trích xuất tên quốc gia
        setCountries(countryNames.sort()); // Sắp xếp tên các nước theo bảng chữ cái
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleRegister = async() => {
    try {
      var pattern = /@/;
      var checkmail = pattern.test(email);
      if (firstName === '' || lastName === ''|| password==='' || rePassword==='' || email === '' || country ==='' ) {
        toast.error('Vui lòng điền đầy đủ thông tin vào các trường cần thiết!');
      } else if (!checkmail){
        toast.error('Định dạng email không chính xác!')
      } else if (password !== rePassword){
        toast.error('Mật khẩu không trùng khớp')
      } else if (!condition) {
        toast.error('Vui lòng chấp nhận điều khoản.')
      } else {
        const response = await request.post('/api/register',{
          firstName,
          lastName,
          email,
          password,
          country,
          companyName,
          website,
          traffic,
          isPublisher,
          isDeveloper,
        });
        toast.success(response.data.message); //Dky thanh con
      }
      
    } catch (error) {
      toast.error(error.response.data.message); // Dky that bai
    }
  }
  return (
    <>
    <ToastContainer />
    <div className="auth-container">
        <div className="buton-close-form">
            <button onClick={onClose}>
                <strong>x</strong>
            </button>
        </div>
        <div className="tabs">
            <button 
                className={`tab ${isLogin ? "active" : ""}`} 
                onClick={() => setIsLogin(true)}
            >
                Login
            </button>
            <button 
                className={`tab ${!isLogin ? "active" : ""}`} 
                onClick={() => setIsLogin(false)}
            >
                Registration
            </button>
        </div>

      {isLogin ? (
        <div className="form-content login-form">
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your email"
              value={email}
              onChange={ (e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Your password" 
              value={password}
              onChange= { (e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group checkbox-group-login">
            <div className="form-group checkbox-group-login">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="form-group checkbox-group-login">
              <Link to = '/forgot-password'>
              <a href="#" className="forgot-password">Forgot password?</a>
              </Link>
            </div>
          </div>
          
          <button className="auth-button" onClick={handleLogin} >Login</button>

          <div className="login-alternative">
            <p>or</p>

            {/* <GoogleLoginButton /> */}

          </div>
        </div>
      ) : (
        <div className="form-content register-form">
          <div className="checkbox-group">
            <div className="checkbox-group-a">
              <input 
                type="checkbox" 
                id="publisher" 
                defaultChecked 
                checked ={isPublisher}
                onChange={(e)=>setIsPublisher(e.target.checked)}
              />
              <label htmlFor="publisher">I am a Publisher</label>
            </div>
            <div className="checkbox-group-b">
              <input 
                type="checkbox" 
                id="developer" 
                checked ={isDeveloper}
                onChange={(e)=>setIsDeveloper(e.target.checked)}
              />
              <label htmlFor="developer">I am a Developer</label>
            </div>
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="First name" 
              value={firstName}
              onChange={(e)=>{setFirstName(e.target.value)}}
            />
            <input 
              type="text" 
              placeholder="Last name" 
              value={lastName}
              onChange={(e)=>{setLastname(e.target.value)}}
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Password" 
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input 
              type="text" 
              placeholder="Nhập lại Password" 
              value={rePassword}
              onChange={(e)=>{setRePassword(e.target.value)}}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your email" 
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div className="form-group">
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select a country</option>
                {countries.map((countryName, index) => (
                  <option key={index} value={countryName}>{countryName}</option>
                ))}
              </select>
            <input type="text" placeholder="Company name" value={companyName} onChange={(e)=>{setCompanyName(e.target.value)}} />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Your website" value={website} onChange={(e)=>{setWebsite(e.target.value)}}/>
            <select value={traffic} onChange={(e)=>setTraffic(e.target.value)}>
              <option>Expected traffic</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="captcha">
            {/* reCAPTCHA */}
            <p>reCAPTCHA here</p>
          </div>

          <div className="terms">
            <input type="checkbox" id="terms" checked={condition} onChange={(e)=>setCondition(e.target.checked)}/>
            <label htmlFor="terms">
              I ACCEPT the <a href="#">Terms and Conditions</a> and{" "}
              <a href="#">Platform Privacy Policy</a> of GameDistribution.com.
            </label>
          </div>

          <div className="terms">
            <input type="checkbox" id="azerion-terms" />
            <label htmlFor="azerion-terms">
              I ACCEPT the <a href="#">Terms and Conditions</a> and{" "}
              <a href="#">Privacy Policy</a> of Azerion Connect.
            </label>
          </div>

          <button className="auth-button" onClick={handleRegister}>Registration</button>
        </div>
        
      )}

    </div>
    </>
  );
};

export default Auth;
