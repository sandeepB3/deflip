import React, { useState } from 'react';
import './Popup.css';
import axios from 'axios';

const Popup = ({ onClose, onSubmit, seller, customer, auth }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
        const response = await axios.post('http://localhost:8000/supplier/sendTokens',
        { seller, customer,  inputValue}, { headers: { 'Authorization': auth}})

        onSubmit(response);
        onClose();

    }catch(err){
        console.log(err);
    }

  }

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Award Customer</h3>
        <br />
        <input
          className='form-group input'
          type="text"
          placeholder="Enter tokens to send"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
