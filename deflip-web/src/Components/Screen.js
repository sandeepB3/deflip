import React, { useState,useContext,useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Container from './Container';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
function Screen() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        // Update the document title using the browser API
        const token=localStorage.getItem('token')
        console.log(`Bearer ${token}`)
        if(token){
        axios.get('http://localhost:8000/supplier/auth',{
          headers:{
            // Authorization:`Bearer ${token}`
            Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjYsIm5hbWUiOiJudWxsIG51bGwiLCJwaG9uZSI6bnVsbCwiZW1haWwiOiJsYXVraWtwYXRhZGUyMkBnbWFpbC5jb20iLCJjb250cmFjdCI6bnVsbH0sImlhdCI6MTY5MjE3MzYwMCwiZXhwIjoxNjkyMjYwMDAwfQ.XxGCXfp_SgrFyHsMA1eQWrpSPPAFXjk9-KGxy4p5mJs`
          },
        }).then((response1)=>{
          console.log(response1)
          axios.get(`http://localhost:8000/supplier/getDashboardData/${response1.data.data.user.user_id}`).then((response2)=>{
            console.log(response2)
            auth.setState({
              isLoggedIn:true,
              supplier:response2.data.supplier,
              products:response2.data.products,
              topCustomers:response2.data.topCustomers
            })
          })
        })
      }
      else{
        navigate('/login')
      }
        
        

        // if(!auth.state.isLoggedIn) navigate('/login')
        // console.log(auth.state.supplier.supplierID)

        
      },[]);
      
      

  return (
    <div className="App">
      <Menu/>
      <Container/>
    </div>
  );
}

export default Screen;