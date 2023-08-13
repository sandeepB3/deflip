

// import React, { useState } from 'react';
// import './Signin.css';

// function Signin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can add your login logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//   };

//   return (
//     <div className="App">
//       <div className="container">
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signin;
// src/SignIn.js
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
      console.log(response)
      if(response.data.status_code==200){
        auth.setState({
        isLoggedIn:true,
        supplier:response.data.supplier,
        products:response.data.products
      })
      navigate("/")
    }
    else{
      console.log(response.data)
      navigate("/")
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
