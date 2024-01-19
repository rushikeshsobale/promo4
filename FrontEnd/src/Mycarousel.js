// ... (your imports)

import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './style.css';
const ImageSlider = () => {
  const carouselStyle = {
    maxWidth: '70%',
    margin: 'auto',
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetch("http://localhost:80/books", {
          method: "GET",
        });
        const data = await apiData.json();
        console.log("Fetched data:", data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" mb-3">
      <div className="  ">
        <Carousel  showThumbs={false}>
            { data?.map((value, index) => (
          
                <div className=" card-body text-justify mx-auto" key={index}>
                  {value.image && (
                    <img
                      src={`data:image/jpeg;base64,${btoa(
                        new Uint8Array(value.image.data.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ''
                        )
                      )}`}
                      width="100%"
                      height='100%'
                      alt="don't care"
                    />
                  )}
                  <div className="qq text-start">
                  <h1 className="card-title">{value.title}</h1>
                  <h3 className="card-title mb-2 ">Author: {value.author}</h3>
                  <h3 className="card-text fs-3">Published On: {value.publishedYear}</h3>
                  <h2 className="card-text">price: {value.price}</h2>
                  <Link to={`/Api/${value._id}`}>
                    <button type="button" className="btn btn-primary">
                      Click me
                    </button>
                  </Link>
                  </div>
                </div>
          

            ))}

        </Carousel>
      </div>
    </div>
  );
};

export default ImageSlider;
