import {React,useContext,useState} from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./MainContainer.css";
import Banner from "../img/1.jpg";
import CardMain from "./CardMain";
import Card1 from "../img/card1.jpg";
import Card2 from "../img/card2.jpg";
import Card3 from "../img/card3.jpg";
import Card4 from "../img/card4.jpg";
import Card5 from "../img/card5.jpg";
import Card6 from "../img/card6.jpg";
import MainRightTopCard from "./MainRightTopCard";
import MainRightBottomCard from "./MainRightBottomCard";
import AllProducts from "./allProducts";
import AddItemForm from "./AddItemForm";
import axios from "axios";

function MainContainer() {

const auth = useContext(AuthContext)
const [activeTab,setActiveTab]=useState('All')
console.log(activeTab)
// const handleTabClick = (tabId) => {
//   setActiveTab(tabId);
// };
const [showAll, setShowAll]= useState(true);
const [showAdd, setShowAdd] = useState(false);

const toggleView = (view) => {
  setShowAll(view === 'ALL');
  setShowAdd(view === 'ADD');
};
const loadAllProducts=async()=>{
  console.log(auth.state.supplier.supplierID)
  toggleView('ALL')
  axios.get(`http://localhost:4000/product/allProducts/${auth.state.supplier.supplierID}`,{
    
    
    }).then((response)=>{
      console.log(response)
      auth.setState({
        products:response.data.products,
        isLoggedIn:auth.state.isLoggedIn,
        supplier:auth.state.supplier
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
            <h2>1.5 ETH</h2>
            <p>Uploaded by Alexander Vernof</p>
            <div className="bid">
              <a href="#" className="button">
                Bid Now
              </a>
              <p>
                Ending In <span>2d:15h:20m</span>
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
            {showAdd && <AddItemForm/>}
            
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
