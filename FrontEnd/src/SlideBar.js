import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ImageSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const viewportHeight = window.innerHeight;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetch("http://localhost:80/books", {
          method: "GET",
        });
        const data = await apiData.json();
        setData(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
   <div className='container-fluid bg-dark'>
      {loading ? (
        // Loader while fetching data
        <div className="text-center container-fluid  bg-dark ">
          <div className="spinner-border text-success mt-5" role="status">
            <span >Loading...</span>
          </div>
        </div>
      ) : (
        // Render data once it's fetched
        <div className="container-fluid bg-dark " style={{height:`${viewportHeight-50}px`, overflow:"scroll"}}>
          <div className='row ' >
            {data?.map((value, index) => (
              <div className=" col-6 col-sm-3 col-md-3 col-lg-2 mb-3 bg-dark cb text-white"  key={index}>
                <div className=" wego  text-justify mx-auto">
                  {value.image && (
                    <img
                      src={`data:image/jpeg;base64,${btoa(
                        new Uint8Array(value.image.data.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ''
                        )
                      )}`}
                      width="150px"
                      height="180px"
                      alt="don't care"
                    />
                  )}
                  <h5 className="card-title">{value.title}</h5>
                  <h6 className="card-title mb-2 ">Author: {value.author}</h6>
                  <p className="card-text">Published On: {value.publishedYear}</p>
                  <h4 className="card-text">price: {value.price}</h4>
                  <Link to={`/Api/${value._id}`}>
                    <button type="button" className="btn btn-primary">
                      Click me
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default ImageSlider;
