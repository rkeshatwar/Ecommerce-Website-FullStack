import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar';

export default function Home({cartLength, loadCart}) {

    const[products, setProducts] = useState([]);

    const[cartDataLength, setCartDataLength] = useState(0);


    async function fetchProducts() {
        try {
            const result = await axios.get("http://localhost:8080/product/displayProducts");
            setProducts(result.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        setCartDataLength(cartLength);
        fetchProducts();
    }, [cartLength]);

    const navigate = useNavigate();

    const addToCart = async (id)=>{
        const data = await axios.post(`http://localhost:8080/cart/addToCart/${id}`);
        console.log(data.data);
        setCartDataLength(cartLength);
        loadCart();
        navigate("/")
        fetchProducts();
    }

    async function deleteProduct(id) {
        try{
            await axios.delete(`http://localhost:8080/product/deleteProduct/${id}`);
            fetchProducts();
        } catch(error) {
            console.log("Error deleting products:", error)
        }
    }

  return (
    <div>
        <Navbar cartLength={cartDataLength}/>
        <div className='container'>
            <div className='py-4'>
                <h2 className='text-center text-secondary'><u>PRODUCT LIST</u></h2>
                <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>NAME</th>
                            <th scope='col'>BRAND</th>
                            <th scope='col'>CATEGORY</th>
                            <th scope='col'>PRICE</th>
                            <th scope='col'>QTY</th>
                            <th scope='col'>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((products,index)=>{
                            return(
                                <tr>
                                    <th scope='col' key={products.productId}>{index+1}</th>
                                    <td>{products.productName}</td>
                                    <td>{products.brand}</td>
                                    <td>{products.productCategory}</td>
                                    <td><s>₹{products.productPrice}/-</s><br/>₹{products.discountedPrice}/-</td>
                                    <td>{products.productQty}</td>
                                    <td>
                                        <button className='btn btn-outline-secondary mx-1' onClick={()=>addToCart(products.productId)}>🛒</button>
                                        <Link className='btn btn-outline-warning mx-1' to={`/editProduct/${products.productId}`}>
                                            <img src='https://cdn-icons-png.flaticon.com/128/10629/10629723.png' alt='' style={{height:'25px'}}/>
                                        </Link>
                                        <button className='btn btn-outline-danger mx-1' onClick={()=>{deleteProduct(products.productId)}}>
                                            <img src='https://cdn-icons-png.flaticon.com/128/6861/6861362.png' alt='' style={{height:'25px'}}/>
                                        </button>
                                    </td>
                                </tr>                   
                            )
                        })}
                                
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
