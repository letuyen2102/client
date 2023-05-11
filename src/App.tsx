import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Home';
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import ProfileWithContent from './components/Profile/ProfileWithContent';
import DetailAccount from './components/Profile/DetailAccount';
import Change from './components/Profile/Change';
import History from './components/Profile/History';
import Checkout from './components/Profile/Checkout';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import DetailBooking from './components/DetailBooking/DetailBooking';
import ChangePhone from './components/Profile/ChangePhone';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from './store/store';
import Admin from './pages/admin/admin';
import Product from './components/Product/product';
import ChangeProduct from './components/Product/changeProduct';
import ProfileUser from './pages/profile/ProfileUser';
import PageShop from './pages/shop/Shop';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPassword';
import AddProduct from './components/AddProduct/AddProduct';
import Category from './components/category/Category';
import EachCategory from './components/categoryProduct/EachCategory';
function App() {
  const queryShopAll = '/myway/api/products/filterProducts?'
  const notify = useSelector((state: RootState) => state.notify)
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
        <Route path='/profile/account/user/*' element={<ProfileUser />} />
        <Route path='/collection/all' element={<PageShop queryApi={queryShopAll} queryString='category' />} />
        <Route path='/cart' element={<div><Header />  <Cart /> <Footer /> </div>} />
        <Route path='/checkout' element={<div><Header /> <Checkout /> <Footer /> </div>} />
        <Route path='/account/login' element={<div><Header /> <Login /> <Footer /> </div>} />
        <Route path='/success' element={<PaymentSuccess />} />


        <Route path='/myway/admin' element={<div><Admin> <Outlet /> </Admin> </div>}>
          <Route path='' element={<div>THIS IS DASHBOARD</div>} />
          <Route path='product' element={<Product />} />
          <Route path='product/:idProd' element={<ChangeProduct />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="categories" element={<Category />} />
          <Route path="categories/:cateId" element={<EachCategory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
