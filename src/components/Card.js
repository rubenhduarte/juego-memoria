import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './Card.css';

const Card = ({ card, onClick, isFlipped }) => {
    return (
        <div className="card-container" onClick={() => onClick(card)}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="card back" key="back">
                    <i className="fa fa-question" />
                </div>
                <div className="card front" key="front">
                    <i className={`fa ${card.icon}`} />
                </div>
            </ReactCardFlip>
        </div>
    );
};

export default Card;
