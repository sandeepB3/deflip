import {React,useContext} from "react";
import { AuthContext } from "../contexts/AuthContext";

function MainRightTopCard() {
  const auth=useContext(AuthContext)
  return (
    <div className="topCard">
      <div className="topCard_name">
        <h2>Statistics</h2>
        
      </div>

      <div className="earning">
        <p>
          Total Units Sold<span>{auth.state.statistics?.unitSold}</span>
        </p>

        <p>
          Customers Acquired <span>5</span>
        </p>


        <p>
          Products Hosted <span>{auth.state.statistics?.productsHosted}</span>
        </p>

        <p>
          Revenue Generated <span>{auth.state.statistics?.revenue}</span>
        </p>
      </div>
    </div>
  );
}

export default MainRightTopCard;
