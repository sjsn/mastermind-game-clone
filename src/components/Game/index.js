import React, { useState, useEffect } from 'react';

import { SOLUTION_OPTIONS } from '../../constants/game';

import './Game.css';
import Dot from '../Dot';

const Game = ({ gameSolution, setIsGameRunning }) => {
    const [currentGuess, setCurrentGuess] = useState([]);
    const [pastGuesses, setPastGuesses] = useState([]);


    const checkIfWin = (guessStats) => {
        let index = 0;
        let didWin = true;
        for (const color of gameSolution.values()) {
            const guessedColor = currentGuess[index];
            if (guessedColor !== color) {
                didWin = false;
                if (gameSolution.has(guessedColor)) {
                    guessStats.push(2);
                }
            } else {
                guessStats.push(1);
            }
            index++;
        }
        if (didWin) {
            setIsGameRunning(false);
        }
    };

    useEffect(() => {
        if (currentGuess.length === 4) {
            const guessStats = [];
            checkIfWin(guessStats);

            const guessAndStats = {
                guess: [...currentGuess],
                stats: [...guessStats].sort(),
            };

            setPastGuesses([{ ...guessAndStats }, ...pastGuesses]);
            setCurrentGuess([]);
        }
    }, [
        currentGuess,
    ]);

    const addToCurrentGuess = (color) => {
        if (currentGuess.includes(color)) {
            setCurrentGuess(currentGuess.filter(guessColor => guessColor !== color));
        } else {
            setCurrentGuess([...currentGuess, color]);
        }
    };

    const getActiveGuessRow = () => {
        const activeGuessRow = [];
        let index = 0;
        while (activeGuessRow.length < 4) {
            if (currentGuess[index]) {
                activeGuessRow[index] = currentGuess[index];
            } else {
                activeGuessRow.push('hidden')
            }
            index++;
        }
        return activeGuessRow;
    };

    console.log(getActiveGuessRow());

    return (
        <div className="game">
            {
                !!currentGuess.length &&
                <div className="row">
                    <div className="dots">
                        {
                            getActiveGuessRow().map((color, index) => color === 'hidden' ?
                                <Dot hide key={index} /> :
                                <Dot onClick={() => addToCurrentGuess(color)} color={color} key={color} />
                            )
                        }
                    </div>
                    <div className="guess-stats" />
                </div>
            }
            {
                pastGuesses.map(({ guess, stats }) => (
                    <div className="row" key={guess.toString()}>
                        <div className="dots">
                            {
                                guess.map(color => (
                                    <Dot color={color} key={color} />
                                ))
                            }
                        </div>
                        <div className="guess-stats">
                            {
                                stats.map((stat, index) => (
                                    <Dot color={stat === 1 ? 'black' : 'white'} size="small" key={index} />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <hr />
            <div className="row">
                <div className="dots">
                    {
                        SOLUTION_OPTIONS.map(color => (
                            <Dot hide={currentGuess.includes(color)} color={color} key={color} onClick={() => addToCurrentGuess(color)} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Game;