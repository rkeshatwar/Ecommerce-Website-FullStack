import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddProduct() {

    const[product, setProduct] = useState([]);

    const {productName, brand, productCategory, subCategory, productPrice, discountedPrice, productQty} = product;

    function OnInputChange(e) {
        setProduct({...product,[e.target.name]:e.target.value});
    }

    const navigate = useNavigate();

    const onSubmit = async(e)=>{
        e.preventDefault();
        await axios.post(`http://localhost:8080/product/addNewProduct`, product);
        navigate("/");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                <h2 className='text-center text-primary m-4'>ADD NEW PRODUCT</h2>
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='text-center mb-3'>
                        <label htmlFor='name' className='form-label'>Product Name</label>
                        <input
                        type='text' 
                        className='form-control' 
                        placeholder='Enter Product Name' 
                        name='productName'
                        value={productName}
                        onChange={(e)=>OnInputChange(e)}>
                        </input>
                        <label htmlFor='userName' className='form-label'>Brand</label>
                        <input
                        type='text' 
                        className='form-control' 
                        placeholder='Enter Brand Name' 
                        name='brand'
                        value={brand}
                        onChange={(e)=>OnInputChange(e)}>
                        </input>
                        <label htmlFor='email' className='form-label'>Product Category</label>
                        <input
                        type='text' 
                        className='form-control' 
                        placeholder='Enter Your Product Category' 
                        name='productCategory'
                        value={productCategory}
                        onChange={(e)=>OnInputChange(e)}>
                        </input>
                        <label htmlFor='email' className='form-label'>Sub Category</label>
                        <input
                        type='text' 
                        className='form-control' 
                        placeholder='Enter Your Sub Category' 
                        name='subCategory'
                        value={subCategory}
                        onChange={(e)=>OnInputChange(e)}>
                        </input>
                        <label htmlFor='email' className='form-label'>Price</label>
                        <input
                        type='text' 
                        className='form-control' 
                        placeholder='Enter Your Price' 
                        name='productPrice'
                        value={productPrice}
                        onChange={(e)=>OnInputChange(e)}>
                        </input>
                        <label htmlFor='email' className='form-label'>Discounted Price</label>
                        <input
                            type='text' 
                            className='form-control' 
                            placeholder='Enter Your Discounted Price'
                            name='discountedPrice'
                            value={discountedPrice}
                            onChange={(e)=>OnInputChange(e)}>
                            </input>
                            <label htmlFor='email' className='form-label'>Quantity</label>
                            <input
                            type='text' 
                            className='form-control' 
                            placeholder='Enter Your Quantity' 
                            name='productQty'
                            value={productQty}
                            onChange={(e)=>OnInputChange(e)}>
                            </input>
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
