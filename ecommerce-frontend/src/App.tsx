import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Loader, { LoaderLayout } from './components/loader';
import Header from './components/header';
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { getUser } from './redux/api/userAPI';
import { RootState } from './redux/store';
import ProtectedRoute from './components/protected-route';
import Footer from './components/footer';

const Cart = lazy(() => import('./pages/cart'));
const Home = lazy(() => import('./pages/home'));
const Search = lazy(() => import('./pages/search'));
const Shipping = lazy(() => import('./pages/shipping'));
const Login = lazy(() => import('./pages/login'));
const Orders = lazy(() => import('./pages/orders'));
const OrderDetails = lazy(() => import('./pages/order-details'));
const NotFound = lazy(() => import('./pages/not-found'));
const ProductDetails = lazy(() => import('./pages/product-details'));
const Checkout = lazy(() => import('./pages/checkout'));

const Dashboard = lazy(() => import('./pages/admin/dashboard'));
const Products = lazy(() => import('./pages/admin/products'));
const Customers = lazy(() => import('./pages/admin/customers'));
const Transaction = lazy(() => import('./pages/admin/transaction'));
const Barcharts = lazy(() => import('./pages/admin/charts/barcharts'));
const Piecharts = lazy(() => import('./pages/admin/charts/piecharts'));
const Linecharts = lazy(() => import('./pages/admin/charts/linecharts'));
const Coupon = lazy(() => import('./pages/admin/apps/coupon'));
const NewProduct = lazy(() => import('./pages/admin/management/newproduct'));
const ProductManagement = lazy(() => import('./pages/admin/management/productmanagement'));
const TransactionManagement = lazy(() => import('./pages/admin/management/transactionmanagement'));
const Discount = lazy(() => import('./pages/admin/discount'));
const DiscountManagement = lazy(() => import('./pages/admin/management/discountmanagement'));
const NewDiscount = lazy(() => import('./pages/admin/management/newdiscount'));

const App = () => {
    const { user, loading } = useSelector((state: RootState) => state.userReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const data = await getUser(user.uid);
                dispatch(userExist(data.user));
            } else {
                dispatch(userNotExist());
            }
        });
    }, []);


    return loading
        ? (
            <Loader />
        ) : (
            <Router>
                <Header user={user} />

                <Suspense fallback={<LoaderLayout />}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/product/:id' element={<ProductDetails />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route
                            path='/login'
                            element={
                                <ProtectedRoute isAuthenticated={user ? false : true}>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />

                        <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
                            <Route path='/shipping' element={<Shipping />} />
                            <Route path='/orders' element={<Orders />} />
                            <Route path='/order/:id' element={<OrderDetails />} />
                            <Route path='/pay' element={<Checkout />} />
                        </Route>

                        <Route
                            element={
                                <ProtectedRoute
                                    isAuthenticated={true}
                                    adminOnly={true}
                                    admin={user?.role === 'admin' ? true : false}
                                />
                            }
                        >
                            <Route path='/admin/dashboard' element={<Dashboard />} />
                            <Route path='/admin/product' element={<Products />} />
                            <Route path='/admin/customer' element={<Customers />} />
                            <Route path='/admin/transaction' element={<Transaction />} />
                            <Route path='/admin/discount' element={<Discount />} />
                            <Route path='/admin/chart/bar' element={<Barcharts />} />
                            <Route path='/admin/chart/pie' element={<Piecharts />} />
                            <Route path='/admin/chart/line' element={<Linecharts />} />
                            <Route path='/admin/app/coupon' element={<Coupon />} />
                            <Route path='/admin/product/new' element={<NewProduct />} />
                            <Route path='/admin/product/:id' element={<ProductManagement />} />
                            <Route path='/admin/transaction/:id' element={<TransactionManagement />} />
                            <Route path='/admin/discount/new' element={<NewDiscount />} />
                            <Route path='/admin/discount/:id' element={<DiscountManagement />} />
                        </Route>
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense >
                <Footer />
                <Toaster position='bottom-center' />
            </Router>
        );
}

export default App;