import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Home';
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Profile/Checkout';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import { useSelector } from 'react-redux/es/exports';
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
function App() {
  const queryShopAll = '/myway/api/products/filterProducts?'
  const notify = useSelector((state: RootState) => state.notify)
  const handleLoginAndCart = useSelector((state: RootState) => state.auth)
  const ProtectedAdminRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const isAdmin = handleLoginAndCart.token && handleLoginAndCart.user.role === 'admin';
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAdmin) {
        navigate("/admin/login");
      }
    }, [isAdmin, navigate]);

    return <>{element}</>;
  };
  const ProtectedUserRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const isLogin = handleLoginAndCart.token
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLogin) {
        navigate("/account/login");
      }
    }, [isLogin, navigate]);

    return <>{element}</>;
  };
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
        <Route path='/account/login' element={<div><Header /> <Login /> <Footer /> </div>} />
        <Route path='/account/forgotpassword/*' element={<ForgotPasswordPage />} />
        <Route path='/account/signup' element={<div><Header /> <Signup /> <Footer /> </div>} />
        <Route path='/detail/:slug' element={<div><Header /> <Detail /> <Footer /> </div>} />
        <Route path='/profile/account/user/*' element={<ProtectedUserRoute element={<ProfileUser />} />} />
        <Route path='/collection/all' element={<PageShop queryApi={queryShopAll} queryString='category' />} />
        <Route path='/cart' element={<div><Header />  <Cart /> <Footer /> </div>} />
        <Route path='/checkout' element={<ProtectedUserRoute element={<div><Header /> <Checkout /> <Footer /> </div>} />} />
        <Route path='/success' element={<ProtectedUserRoute element={<PaymentSuccess />} />} />
        <Route path="/admin/login" element={<LoginAdminPage />} />
        <Route path="/myway/admin" element={<ProtectedAdminRoute element={<div><Admin><Outlet /></Admin></div>} />}>
          <Route index element={<div>THIS IS DASHBOARD</div>} />
          <Route path="product" element={<Product />} />
          <Route path="product/:idProd" element={<ChangeProduct />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="orders" element={<Order />} />
          <Route path="orders/:orderId" element={<DetailOrder />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
