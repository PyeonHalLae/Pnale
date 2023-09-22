import React, { useState } from "react";
import "@/components/common/Navi.css";
import { useNavigate } from "react-router-dom";

const NaviPE = (iconState) => {
  const navi = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const moveToPyenType = (type) => {
    navi(`/pyenE/${type}`);
    console.log(type);
  };
  console.log(iconState);

  return (
    <nav className="menu">
      <input
        type="checkbox"
        className="menu-open"
        name="menu-open"
        id="menu-open"
        checked={menuOpen}
        onChange={() => setMenuOpen(!menuOpen)}
      />
      <label
        // src={`/img/navi/search-${iconState.search}.png`}
        className="menu-open-button"
        htmlFor="menu-open"
        style={{ backgroundColor: `${iconState}` }}
      ></label>
      <a className="menu-item-back"></a>
      <button className="menu-item" id="CU" onClick={() => moveToPyenType("CU")}>
        <img src="/img/navi/CU_btn.png" alt="" id="CU" />
      </button>
      <button className="menu-item" id="SEVEN" onClick={() => moveToPyenType("SEVEN")}>
        <img src="/img/navi/SEVEN_btn.png" alt="" id="SEVEN" />
      </button>
      <button className="menu-item" id="GS" onClick={() => moveToPyenType("GS")}>
        <img src="/img/navi/GS_btn.png" alt="" id="GS" />
      </button>
      <button className="menu-item" id="EMART" onClick={() => moveToPyenType("EMART")}>
        <img src="/img/navi/EMART_btn.png" alt="" id="EMART" />
      </button>
    </nav>
  );
};

export default NaviPE;
