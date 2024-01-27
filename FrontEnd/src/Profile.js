import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Offcanvas, Button, Form } from 'react-bootstrap';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const viewportHeight = window.innerHeight;
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    userName: "",
    email: "",
    phoneNo: "",
    // Add other fields as needed
  });

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://3.210.184.253:8080/profile", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include", // Include credentials for sending cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData);
        setLoader(true);
      } else {
        setError(`Error: ${response.status} - ${response.statusText}`);
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
    setEditedProfile({
      userName: userProfile.userName,
      email: userProfile.email,
      phoneNo: userProfile.phoneNo,
      // Add other fields as needed
    });
  };
   
  const handleSave = async () => {
    try {
      const response = await fetch(`http://3.210.184.253:8080/updateData/${userProfile._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          credentials: "include", // Include credentials for sending cookies
        },
        body: JSON.stringify(editedProfile),
      });
          
      if (response.ok) {
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
    <main className="container-fluid profile-container d-flex bg-dark text-light justify-content-center" style={{ height: `${viewportHeight}px` }}>
      {!userProfile ? (
        <div className="cb text-center p-3" style={{ marginTop: '-350px' }}>
          <h2>LOOKS LIKE YOU HAVEN'T SIGNED IN</h2>
          <p>Please log in to view your profile.</p>
          <Link to="/Signin">
            <button className="btn btn-primary mt-3">Log In</button>
          </Link>
        </div>
      ) : loader ? (
        <div className="cb mx-auto p-3" style={{ marginTop: '-350px' }}>
          <h1>User Profile</h1>
          {error ? (
            <p>Error: {error}</p>
          ) : userProfile ? (
            <div className="fs-3">
              <p>Username: {userProfile.userName}</p>
              <p>Email: {userProfile.email}</p>
              <p>Phone Number: {userProfile.phoneNo}</p>
              <p>User ID: {userProfile._id}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <Button variant="primary" onClick={handleEdit}>
            Edit Profile
          </Button>
        </div>
      ) : (
        <div className="cb text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <Offcanvas show={showEditModal} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
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
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                name="phoneNo"
                value={editedProfile.phoneNo}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </main>
  );
};

export default Profile;
