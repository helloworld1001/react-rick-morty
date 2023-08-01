import React from 'react';
import switcher from '../assets/img/switch.png';

const PaginateSwitcherBtn = ({ isOnPagination, onClick }) => {
  return (
    <div className="paginate-switcher" onClick={onClick}>
      <img src={switcher} alt="switcherImg" />
      <div className="paginate-switcher-text">{isOnPagination ? 'Pagination off' : 'Pagination on'}</div>
    </div>
  );
};

export default PaginateSwitcherBtn;
