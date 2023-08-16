import {React,useContext} from "react";
import TopSeller from "./TopSeller";
import profile from "../img/profile.png";
import { AuthContext } from "../contexts/AuthContext";

function MainRightBottomCard() {
  const auth=useContext(AuthContext)
  const topCustomers=auth.state.topCustomers
  return (
    <div className="bottom_card">
      <div className="bottomCard_name">
        <h2>Top Customers</h2>
        
      </div>
<div style={{height:"230px",overflow:"auto"}}>
  {topCustomers &&
        topCustomers.map((customer,i) => (
          <div className="topSeller" key={i}>
            <div className="topSellerImg">
              <img src={profile} alt="" />
            </div>
            <div className="topSellerName">
              <p>
                {TopSeller[i]?.seller_name} <span>{customer?.emailID}</span>
              </p>
            </div>
            <a href="#" className="button">
              Award
            </a>
          </div>
        ))}
        </div>
      
    </div>
  );
}

export default MainRightBottomCard;
