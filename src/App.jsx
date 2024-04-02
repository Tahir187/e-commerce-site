import { lazy,Suspense  } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// pages
import {CategoryProduct, ProductSingle, Cart, Search} from "./pages/index";
// components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import store from "./store/store";
import {Provider} from "react-redux";
import { Loader } from './components';
const Home = lazy(() => import('./pages/HomePage'));


function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
          <Header />
          {/* <NewNavbar /> */}
          <Sidebar />

          <Routes>
            {/* home page route */}
            <Route path = "/" element = {<Suspense fallback={<Loader />}><Home /></Suspense> } />
            {/* single product route */}
            <Route path = "/product/:id" element = {<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            {/* cart */}
            <Route path = "/cart" element = {<Cart />} />
            {/* searched products */}
            <Route path = "/search/:searchTerm" element = {<Search />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;