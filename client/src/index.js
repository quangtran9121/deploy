import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { publicRoutes, privateRoutes, AppWithProvider } from './Route';
import { jwtDecode } from 'jwt-decode';
import LoginRequiredRoute from './middleware/ProtectedRoute';
import LogoutRequiredRoute from './middleware/LogoutRequire';
const token = document.cookie;
const isLoggedIn = Boolean(token);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="720754364839-7o4uruo7gfbdhf80605327424kfkl1jv.apps.googleusercontent.com"> */}
    {/* <Provider store={store}> */}
            <Router>
                <Routes>
                      {publicRoutes.map((route, index) => {
                        if (route.requiresLogin){
                          return <Route key = {index} path={route.path} element={
                            <LoginRequiredRoute isLoggedIn={isLoggedIn}  redirectPath= '/'>
                              {route.element}
                            </LoginRequiredRoute>
                          }/>
                        }
                        if (route.requiresLogout){
                          return <Route key={index} path={route.path} element={
                            <LogoutRequiredRoute isLoggedIn={isLoggedIn} redirectPath='/'>
                              {route.element}
                            </LogoutRequiredRoute>
                          }/>
                        }
                        return <Route key={index} path={route.path} element={route.element} />;
                      })}
                      {privateRoutes.map((route, index) => {
                        // const token =document.cookie;
                        if (token){
                          const decode = jwtDecode(token);
                          console.log(decode);
                          if (decode.admin){
                            return <Route key ={index} path={route.path} element={route.element} />;
                          } else {
                            return <Route path="/" element={<App />} />
                          }
                          
                        }

                      })}
                      {/* {privateRoutes.map((route, index) => {
                        const token = document.cookie;
                        console.log(token);
                        if (token) {
                          const decode = jwtDecode(token);
                          if (decode.isAdmin) {
                            return <Route key={index} path={route.path} element={route.element} />}
                          } else {
                            return <Route path="/" element={<App />} />
                          }
                        }
                      ) 
                      }
    */}
                </Routes>
            </Router>
    {/* </Provider> */}
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
