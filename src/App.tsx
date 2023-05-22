import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Home';
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Profile/Checkout';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { RootState } from './store/store';
import Admin from './pages/admin/admin';
import Product from './components/Product/product';
import ChangeProduct from './components/Product/changeProduct';
import ProfileUser from './pages/profile/ProfileUser';
import PageShop from './pages/shop/Shop';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPassword';
import AddProduct from './components/AddProduct/AddProduct';
import Order from './components/orderDetail/Order';
import DetailOrder from './components/SectionProfile/DetailOrder';
import LoginAdminPage from './pages/loginAdminpage/LoginAdminPage';
import { useEffect } from 'react';
import { logout } from './slices/authSlice';
import { ProtectedAdminRoute, ProtectedUserRoute } from './components/RouteProtect/RouteProtect';
import User from './pages/user/User';
import DetailUser from './pages/detailUser/DetailUser';
import GetBookingBaseOnUser from './pages/getBookingBaseOnUser/GetBookingBaseOnUser';
function App() {
  const queryShopAll = '/myway/api/products/filterProducts?'
  const API = '/myway/api/bookings/getAllBookings'
  const notify = useSelector((state: RootState) => state.notify)
  const handleLoginAndCart = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const getCookieValue = (cookieName: string) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      const name = cookie[0];
      const value = cookie[1];

      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }

    return null;
  };
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = getCookieValue('jwt');
      if (token) {
        try {
          const decodedToken = jwtDecode<{ exp: number }>(token);
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();
          if (currentTime > expirationTime) {
            if (window.confirm('Phiên đăng nhập đã hết hạn , vui lòng đăng nhập lại')) {
              dispatch(logout())
              navigate('/account/login')
            }
          }
        } catch (error) {
          console.log('Lỗi giải mã JWT:', error);
        }
      }
    };
    const interval = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      {notify.show && notify.status === 200 && <div className='notify_message_success'>
        <p>{notify.message} </p>
      </div>}
      {notify.show && notify.status === 400 && <div className='notify_message_error'>
        <p>{notify.message} </p>
      </div>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account/login' element={<ProtectedUserRoute element={<div><Header /> <Login /> <Footer /> </div>} />} />
        <Route path='/account/forgotpassword/*' element={<ForgotPasswordPage />} />
        <Route path='/account/signup' element={<ProtectedUserRoute element={<div><Header /> <Signup /> <Footer /> </div>} />} />
        <Route path='/detail/:slug' element={<div><Header /> <Detail /> <Footer /> </div>} />
        <Route path='/profile/account/user/*' element={<ProtectedUserRoute element={<ProfileUser />} />} />
        <Route path='/collection/all' element={<PageShop queryApi={queryShopAll} queryString='category' />} />
        <Route path='/cart' element={<div><Header />  <Cart /> <Footer /> </div>} />
        <Route path='/checkout' element={<ProtectedUserRoute element={<div><Header /> <Checkout /> <Footer /> </div>} />} />
        <Route path='/success' element={<ProtectedUserRoute element={<PaymentSuccess />} />} />
        <Route path="/admin/login" element={<ProtectedAdminRoute element={<LoginAdminPage />} />} />
        <Route path="/myway/admin" element={<ProtectedAdminRoute element={<div><Admin><Outlet /></Admin></div>} />}>
          <Route index element={<div>THIS IS DASHBOARD</div>} />
          <Route path="product" element={<Product />} />
          <Route path="product/:idProd" element={<ChangeProduct />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="users" element={<User />} />
          <Route path="user/:userId" element={<DetailUser />} />
          <Route path="orders" element={<Order API={API} />} />
          <Route path="user/:idUser/orders" element={<GetBookingBaseOnUser />} />
          <Route path="orders/:orderId" element={<DetailOrder />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
