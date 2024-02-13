import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct';
import Cart from './Components/Cart';

function App() {

  const[cartProduct, setCartProduct] = useState([]);

  const[amount, setAmount] = useState(0);  

  const[cartLength, setCartLength] = useState(0);

  async function loadCart() {
    const cartData = await axios.get(`http://localhost:8080/cart/displayCartProducts`);
    setCartProduct(cartData.data);
        
    let totalAmount = 0;

    cartData.data.forEach(element => {
      totalAmount += element.tempQty*element.productDiscountedPrice;
    });

    setAmount(totalAmount);
    setCartLength(cartData.data.length);
  }

  useEffect(()=>{
    loadCart();
  },[cartLength])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home cartLength={cartLength} loadCart={loadCart} />}></Route>
        <Route path='/addProduct' element={<AddProduct/>}></Route>
        <Route path='/editProduct/:id' element={<UpdateProduct/>}></Route>
        <Route path='/cart' element={<Cart cartProduct={cartProduct} loadCart={loadCart} amount={amount}/>}></Route>
      </Routes>
    </Router>    
  );
}

export default App;
