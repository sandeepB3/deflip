import axios from 'axios';
import React, { useState,useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
function SignIn() {
    const navigate = useNavigate()
  const [supplierName, setSupplierName] = useState('');
  const [password, setPassword] = useState('');
    const auth=useContext(AuthContext)
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
       const response= await axios.post('http://localhost:4000/supplier/login',{
          supplierName,
          password,
      })
      setSupplierName('')
      setPassword('')
      if(response.data.status_code==200){
        auth.setState({
        isLoggedIn:true,
        supplier:response.data.supplier,
        products:auth.state.products,
        topCustomers:auth.state.topCustomers,
      })
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
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="supplier-name"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
