import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Board.css';

const Board = ({ cards, onMatch, onGameFinish, reset }) => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        setFlippedCards([]);
        setMatchedCards([]);
    }, [reset]);

    const handleCardClick = (card) => {
        if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card.id)) {
            setFlippedCards([...flippedCards, card]);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            const isMatch = firstCard.icon === secondCard.icon;

            setTimeout(() => {
                if (isMatch) {
                    setMatchedCards((prevMatched) => {
                        const newMatchedCards = [...prevMatched, firstCard.id, secondCard.id];
                        if (newMatchedCards.length === cards.length) {
                            onGameFinish();
                        }
                        return newMatchedCards;
                    });
                }
                setFlippedCards([]);
                onMatch();
            }, 1000);
        }
    }, [flippedCards, cards.length, onMatch, onGameFinish]);

    return (
        <div className="board">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onClick={handleCardClick}
                    isFlipped={flippedCards.includes(card) || matchedCards.includes(card.id)}
                />
            ))}
        </div>
    );
};

export default Board;