import { Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Home';
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Detail from './components/Detail/Detail';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';
import Title from './components/Tiltle/Title';
import Profile from './components/Profile/Profile';
import ProfileWithContent from './components/Profile/ProfileWithContent';
import DetailAccount from './components/Profile/DetailAccount';
import Change from './components/Profile/Change';
import History from './components/Profile/History';
import Checkout from './components/Profile/Checkout';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import DetailBooking from './components/DetailBooking/DetailBooking';
import ChangePhone from './components/Profile/ChangePhone';
import { Provider } from 'react-redux/es/exports';
import { store } from './store/store';
import Admin from './pages/admin/admin';
import Product from './pages/admin/Product/product';
import ChangeProduct from './pages/admin/Product/changeProduct';
import ProfileUser from './pages/profile/ProfileUser';
import Collection from './components/Collection/Collection';
import PageShop from './pages/shop/Shop';
function App() {
  const typeArr: string[] = ["Áo sơ mi", "Áo vest", "Chân váy ôm", "Chân váy xòe", "Jumpsuit", "Quần", "Set", "Đầm maxi", "Áo khoác", "Áo kiểu", "Áo dài"]
  const colorArr: string[] = ["Trắng", "Đen", "Vàng", "Be", "Hồng", "Đỏ", "Cam", "Tím", "Xanh", "Xanh lam", "Nâu", "Ghi"]
  const queryShopAll = '/myway/api/products/filterProducts?'
  const queryShopDam = '/myway/api/products/filterProducts?category=Dam&'
  const queryShopAo = '/myway/api/products/filterProducts?category=Ao&'
  const queryShopQuan = '/myway/api/products/filterProducts?category=Quan&'
  const queryShopChanVay = '/myway/api/products/filterProducts?category=ChanVay&'
  const queryShopJumpsuit = '/myway/api/products/filterProducts?category=Jumpsuit&'
  const titleShop = <Title>
    <ul>
      <li>
        <Link to='/' style={{ whiteSpace: 'pre' }}>Trang chủ  {'>'} </Link>
      </li>
      <li>
        <Link to=''>Tất cả sản phẩm</Link>
      </li>
    </ul>
  </Title>
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account/login' element={<div><Header /> <Login /> <Footer /> </div>} />
          <Route path='/account/signup' element={<div><Header /> <Signup /> <Footer /> </div>} />
          <Route path='/detail/:slug' element={<div><Header /> <Detail /> <Footer /> </div>} />
          <Route path='/profile/account/user/*' element={<ProfileUser />} />
          <Route path='/collection/all' element={<div><Header /> {titleShop} <Shop typeArr={typeArr} colorArr={colorArr} queryAPI={queryShopAll} />  <Footer /> </div>} />
          <Route path='/all' element={<PageShop queryApi={queryShopAll} />} />
          <Route path='/dam' element={<div><Header /> {titleShop} <Shop typeArr={["Đầm xòe", "Đầm maxi", "Đầm ôm"]} colorArr={colorArr} queryAPI={queryShopDam} />  <Footer /> </div>} />
          <Route path='/ao' element={<div><Header /> {titleShop} <Shop typeArr={["Áo sơ mi", "Áo vest", "Áo khoác", "Áo kiểu", "Áo dài"]} colorArr={colorArr} queryAPI={queryShopAo} />  <Footer /> </div>} />
          <Route path='/quan' element={<div><Header /> {titleShop} <Shop typeArr={[]} colorArr={colorArr} queryAPI={queryShopQuan} />  <Footer /> </div>} />
          <Route path='/chan-vay' element={<div><Header /> {titleShop} <Shop typeArr={["Chân váy ôm", "Chân váy xòe"]} colorArr={colorArr} queryAPI={queryShopChanVay} />  <Footer /> </div>} />
          <Route path='/jumpsuit' element={<div><Header /> {titleShop} <Shop typeArr={[]} colorArr={colorArr} queryAPI={queryShopJumpsuit} />  <Footer /> </div>} />
          <Route path='/cart' element={<div><Header />  <Cart /> <Footer /> </div>} />
          <Route path='/checkout' element={<div><Header /> <Checkout /> <Footer /> </div>} />
          <Route path='/account/login' element={<div><Header /> <Login /> <Footer /> </div>} />
          <Route path='/success' element={<PaymentSuccess />} />
          <Route path='/profile' element={<div><Header /><Profile> <Outlet /> </Profile> <Footer /></div>}>
            <Route path='customer' element={<ProfileWithContent />} />
            <Route path='detailAccount' element={<DetailAccount />} />
            <Route path='customer/editPassword' element={<Change />} />
            <Route path='customer/editPhone' element={<ChangePhone />} />
            <Route path='history' element={<History />} />
            <Route path='history/order/:orderId' element={<DetailBooking />} />
            <Route index element={<Navigate to="/profile/customer" />} />
          </Route>

          <Route path='/myway/admin' element={<div><Admin> <Outlet /> </Admin> </div>}>
            <Route path='' element={<div>THIS IS DASHBOARD</div>} />
            <Route path='product' element={<Product />} />
            <Route path='product/:idProd' element={<ChangeProduct />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
