import React from 'react';
import closeModalImg from '../assets/img/close.png';

const ModalWindow = ({ closeModal, props: {image, name, status, species, gender, location: {name: locationName}, origin: {name: originName} } }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>
          <img src={closeModalImg} alt="closeImg" />
        </span>
        <div className="modal-info">
          <div className="modal-img-wrapper">
            <img src={image} alt="charImage" />
          </div>
          <div className="modal-text-wrapper">
            <div className="modal-text-left">
              <div className="text-title">Name:</div>
              <div>{name}</div>
              <div className="text-title">Status:</div>
              <div>{status}</div>
              <div className="text-title">Species:</div>
              <div>{species}</div>
            </div>
            <div className="modal-text-right">
              <div className="text-title">Origin:</div>
              <div>{originName}</div>
              <div className="text-title">Location:</div>
              <div>{locationName}</div>
              <div className="text-title">Gender:</div>
              <div>{gender}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
