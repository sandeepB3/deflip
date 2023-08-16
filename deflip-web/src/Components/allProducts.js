import {React,useContext,useEffect} from "react";
import "./Container.css";
import TopContainer from "./TopContainer";
import MainContainer from "./MainContainer";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import CardMain from "./CardMain";
import Card1 from "../img/card1.jpg";
import Card2 from "../img/card2.jpg";
import Card3 from "../img/card3.jpg";
import Card4 from "../img/card4.jpg";
import Card5 from "../img/card5.jpg";
import Card6 from "../img/card6.jpg";

function AllProducts() {
const auth = useContext(AuthContext)

  // useEffect(async() => {
  //   // Update the document title using the browser API
  //   // if(auth.state?.products){
  //     console.log(auth.state.supplier.supplierID)
    
  //     console.log("hi")
  //     console.log(response)
      
    
  // },[]);



  return (
    <>
         {auth.state.products.map((product,i)=><CardMain imgSrc={product.imgURL} title={product.productName} hearts={"56"} key={i} cost={product.cost} />
            )} 
            {/* <CardMain imgSrc={Card1} title={"Cubic Thunder"} hearts={"65"} />
            <CardMain imgSrc={Card2} title={"Pokemon Ball"} hearts={"65"} />
            <CardMain imgSrc={Card3} title={"Pyramid God"} hearts={"65"} />
            <CardMain imgSrc={Card4} title={"Stunning Cube"} hearts={"65"} />
            <CardMain imgSrc={Card5} title={"Start Crystal"} hearts={"65"} />
            <CardMain imgSrc={Card6} title={"Crystal Bird"} hearts={"65"} /> */}
      </>
      
  );
}

export default AllProducts;