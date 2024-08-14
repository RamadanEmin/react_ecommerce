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
                    </Route>
                </Routes>
            </Router>
        </Suspense >

    )
}

export default App;