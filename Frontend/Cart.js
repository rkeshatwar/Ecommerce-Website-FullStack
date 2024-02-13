import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GooglePayButton from '@google-pay/button-react'

export default function Cart({cartProduct, loadCart, amount}) {    

    useEffect(()=>{
        loadCart();
    })

    const decrement = async(id)=> {
        await axios.post(`http://localhost:8080/cart/decreaseCartProduct/${id}`)
        loadCart();
    }

    const increment = async(id)=> {
        await axios.post(`http://localhost:8080/cart/increaseCartProduct/${id}`)
        loadCart();
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary position-sticky top-0">
        <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src='https://cdn-icons-png.flaticon.com/128/869/869636.png' alt='' style={{height:'35px'}}></img> SUPER MART</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div>
                    <Link className='btn btn-outline-light mx-3' to={"/"}>🏡 Home</Link>
                </div>
            </div>
        </nav>


        <div className='container'>
            <div className='py-4'>
                <h2 className='text-center text-secondary'><u>CART LIST</u></h2>
                <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>NAME</th>
                            <th scope='col'>PRICE</th>
                            <th scope='col'>DISCOUNTED PRICE</th>
                            <th scope='col'>QTY</th>
                            <th scope='col'>TOTAL<br/>AMOUNT</th>
                            <th scope='col'>DISCOUNTED<br/>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartProduct.map((product, index)=>{
                            return(
                                <tr>
                                    <th scope='col' key={index}>{index+1}</th>
                                    <td>{product.productName}</td>
                                    <td><s>₹{product.productPrice}/-</s></td>
                                    <td>₹{product.productDiscountedPrice}/-</td>
                                    <td>
                                    <button className='btn btn-outline-secondary' onClick={()=>{decrement(product.cartId)}}>➖</button>
                                        <span className='border m-1 p-2'>{product.tempQty}</span>
                                        <button className='btn btn-outline-secondary' onClick={()=>{increment(product.cartId)}}>➕</button>
                                    </td>
                                    <td><s>₹{(product.tempQty)*(product.productPrice)}/-</s></td>
                                    <th scope='col'>₹{(product.tempQty)*(product.productDiscountedPrice)}/-</th>
                                </tr>         
                            )
                        })}     
                        <tr>
                            <th colSpan={7} className='text-center'>
                                <h4><u>TOTAL PAYABLE AMOUNT : ₹{amount}/-</u></h4><br/>

                                {/*GooglePayButton*/}
                                <GooglePayButton
                                environment="TEST"
                                paymentRequest={{
                                    apiVersion: 2,
                                    apiVersionMinor: 0,
                                    allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                        },
                                        tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId',
                                        },
                                        },
                                    },
                                    ],
                                    merchantInfo: {
                                    merchantId: '12345678901234567890',
                                    merchantName: 'Demo Merchant',
                                    },
                                    transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: '100.00',
                                    currencyCode: 'USD',
                                    countryCode: 'US',
                                    },
                                }}
                                onLoadPaymentData={paymentRequest => {
                                    console.log('load payment data', paymentRequest);
                                }}
                                />
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
