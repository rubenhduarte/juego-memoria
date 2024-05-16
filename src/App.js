import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import ResetButton from './components/ResetButton';
import './App.css';

const generateCards = () => {
    const icons = [
        'fa-check',
        'fa-anchor',
        'fa-bell',
        'fa-bicycle',        
    ];
    const cards = icons.flatMap((icon, index) => [
        { id: `${index}-a`, icon: `fa ${icon}` },
        { id: `${index}-b`, icon: `fa ${icon}` },
    ]);
    return cards.sort(() => Math.random() - 0.5);
};

const App = () => {
    const [cards, setCards] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [reset, setReset] = useState(false);  

    useEffect(() => {
        const generatedCards = generateCards();
        console.log(generatedCards);
        setCards(generateCards());        
    }, [reset]);

    const handleMatch = () => {
        setAttempts(prevAttempts => prevAttempts + 1);
    };

    const handleGameFinish = () => {
        setIsGameFinished(true);
    };

    const handleReset = () => {
        setCards(generateCards()); 
        setAttempts(0);
        setIsGameFinished(false); 
        setReset(prev => !prev); 
    };

    return (
        <div className="App">
            <h1>Juego de Memoria</h1>
            <p>{isGameFinished ? `Juego finalizado: Resuelto en ${attempts} intentos` : `Intentos: ${attempts}`}</p>
            <ResetButton onClick={handleReset} /> 
            {cards && cards.length > 0 ? (
                <Board cards={cards} onMatch={handleMatch} onGameFinish={handleGameFinish} reset={reset} />
            ) : (
                <p>Cargando cartas...</p>
            )}
        </div>
    );
};

export default App;
