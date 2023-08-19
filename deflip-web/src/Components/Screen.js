import React, { useContext, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Container from "./Container";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

async function fetchData(token, auth) {
  try {
    const { data } = await axios.get("http://localhost:8000/supplier/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
    const id = data.supplier.supplier_id;

    const response = await axios.get(
      `http://localhost:8000/supplier/getDashboardData/${id}`
    );
    console.log(response.data);

    auth.setState({
      isLoggedIn: true,
      supplier: response.data.supplier,
      products: response.data.products,
      topCustomers: response.data.topCustomers,
      Authorization: `Bearer ${token}`,
      statistics: response.data.statistics,
      balance: response.data.balance
    });
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function Screen() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(`Bearer ${token}`);

    if (token) {
      fetchData(token, auth);
    } else {
      navigate("/login");
    }
  }, [auth.setState]);

  return (
    <div className="App">
      <Menu />
      <Container />
    </div>
  );
}

export default Screen;
