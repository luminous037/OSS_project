
import React from 'react';


const InstructionModal = ({ isOpen, close }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <h2>사용 설명</h2>
      
      <p>여기에 앱이나 웹사이트의 사용 방법을 상세히 설명해주세요.</p>
      <button onClick={close}>닫기</button>
    </div>
  );
};

export default InstructionModal;
