import axios from 'axios';
import React, { useState,useContext } from 'react';
import profile from '../img/profile.png'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Signin.css'; 

const SignIn = () => {
  const navigate = useNavigate()
  const [supplierName, setSupplierName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext)

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
       const response= await axios.post('http://localhost:8000/supplier/add',{
          supplierName,
          address,
          password,
      })
      setSupplierName('')
      setAddress('')
      setPassword('')
      
      if(response.status === 200){
        auth.setState({
        isLoggedIn:true,
        supplier: response.data.supplier,
        products: auth.state.products,
        topCustomers: auth.state.topCustomers,
        Authorization:`Bearer ${response.data.token}`,
        statistics: auth.state.statistics
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
    <div>
    <div className="form-container">
        <div className="form-card">
        <div className="user-image">
            <img src={profile} alt="User" />
          </div>
          <h2>Sign Up</h2>
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
            <label htmlFor="supplierAddress">Supplier Address:</label>
            <input
              type="text"
              id="supplierAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
          <button className="button" onClick={handleSubmit}>Sign Up</button>
          <br />
          <br />

          <Link to="/login" className="login-link">
            Already have an account? Login
          </Link>

        </div>
      </div>
    </div>
  );
};



export default SignIn;