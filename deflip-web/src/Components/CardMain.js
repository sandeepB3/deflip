import React from "react";
import { CiDeliveryTruck} from "react-icons/ci";

function CardMain({ imgSrc, title, quantity,cost }) {
  return (
    <div className="card_main" style={{"height":"60vh",width:"100%"}}>
      <div></div>
      <img style={{height:"65%",width:"100%"}} src={imgSrc} alt="" className="card_main_img" />
      <div className="card_main_name">
        <h2>{title}</h2>
        <div className="card_main_icon">
          <i>
            <CiDeliveryTruck/><span>{quantity} Units</span>
          </i>
        </div>
      </div>

      <div className="stat">
        <div>
          <p>
            Current Cost<span>Rs.{cost}</span>
          </p>
        </div>
        <div>
          <p>
            Ending In<span>1d:12h:10m</span>
          </p>
        </div>
      </div>

      <div className="card_main_button">
        <a href="#" className="button btn">
          Place a Bid
        </a>
        <a href="#" className="button2 btn">
          History
        </a>
      </div>
    </div>
  );
}

export default CardMain;
