import React from 'react';

const Card = ({image, name, id, openModal, setDataForModal}) => {
    return (
        <div className="card-wrapper" onClick={() => {openModal(); setDataForModal()}}>
            <div className='card-content'>
                <img src={image} alt={`cardId: ${id}`} />
                <div className='character-name'>{name}</div>
            </div>
        </div>
    );
}

export default Card;
