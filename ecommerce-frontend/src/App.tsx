import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/loader';

const Cart = lazy(() => import('./pages/cart'));
const Home = lazy(() => import('./pages/home'));
const Search = lazy(() => import('./pages/search'));

const Dashboard = lazy(() => import('./pages/admin/dashboard'));
const Products = lazy(() => import('./pages/admin/products'));
const Customers = lazy(() => import('./pages/admin/customers'));
const Transaction = lazy(() => import('./pages/admin/transaction'));
const Barcharts = lazy(() => import('./pages/admin/charts/barcharts'));
const Piecharts = lazy(() => import('./pages/admin/charts/piecharts'));
const Linecharts = lazy(() => import('./pages/admin/charts/linecharts'));
const Coupon = lazy(() => import('./pages/admin/apps/coupon'));

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/cart' element={<Cart />} />

                    <Route>
                        <Route path='/admin/dashboard' element={<Dashboard />} />
                        <Route path='/admin/product' element={<Products />} />
                        <Route path='/admin/customer' element={<Customers />} />
                        <Route path='/admin/transaction' element={<Transaction />} />

                        <Route path='/admin/chart/bar' element={<Barcharts />} />
                        <Route path='/admin/chart/pie' element={<Piecharts />} />
                        <Route path='/admin/chart/line' element={<Linecharts />} />

                        <Route path='/admin/app/coupon' element={<Coupon />} />
                    </Route>
                </Routes>
            </Router>
        </Suspense >

    )
}

export default App;