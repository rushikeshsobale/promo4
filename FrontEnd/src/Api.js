import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormData from 'form-data';

const Api = () => {
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://3.210.184.253:8080/books/${_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await fetch(`http://3.210.184.253:8080/addToCart/${_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newItem: data }),
      });

      if (response.ok) {
        console.log('Item inserted successfully in the cart');
        navigate('/Mycart');
      } else if (response.status === 404) {
        console.log("server responded with 404")
        navigate('/Mycart');
      }
    } catch (error) {
      console.error('Something went wrong while adding to cart:', error);
    }
  };

  const handleButtonClick = (total) => {
    navigate('/CheckoutPage', { state: { total } });
  };

  useEffect(() => {
    fetchData();
  }, [_id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { image, author, price, title, publishedYear, description } = data;

  return (
    <div className='container-fluid mx-auto Api p-3 d-block' style={{ height: '900px', background: 'black' }}>
      <div className='cb wego d-flex text-white'>
        <div className='m-3'>
          {image && (
            <img
              className='img'
              src={`data:image/jpeg;base64,${btoa(
                new Uint8Array(image.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
              )}`}
              width='300px'
              alt="Book Cover"
            />
          )}
        </div>
        <div className='m-3'>
          <h2 className='card-title my-3'>{title}</h2>
          <h3 className='card-subtitle mb-2 text-white'>Author: {author}</h3>
          <h3 className='card-text'>Price: {price}</h3>
          <p className='card-text'>Published On: {publishedYear}</p>
          <p className='card-text'>Description: {description} </p>
          <div className='my-3'>
            <button type='button' className='btn btn-primary' onClick={() => handleButtonClick(price)}>
              Buy
            </button>
            <button type='button' className='btn btn-primary mx-3' onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Api;
