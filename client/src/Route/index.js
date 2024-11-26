import React from 'react';
import App from '../App';
import Auth from '../Pages/Login/Auth';
import GameCommon from '../Pages/GameCommon/Game';
import DefaultLayout from '../Pages/Admin/DefaultLayout/DefaultLayout';
import GameDetail from '../Pages/GameDetail/GameDetail';
import UserProfile from '../Pages/UserProfile/UserProfile';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import VerifyCode from '../Pages/ForgotPassword/Verify';
import CheckUser from '../Pages/ForgotPassword/CheckUser';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const publicRoutes = [
  { path: '/', element: <App /> },
  { path: '/Auth', element: <Auth />, requiresLogout: true },
  { path: '/games', element: <GameCommon /> },
  { path: '/games/:slug', element: <GameDetail /> },
  { path: '/profile', element: <UserProfile />, requiresLogin: true },
  { path: '/forgot-password', element: <ForgotPassword />, requiresLogout: true },
  { path: '/forgot-password/:token', element: <VerifyCode />, requiresLogout: true },
  { path: '/forgot-password/reset-password-option', element: <CheckUser />, requiresLogout: true },
];

export const privateRoutes = [
  { path: '/admin', element: <DefaultLayout /> },
];


// const AllRoute = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/Auth" element={<Auth />} />
//       </Routes>
//     </Router>
//   );
// };
// export default AllRoute;