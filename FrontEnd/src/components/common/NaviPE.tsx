import React, { useState } from "react";
import "@/components/common/Navi.css";
import Modal from "react-modal";
const NaviPE = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 모달을 열고 닫는 함수
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <nav className="menu">
      <input
        type="checkbox"
        className="menu-open"
        name="menu-open"
        id="menu-open"
        checked={modalIsOpen}
        onChange={() => openModal()}
      />
      <label className="menu-open-button" htmlFor="menu-open">
        <img src="/img/navi/pyenE-gray.png" alt="" />
      </label>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "relative",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid rgba(255, 255, 255, 0.75)",
            background: "rgba(255, 106, 106, 0.75)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        {/* 모달 안에 넣을 UI */}
        <div>
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
        </div>
      </Modal>
    </nav>
  );
};

export default NaviPE;
