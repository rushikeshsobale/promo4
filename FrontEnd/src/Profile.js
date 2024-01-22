import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Offcanvas, Button, Form } from 'react-bootstrap';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    userName: "",
    email: "",
    phoneNo: "",
    // Add other fields as needed
  });

  
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://34.231.110.65:8080/profile", {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          credentials: "include", // Include credentials for sending cookies
        });

        if (response.ok) {
          const userData = await response.json();
          console.log("USERDATA" + userData);
          setLoader(true);
          setUserProfile(userData);
         
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
          setLoader(true);
        }
      } catch (error) {
        setError(`Error fetching user profile: ${error.message}`);
      }
    
    };
    useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setShowEditModal(true);
    // Initialize editedProfile state with current profile data
    setEditedProfile({
      userName: userProfile.userName,
      email: userProfile.email,
      phoneNo: userProfile.phoneNo,
      // Add other fields as needed
    });
  };
   
  const handleSave = async () => {
    // Implement logic to save edited profile data to the server
    // For simplicity, let's assume there's a separate API endpoint for updating user profile
    try {
      const response = await fetch(`http://localhost:80/updateData/${userProfile._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          credentials: "include", // Include credentials for sending cookies
        },
        body: JSON.stringify(editedProfile),
      });
          
      if (response.ok) {
        // Fetch updated profile data after saving
        fetchUserProfile();
        setShowEditModal(false);
      } else {
        setError(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error updating user profile: ${error.message}`);
    }
  };

  const handleClose = () => {
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid m-auto profile d-flex bg-dark text-light p-5 justify-content-center">
      {!userProfile ? (
        // Render user-friendly response for not logged in
        <div className="cb text-center my-5 p-3">
          <h2>LOOKS LIKE YOU HAVEN'T SIGNED IN</h2>
          <p>Please log in to view your profile.</p>
          <Link to="/Signin">
            <button className="btn btn-primary mt-3">Log In</button>
          </Link>
        </div>
      ) : loader ? (
        // Render profile if loader is true
        <div className="cb mx-auto p-3">
          <h1>User Profile</h1>
          {error ? (
            <p>Error: {error}</p>
          ) : userProfile ? (
            <div className="fs-3 ">
              <p>Username: {userProfile.userName}</p>
              <p>Email: {userProfile.email}</p>
              <p>Phone Number: {userProfile.phoneNo}</p>
              <p>User ID: {userProfile._id}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {/* Edit Profile Button */}
          <Button variant="primary" onClick={handleEdit}>
            Edit Profile
          </Button>
        </div>
      ) : (                            
        // Render loading spinner
        <div className="cb text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
  
      {/* Edit Profile Modal/Offcanvas */}
      <Offcanvas show={showEditModal} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            {/* Customize the form fields based on your profile data structure */}
            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                name="userName"
                value={editedProfile.userName}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={editedProfile.email}
                onChange={handleChange}
              />
            </Form.Group>
  
           
            <Form.Group className="mb-3" controlId="formPhoneNo">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter The Address "
                name="phoneNo"
                value={editedProfile.address}
                onChange={handleChange}
              />
            </Form.Group>
  
  
            {/* Add other form fields as needed */}
  
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
  
};

export default Profile;
