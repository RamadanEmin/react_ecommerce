import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cart from './pages/cart';
import Home from './pages/home';
import Search from './pages/search';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Routes>
        </Router>
    )
}

export default App;