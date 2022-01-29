import React, { Fragment, useEffect} from 'react';
import {BrowserRouter, Routes, Route,  Navigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import styles from './App.module.css';
import {HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCart, PlaceOrder} from './pages';
import {useSelector} from "./redux/hooks"
import { getShoppingCart } from './redux/shoppingCart/slice';

const PrivateRoute = ({ isAuthenticated, children}) => {  
    return (isAuthenticated ?
      children :
      <Navigate to="/signIn" />)
}


function App() {
  const jwt = useSelector(state => state.user.token)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(jwt){
      dispatch(getShoppingCart(jwt))
    }
  },[jwt])

  return (
    <div className={styles.App}>
       <BrowserRouter>
       <Fragment>
       <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signIn/" element={<SignInPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/detail/:touristRouteId" element={<DetailPage/>} />
            <Route path="/search/:keywords" element={<SearchPage/>} />
            <Route path="/search/*" element={<SearchPage/>} />
            <Route path="/shoppingCart" element={<PrivateRoute isAuthenticated={jwt != null}><ShoppingCart /></PrivateRoute>} />
            <Route path="/placeOrder" element={<PrivateRoute isAuthenticated={jwt != null}><PlaceOrder /></PrivateRoute>} />
            <Route path="*" element={<h1>Not Found</h1>}/>
          </Routes> 
       </Fragment>
              
       </BrowserRouter>
    </div>
  );
}

export default App;
