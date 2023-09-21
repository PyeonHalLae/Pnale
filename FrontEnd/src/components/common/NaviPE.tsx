import React, { useState } from "react";
import "@/components/common/Navi.css";

const NaviPE = (iconState) => {
  const [menuOpen, setMenuOpen] = useState(false);
  //   const isButtonDisabled = menuOpen;
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
        src={`/img/navi/search-${iconState.search}.png`}
        className="menu-open-button"
        htmlFor="menu-open"
        style={{ backgroundColor: `${iconState}` }}
      ></label>
      <p className="menu-item"></p>
      <a href="#" className="menu-item">
        <img src="/img/navi/CU_btn.png" alt="" />
      </a>
      <a href="#" className="menu-item">
        <img src="/img/navi/SEVEN_btn.png" alt="" />
      </a>
      <a href="#" className="menu-item">
        <img src="/img/navi/GS_btn.png" alt="" />
      </a>
      <a href="#" className="menu-item">
        <img src="/img/navi/EMART_btn.png" alt="" />
      </a>
    </nav>
  );
};

export default NaviPE;
