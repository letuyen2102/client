import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import jwtDecode from 'jwt-decode';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Home';
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
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
import Dashboard from './pages/dashboard/Dashboard';
import Chat from './components/Chat/Chat';
import 'react-chat-widget/lib/styles.css';
import axios from "axios";
import io from 'socket.io-client'
import AdminChat from './pages/adminChat/AdminChat';
import Stat from './components/Stats/Stat';
import Test from './pages/test/Test';
import SignupAdminPage from './pages/SignupAdminPage/SignupAdminPage';
import Reset from './pages/resetPassword/Reset';
const socket = io('https://myway-shop-app-api.onrender.com')
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryShopAll = '/myway/api/products/filterProducts?'
  const API = '/myway/api/bookings/getAllBookings'
  const notify = useSelector((state: RootState) => state.notify)
  const handleLoginAndCart = useSelector((state: RootState) => state.auth)
  const [showChat, setShowChat] = useState(false)
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  console.log(room)
  const joinRoom = () => {
    socket.emit("join_room", handleLoginAndCart.user._id.toString())
    console.log("hello")
    setShowChat(true)
  }
  useEffect(() => {
    const checkTokenExpiration = () => {
      const cookieExpire = handleLoginAndCart.timeExpire;
      const now = new Date().getTime();
      if (handleLoginAndCart.timeExpire && cookieExpire - now <= 0) {
        if (window.confirm("Phiên đăng nhập hết hạn , vui lòng đăng nhập lại")) {
          dispatch(logout());
          window.location.reload()
        }
      }
    };
    const interval = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(interval);
  }, [handleLoginAndCart]);

  return (
    <div className="App">
      {notify.show && notify.status === 200 && <div className='notify_message_success'>
        <p>{notify.message} </p>
      </div>}
      {notify.show && notify.status === 400 && <div className='notify_message_error'>
        <p>{notify.message} </p>
      </div>}
      {
        showChat ? <div style={{ width: '300px', height: '400px', position: 'fixed', bottom: '50px', right: '50px', zIndex: '100' }}>
          <Chat setShowChat={setShowChat} socket={socket} room={handleLoginAndCart.user._id.toString()} username={handleLoginAndCart.user} />
        </div> : (handleLoginAndCart.user.role === 'user' && <button
          style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: '100', padding: '10px', borderRadius: '10px', backgroundColor: '#00b156', color: '#fff' }}

          onClick={() => { joinRoom() }}
        >CHAT</button>)
      }

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account/login' element={<ProtectedUserRoute element={<div><Header /> <Login /> <Footer /> </div>} />} />
        <Route path='/account/signup' element={<ProtectedUserRoute element={<div><Header /> <Signup /> <Footer /> </div>} />} />
        <Route path='/account/forgotpassword/*' element={<ForgotPasswordPage />} />
        <Route path='/detail/:slug' element={<div><Header /> <Detail /> <Footer /> </div>} />
        <Route path='/profile/account/user/*' element={<ProtectedUserRoute element={<ProfileUser />} />} />
        <Route path='/collection/all' element={<PageShop queryApi={queryShopAll} queryString='category' />} />
        <Route path='/cart' element={<div><Header />  <Cart /> <Footer /> </div>} />
        <Route path='/checkout' element={<ProtectedUserRoute element={<div><Header /> <Checkout /> <Footer /> </div>} />} />
        <Route path='/success' element={<ProtectedUserRoute element={<PaymentSuccess />} />} />
        <Route path="/admin/login" element={<ProtectedAdminRoute element={<LoginAdminPage />} />} />
        <Route path="/admin/signup" element={<SignupAdminPage />} />
        <Route path="/myway/admin" element={<ProtectedAdminRoute element={<div><Admin><Outlet /></Admin></div>} />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:idProd" element={<ChangeProduct />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="users" element={<User />} />
          <Route path="user/:userId" element={<DetailUser />} />
          <Route path="orders" element={<Order API={API} />} />
          <Route path="user/:idUser/orders" element={<GetBookingBaseOnUser />} />
          <Route path="orders/:orderId" element={<DetailOrder />} />
          <Route path="chats" element={<AdminChat socket={socket} />} />


        </Route>
        <Route path='/account/user/resetPassword/:resetToken' element={<Reset />} />
      </Routes>
    </div >
  );
}

export default App;
