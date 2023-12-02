// EditProfile.jsx

import React, { useState } from 'react';

const EditProfile = ({ user, closeModal }) => {
  // Provide default values if user is undefined
  const initialFormData = {
    username: user?.username ?? '',
    email: user?.email ?? '',
    // Add more fields as needed
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate updating the user profile
    console.log('Updated profile:', formData);

    // Close the modal
    closeModal();
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Your form fields go here */}
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          {/* Add more fields as needed */}
          <br />
          <button type='submit'>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
