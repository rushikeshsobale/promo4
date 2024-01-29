import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Mycart() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Rloading, setRloading]=useState(true)
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();

  const getCookie = (name) => {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const token = getCookie("token");

  const fetchUserCart = async () => {
    try {
      const response = await fetch('http://3.210.184.253:8080/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });

      if (response.ok) {
        const userProfile = await response.json();
        setdata(userProfile.newItem);
        setLoading(false);
        setFlag(true);
      } else {
        console.error('Error fetching user profile:', response.statusText);
        setFlag(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await fetch(`http://3.210.184.253:8080/removeFromCart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log('Item removed from cart successfully');
        fetchUserCart();
        setRloading(false)
      } else {
        console.error('Error removing item from cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total = total + data[i].price;
  }

  if (loading) {
    return <div className="container-fluid m-auto product d-block bg-dark " style={{height:"900px", overflow:"scroll"}}>Loading...</div>;
  } else if (flag) {
    return (
      <div className="container-fluid m-auto product d-block bg-dark " style={{height:"900px", overflow:"scroll"}} >
        <div className="row w-100 m-auto ">
          <div className="col-lg-8 d-block op">
            <div className='  w-100 m-1'>
              {data.map((item, index) => (
                <div className="card m-1 bg-dark border-bottom" style={{ width: "100%" }} key={index}>
                  <div className="wego cb d-flex flex-wrap text-justify mx-auto" style={{ width: "100%", height: "120px" }}>
                    <div className="cartIm">
                      {item.image && (
                        <img
                          src={`data:image/jpeg;base64,${btoa(
                            new Uint8Array(item.image.data.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ''
                            )
                          )}`}
                          width="120px"
                          height="120px"
                          alt="don't care"
                        />
                      )}
                    </div>
                    <div className=" cartFs wego">
                      <h6 className="card-title">{item.title}</h6>
                      <h5 className="card-title">Price {item.price}</h5>
                      <h6 className="card-title">Author: {item.author}</h6>
                    </div>
                    <div>
                    <button
                      type="button"
                      className="btn btn-primary position-absolute end-0"
                      onClick={() => handleRemoveFromCart(item._id)}
                      disabled={loading} // Disable the button when loading
                    >
                      {loading ? 'wait...' : 'Remove'}
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 cb border border-warning border-2  rounded 2px p-3">
            <h3>Order Details</h3>
            {data.map((value, index) => (
              <div key={index} className="  order cb card-body text-white mx-auto d-flex  border-top">
                {value.image && (
                  <img
                    src={`data:/jpeg;base64,${btoa(
                      new Uint8Array(value.image.data.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                      )
                    )}`}
                    width="20px"
                    height="30px"
                    alt="don't care"
                  />
                )}
                <p className="card-title m-1">{value.title}</p>|
                <p className="card-title m-1">Price :{value.price}</p>|
                <p className="card-title m-1 ">Auth: {value.author}</p>
              </div>
            ))}
            <h3>Total:{total}</h3>
            <button type="button" className="btn btn-warning" onClick={() => { handleButtonClick(data) }}>
              Place Your Order
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" container-fluid m-auto product d-flex bg-dark justify-content-center">
        <div id="sc-empty-cart" className="a-row a-spacing-top-extra-large pr d-flex">
          <div className="a-column a-span4 mx-5">
            <img src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" width="100%" />
          </div>
          <div className="a-column a-span8 a-span-last mx-auto">
            <div className="a-row sc-your-amazon-cart-is-empty">
              <h1>Your Cart is empty</h1>
            </div>
            <div className="a-section a-spacing-none sc-shop-todays-deals-link">
              <a className="a-link-normal">Shop today’s deals</a>
            </div>
            <div className="a-section a-spacing-medium a-spacing-top-medium sc-sign-in">
              <span className="a-button a-button-primary" id="a-autoid-4" />
              <span className=" nav-link " onClick={() => { navigate("/Signin") }}>
                <a className="a-link-normal">Sign In to your account</a>
              </span>
              <span className="a-button a-button-base" id="a-autoid-5" />
              <span className="a-size-base-plus">Sign up now</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
