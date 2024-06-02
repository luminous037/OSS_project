import React, { useState, useEffect } from 'react';
import './present_check.css';
import present_check_modal from '../image/present_check.png';

const PresentCheckModal = ({ isOpen, onClose, onPresentCheck }) => {
  if (!isOpen) return null;

  const handlePresentCheck = () => {
    onPresentCheck();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-present">
        <img src={present_check_modal} className='present_check_image'></img>
        <button onClick={handlePresentCheck}>출석 체크!</button>
      </div>
    </div>
  );
};

export default PresentCheckModal;
