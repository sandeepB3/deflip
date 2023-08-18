import axios from 'axios';
import React, { useState,useContext } from 'react';
import profile from '../img/profile.png'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


import './Signin.css'; // Replace with the path to your CSS file

const SignIn = () => {
  const navigate = useNavigate()
  const [supplierName, setSupplierName] = useState('');
  const [password, setPassword] = useState('');
    const auth=useContext(AuthContext)
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
       const response= await axios.post('http://localhost:8000/supplier/login',{
          supplierName,
          password,
      })
      setSupplierName('')
      setPassword('')
      if(response.status === 200){
        auth.setState({
        isLoggedIn:true,
        supplier:response.data.supplier,
        products:auth.state.products,
        topCustomers:auth.state.topCustomers,
      })
      localStorage.setItem('token',response.data.token)
      navigate("/")
    }
    else{
      console.log(response.data)
      navigate("/login")
    }
      
      
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
      <div className="user-image">
          <img src={profile} alt="User" />
        </div>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="supplierName">Supplier Name:</label>
          <input
            type="text"
            id="supplierName"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button" onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
  );
};



export default SignIn;