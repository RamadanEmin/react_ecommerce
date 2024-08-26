import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/loader';
import Header from './components/header';
import { Toaster } from 'react-hot-toast';

const Cart = lazy(() => import('./pages/cart'));
const Home = lazy(() => import('./pages/home'));
const Search = lazy(() => import('./pages/search'));
const Shipping = lazy(() => import('./pages/shipping'));
const Login = lazy(() => import('./pages/login'));
const Orders = lazy(() => import('./pages/orders'));
const OrderDetails = lazy(() => import('./pages/order-details'));

const Dashboard = lazy(() => import('./pages/admin/dashboard'));
const Products = lazy(() => import('./pages/admin/products'));
const Customers = lazy(() => import('./pages/admin/customers'));
const Transaction = lazy(() => import('./pages/admin/transaction'));
const Barcharts = lazy(() => import('./pages/admin/charts/barcharts'));
const Piecharts = lazy(() => import('./pages/admin/charts/piecharts'));
const Linecharts = lazy(() => import('./pages/admin/charts/linecharts'));
const Coupon = lazy(() => import('./pages/admin/apps/coupon'));
const NewProduct = lazy(() => import('./pages/admin/management/newproduct'));
const ProductManagement = lazy(
    () => import('./pages/admin/management/productmanagement')
);
const TransactionManagement = lazy(
    () => import('./pages/admin/management/transactionmanagement')
);

const App = () => {
    return (
        <Router>
            <Header />

            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/login' element={<Login />} />

                    <Route>
                        <Route path='/shipping' element={<Shipping />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/order/:id' element={<OrderDetails />} />
                    </Route>

                    <Route>
                        <Route path='/admin/dashboard' element={<Dashboard />} />
                        <Route path='/admin/product' element={<Products />} />
                        <Route path='/admin/customer' element={<Customers />} />
                        <Route path='/admin/transaction' element={<Transaction />} />

                        <Route path='/admin/chart/bar' element={<Barcharts />} />
                        <Route path='/admin/chart/pie' element={<Piecharts />} />
                        <Route path='/admin/chart/line' element={<Linecharts />} />

                        <Route path='/admin/app/coupon' element={<Coupon />} />

                        <Route path='/admin/product/new' element={<NewProduct />} />

                        <Route path='/admin/product/:id' element={<ProductManagement />} />

                        <Route path='/admin/transaction/:id' element={<TransactionManagement />} />
                    </Route>
                </Routes>
            </Suspense >
            <Toaster position='bottom-center' />
        </Router>

    )
}

export default App;