import React, { useEffect } from "react";
import "./Menu.css";
import logo from "../img/logo.png";
import chainkart from "../img/chainkart.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaDelicious, FaShoppingCart, FaWallet, FaChartLine, FaRegClock, FaCog, FaSignOutAlt } from "react-icons/fa";

function Menu() {

  const navigate = useNavigate()
  async function logout() {
    try{
      await axios.post('http://localhost:8000/supplier/logout');
      localStorage.removeItem('token');
      navigate("/login")
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(() => {
    const mainMenuLi = document
      .getElementById("mainMenu")
      .querySelectorAll("li");

    function changeActive() {
      mainMenuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive));
  }, []);


  return (
    <menu>
      <img src={logo} alt="" />

      <ul id="mainMenu">
        <Icon icon={<FaWallet />} />
        <Icon icon={<FaChartLine />} />
        <Icon icon={<FaRegClock />} />
      </ul>

      <ul className="lastMenu">
        <Icon icon={<FaSignOutAlt />} logout={logout}/>
      </ul>
    </menu>
  );
}

const Icon = ({ icon, logout }) => (

  <li>
    <a onClick={logout}>{icon}</a>
  </li>
);

export default Menu;
