import React, { useState } from 'react';
import './ReserveForm.css'; 

const  ReserveForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    name: '',
    email: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform further actions here, like sending the data to a server
    console.log('Form data:', formData);
  }

  return (
    <div className="form-container">
      <h2 className='form-title'>Reserve a Seat</h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">Reserve</button>
      </form>
    </div>
  );
}

export default ReserveForm;
