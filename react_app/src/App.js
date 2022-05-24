import Home from "./Pages/HomePage/Home";
import ProductDetail from "./Pages/ProductDetailPage/ProductDetail";
import Cart from "./Pages/CartPage/Cart";
import {BrowserRouter, Route, Routes, HashRouter} from 'react-router-dom'
import Login from "./Pages/LoginPage/Login";
import SignUp from "./Pages/SigupPage/SignUp";
import Profile from "./Pages/ProfilePage/Profile";
import Shipping from "./Pages/CheckoutPages/Shipping";
import Checkout from "./Pages/CheckoutPages/Checkout";
import Payment from "./Pages/CheckoutPages/Payment";
import PlaceOrder from "./Pages/CheckoutPages/PlaceOrder";
import OrderDetail from "./Pages/ProfilePage/OrderDetail";
import Admin from "./Admin/Admin";
import Users from './Admin/UserAdmin/Users'
import UserEdit from "./Admin/UserAdmin/UserEdit";
import Page404 from "./Pages/components/Page404";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from "./Admin/ProductAdmin/ProductList";
import Error404Admin from "./Admin/components/Error404Admin";
import Reviews from "./Pages/ProductDetailPage/Reviews";
import PasswordReset from "./Pages/ResetPassword/PasswordReset";
import PhoneNumber from "./Pages/ResetPassword/PhoneNumber";
import ConfirmCode from "./Pages/ResetPassword/ConfirmCode";
import ConfirmCodeSignup from "./Pages/SigupPage/ConfirmCodeSignup";
import NewPassword from "./Pages/ResetPassword/NewPassword";
import SearchProductsList from "./Pages/ShoppingList/SearchProductsList";
import Wishlist from "./Pages/CartPage/Wishlist";

function App() {

  return (
      <HashRouter >
          <div className="body-wrapper">

              <Routes>
                  <Route path='/' element={<Home />} exact />
                  <Route path='/product/:id' element={<ProductDetail />}>
                      <Route index element={<Reviews />} />
                      <Route path='review' element={<Reviews />} />
                      <Route path='detail' element={<Reviews />} />
                  </Route>
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/wishlist' element={<Wishlist />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/signup/confirm-code' element={<ConfirmCodeSignup />} />

                  <Route path='/profile' element={<Profile />} />
                  <Route path='/password-reset' element={<PasswordReset />}>
                      <Route index element={<PhoneNumber />} />
                      <Route path='send-verification-code' element={<PhoneNumber />} />
                      <Route path='confirm-code' element={<ConfirmCode />} />
                      <Route path='new-password' element={<NewPassword />} />
                  </Route>

                  <Route path='/checkout' element={<Checkout />}>
                      <Route index element={<Shipping />} />
                      <Route path='shipping' element={<Shipping />} />
                      <Route path='payment' element={<Payment />} />
                      <Route path='place-order' element={<PlaceOrder />} />
                  </Route>
                  <Route path='order/:id' element={<OrderDetail />} />

                  <Route path='/admin' element={<Admin />}>
                      <Route path='users' element={<Users />} />
                      <Route path='user/:id/edit' element={<UserEdit />} />
                      <Route path='products' element={<ProductList />} />
                      {/*<Route path='product/:id/edit' element={<UserEdit />}/>*/}

                      <Route path={'*'} element={<Error404Admin />} />
                  </Route>

                  {/*<Route path='/search?:q' element=*/}
                  <Route path='/search' element={<SearchProductsList />} />

                  <Route path='/admin' element={<Admin />} />



                  <Route path={'*'} element={<Page404 />} />


              </Routes>


          </div>
          <ToastContainer/>
      </HashRouter>


  );
}

export default App;
