import React from 'react';
import arrowUp from '../assets/img/arrowUpMini.png';

const GoToTopBtn = ({ showUpBtn, onClick }) => {
  return (
    <div className={`scroll-top ${showUpBtn ? `isShowBtn` : `isHideBtn`}`} onClick={onClick}>
      <img src={arrowUp} alt="arrpowUp" />
    </div>
  );
};

export default GoToTopBtn;
