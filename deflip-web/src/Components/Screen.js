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
        if(!auth.state.isLoggedIn){
          navigate("/login")
        }
      },[]);
    
      

  return (
    <div className="App">
      <Menu/>
      <Container/>
    </div>
  );
}

export default Screen;