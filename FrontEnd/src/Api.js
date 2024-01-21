// Api.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormData from 'form-data';

const Api = (userId) => {
  
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
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const extractedUserId = userId.userId;
  console.log(extractedUserId+"extractedid");
  console.log(token+"toktn")
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/books/${_id}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const addToCart = async () => {
    try {
      // Wrap the book data in a 'newItem' property
      const response = await fetch(`http://localhost:8080/addToCart/${extractedUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newItem: data }), // Wrap the book data here
      });
  
      if (response.ok) {
        console.log("Item inserted successfully in the cart");
        navigate("/Mycart");
      }
      else if(response.status==404){
        navigate("/Mycart");
      }
    } catch (error) {
      console.error("Something went wrong while adding to cart:", error);
    }
  };
  
  const handleButtonClick = (total) => {
    // Navigate to the "/CheckoutPage" route with the total as a parameter
    navigate("/CheckoutPage", { state: { total } });
  };
  useEffect(() => {
    fetchData();
  }, [_id]);

  if (!data) {
    return <div>Loading...</div>;
  }
  const {  image, author, price, title, publishedYear,description } = data;
  
  return (
    <div className=' container-fluid mx-auto Api p-3 d-block' style={{height:"900px", background:"black"}} >
      <div className=' cb wego d-flex text-white '>
        <div className="m-3 ">
          {image && (
            <img
              className="img"
              src={`data:image/jpeg;base64,${btoa(
                new Uint8Array(image.data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )}`}
              width="300px"
              alt="don't care"
            />
                )}
        </div>
        <div className="m-3 ">
          <h2 className="card-title my-3">{title}</h2>
          <h3 className="card-subtitle mb-2 text-white">Author: {author}</h3>
          <h3 className="card-text">Price: {price}</h3>
          <p className="card-text">Published On: {publishedYear}</p>
          <p className="card-text">description:{description} </p>
          <div className="my-3">
            <button type="button" className="btn btn-primary "  onClick={()=>{ handleButtonClick(price)}}>
              Buy
            </button>
            <button type="button" className="btn btn-primary mx-3" onClick={addToCart} >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Api;
