import React, { useContext,useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./MainContainer.css";
import Banner from "../img/1.jpg";
import MainRightTopCard from "./MainRightTopCard";
import MainRightBottomCard from "./MainRightBottomCard";
import AllProducts from "./allProducts";
import AddItemForm from "./AddItemForm";
import axios from "axios";
import Timer from "./Timer";

function MainContainer() {
  const auth = useContext(AuthContext)
  const [activeTab, setActiveTab]=useState('All')
  console.log(activeTab)

  const [showAll, setShowAll]= useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const toggleView = (view) => {
    setShowAll(view === 'ALL');
    setShowAdd(view === 'ADD');
  }

const loadAllProducts = async()=>{

  console.log(auth.state.supplier)
  console.log(auth.state.topCustomers)
  console.log(auth.state.products)
  
  toggleView('ALL')
  axios.get(`http://localhost:8000/product/allProducts/${auth.state.supplier.supplierID}`,{
    
    
    }).then((response)=>{
      console.log(response)
      auth.setState({
        products: response.data.products,
        isLoggedIn: auth.state.isLoggedIn,
        supplier: auth.state.supplier,
        topCustomers: auth.state.topCustomers,
        Authorization: auth.state.Authorization,
        statistics: auth.state.statistics,
        balance: auth.state.balance
      })
    })
}
// console.log("hi")
// console.log(auth)
  return (
    <div className="maincontainer">
      <div className="left">
        <div
          className="banner"
          style={{
            background: `url(${Banner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="textContainer">
            <h1>{auth.state.supplier.supplierName}</h1>
            <p>Buy our Premium Subscription at</p>
            <h2>₹ 400</h2>
            <div className="bid">
              <a href="#" className="button">
                Buy Now
              </a>
              <p>
                Ending In <span><Timer /></span>
              </p>
            </div>
          </div>
        </div>

        <div className="cards">
          <div className="filters">
            {/* <div className="popular">
              <h2>Feed</h2>
              
              {/* <a href="#" className="button2">
                Popular
              </a> */}
            
            <div className="filter_buttons">
              <button onClick={loadAllProducts}  className="button">
                All
              </button>
              <button onClick={() => toggleView('ADD')}  className="button">
                Add
              </button>
              
            </div>
          </div>

          <main>
            
            {/* {auth.state.products.map((product,i)=><CardMain imgSrc={product.imgURL} title={product.productName} hearts={"56"} key={i} cost={product.cost} />
            )} */}
            {/* <CardMain imgSrc={Card1} title={"Cubic Thunder"} hearts={"65"} />
            <CardMain imgSrc={Card2} title={"Pokemon Ball"} hearts={"65"} />
            <CardMain imgSrc={Card3} title={"Pyramid God"} hearts={"65"} />
            <CardMain imgSrc={Card4} title={"Stunning Cube"} hearts={"65"} />
            <CardMain imgSrc={Card5} title={"Start Crystal"} hearts={"65"} />
            <CardMain imgSrc={Card6} title={"Crystal Bird"} hearts={"65"} /> */}

            {showAll && <AllProducts/>}
            {showAdd && <AddItemForm />}
            
          </main>
        </div>
      </div>
      <div className="right">
        <MainRightTopCard />
        <MainRightBottomCard />
      </div>
    </div>
  );
}

export default MainContainer;