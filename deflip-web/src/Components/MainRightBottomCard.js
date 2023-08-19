import {React, useContext, useState} from "react";
import TopSeller from "./TopSeller";
import user from "../img/user.jpeg";
import { AuthContext } from "../contexts/AuthContext";
import Popup from "./Popup";


function MainRightBottomCard() {

  const auth = useContext(AuthContext)

  const topCustomers = auth.state.topCustomers
  const supplierName = auth.state.supplier.supplierName
  const token = auth.state.Authorization

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePopupSubmit = (response) => {
    const { data } = response.data
    console.log('Response Value:', data);

    auth.setState({
      isLoggedIn: auth.state.isLoggedIn,
      supplier: auth.state.supplier,
      products: auth.state.products,
      topCustomers: auth.state.topCustomers,
      Authorization: auth.state.Authorization,
      statistics: auth.state.statistics,
      balance: data.supplierTokens
    });
  };

  return (
    <div className="bottom_card">
      <div className="bottomCard_name">
        <h2>Top Customers</h2>    
      </div>
      <div style={{height:"230px",overflow:"auto"}}>
        {topCustomers &&
          topCustomers.map((customer, i) => (
            <div className="topSeller" key={i}>
              <div className="topSellerImg">
                <img src={user} alt="" />
              </div>
              <div className="topSellerName">
                <p>
                  {TopSeller[i]?.seller_name} <span>{customer?.emailID}</span>
                </p>
              </div>
                <button className="button" onClick={openPopup}>Award</button>
                {isPopupOpen && (
                  <Popup onClose={closePopup} onSubmit={handlePopupSubmit}  seller={supplierName} customer={customer?.emailID} auth={token}/>
                )}
            </div>
        ))}
      </div>
    </div>
  );
}

export default MainRightBottomCard;
