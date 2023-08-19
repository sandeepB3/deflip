import React, { useContext, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaCoins, FaChevronDown } from "react-icons/fa";
import profile from "../img/profile.png";
import { AuthContext } from "../contexts/AuthContext";


function TopContainer() {
  const auth = useContext(AuthContext);
  console.log("This is auth", auth)
  useEffect(() => {
    const mouseTarget = document.getElementById("menuChevron");
    const menuContainer = document.getElementById("menuContainer");
    mouseTarget.addEventListener("mouseenter", () => {
      mouseTarget.style.transform = "rotate(180deg)";
      menuContainer.style.transform = "translateX(0px)";
    });

    menuContainer.addEventListener("mouseleave", () => {
      mouseTarget.style.transform = "rotate(0deg)";
      menuContainer.style.transform = "translateX(300px)";
    });
  }, []);

  return (
    <div className="topContainer">
      <div className="inputBox">
        <input type="text" placeholder="Search items, collections" />
        <i>
          <BiSearchAlt />
        </i>
      </div>

      <div className="profileContainer">
        <i className="">
          <FaCoins />
        </i>
        <h4 style={{ marginLeft: '10px', marginRight: '10px' }}>{auth.state.balance} Tokens</h4>
        <div className="profileImage">
          <img src={profile} alt="" />
        </div>
        <p className="profileName">{auth.state.supplier.supplierName}</p>
        <i className="menuChevron" id="menuChevron">
          <FaChevronDown />
        </i>

        <div className="menuContainer" id="menuContainer">
          <ul>
            <li>Profile</li>
            <li>Wallet</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopContainer;
