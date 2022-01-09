import React, { useState } from 'react';

import { SOLUTION_OPTIONS } from '../constants/game';

import Game from './Game';


const pickSolution = () => {
    const solution = new Set();
    while (solution.size < 4) {
        const indexToAttemptToAdd = Math.round(Math.random() * 5);
        solution.add(SOLUTION_OPTIONS[indexToAttemptToAdd]);
    }
    return solution;
};

const GameBoard = () => {
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [gameSolution, setGameSolution] = useState();

    const startGame = () => {
        setGameSolution(pickSolution());
        setIsGameRunning(true);
    }

    return (
        <div className="board">
            <h1>Mastermind!</h1>
            <button onClick={() => console.log(gameSolution)}>Say solution</button>
            {
                !isGameRunning ?
                    <button onClick={() => startGame()}>Start Game</button> :
                    <Game setIsGameRunning={setIsGameRunning} gameSolution={gameSolution} />
            }
        </div>
    );
};

export default GameBoard;