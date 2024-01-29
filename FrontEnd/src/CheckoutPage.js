// CheckoutPage.jsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CardDetailsForm from './CardDetails';
const CheckoutPage = () => {
    const location = useLocation();//it's quit remarkable, the double champ does what the f*ck he wants
     const orders = location.state?.total || 0;
     console.log(orders[1].price)
     const screenHeight= window.screenHeight
    const [cart, setcart] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        useBillingForShipping: true,
        shippingAddress: '',
        paymentMethod: 'creditCard',
        orders:orders,
    });
   
    
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setFormData((prevData) => ({
            ...prevData,
            useBillingForShipping: !prevData.useBillingForShipping,
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            paymentMethod: e.target.value,
        }));
    };

    const handlePlaceOrder = async() => {
        try{
        const response = await fetch("http://3.210.184.253:8080/orders",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),  
        })
        console.log('Placing Order:', formData);
        if(response.ok){
            console.log("order saved successfully")
        }
        else{
            console.log("something went wrong")
        }
    }
    catch(error){
            console.log("Internal server error"+error)
    }
    };
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total = total + orders[i].price;
    }

    return (
        <div className="container-fluid product m-auto" style={{ background: "black" }}>
            <div className="row m-auto" style={{ height: `${screenHeight}`, overflow: 'scroll',flexWrap:"wrap-reverse" }}>
                <div className="col-lg-7 m-auto" style={{ height: '700px', overflow: 'scroll' }} >
                    <h3 className="mb-3">Contact Information</h3>
                    <div className=" row cb ">

                        <div className="h col-6 col-sm-6 col-lg-4">
                            <label htmlFor="fullName" className="form-label">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="h col-6 col-sm-6 col-lg-4">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className=" h col-6 col-sm-6 col-lg-4">
                            <label htmlFor="phone" className="form-label">
                                Phone:
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <h3 className="mb-3">Billing Address</h3>
                    <div className=" cb row">

                        <div className=" mb-3 h col-6 col-sm-6 col-lg-4">
                            <label htmlFor="address" className="form-label">
                                Street  Address:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className="mb-3 h col-6 col-sm-6 col-lg-4">
                            <label htmlFor="city" className="form-label">
                                City:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className="mb-3 h col-6 col-sm-6 col-lg-4">
                            <label htmlFor="state" className="form-label">
                                State:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                            />
                        </div>



                        <div className="mb-3 h col-6 col-sm-6 col-lg-4">
                            <label htmlFor="country" className="form-label">
                                Country:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                        </div>

                    </div>

                    <div className="mb-5 ">
                        <h3 className="mb-3">Payment Information</h3>
                        <div className="mb-5">
                            <div>
                                <label className="form-label">Payment Method:</label>
                                <div className="  form-check m-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="cashOnDelivery"
                                    name="paymentMethod"
                                    value="cashOnDelivery"
                                    checked={formData.paymentMethod === "cashOnDelivery"}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label className="form-check-label" htmlFor="cashOnDelivery">
                                    Cash on Delivery
                                </label>
                            </div>
                                <div className=" form-check m-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="creditCard"
                                        name="paymentMethod"
                                        value="creditCard"
                                        checked={formData.paymentMethod === 'creditCard'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="creditCard">
                                        Credit Card
                                    </label>
                                </div>

                                {formData.paymentMethod === 'creditCard' && <CardDetailsForm />}
                            </div>

                            
                            <div className="form-check m-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="upi"
                                    name="paymentMethod"
                                    value="upi"
                                    checked={formData.paymentMethod === "upi"}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label className="form-check-label" htmlFor="upi">
                                    UPI
                                </label>
                            </div>
                            {/* Add other payment methods */}
                        </div>

                    </div>


                </div>
                <div className="col-lg-5 h">
                    <div className="card ">
                        <div className="card-body bg-dark ">
                            {/* Order Summary */}
                            <h3 className="mb-3">Order Summary</h3>
                            <div className="cb card-body text-white mx-auto  border-top h">
                                <p className="card-title m-1"> total items charge:  {total} |</p>
                                <p className="card-title m-1">Delivery Amount : 40 |</p>

                            </div>
                            <div className="total-amount h">
                                <p>Total Order Amount:  items + delivery ={total+40}</p>
                                <button type="button" className="btn btn-primary m-1" onClick={handlePlaceOrder}>
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
};

export default CheckoutPage;
