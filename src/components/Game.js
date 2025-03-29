import React, { useState } from 'react';
import './Game.css';

const Game = () => {
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(null)));
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const checkWinner = (currentBoard) => {
    // Check horizontal
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const cell = currentBoard[row][col];
        if (cell && 
            cell === currentBoard[row][col + 1] && 
            cell === currentBoard[row][col + 2] && 
            cell === currentBoard[row][col + 3]) {
          return cell;
        }
      }
    }

    // Check vertical
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        const cell = currentBoard[row][col];
        if (cell && 
            cell === currentBoard[row + 1][col] && 
            cell === currentBoard[row + 2][col] && 
            cell === currentBoard[row + 3][col]) {
          return cell;
        }
      }
    }

    // Check diagonal (positive slope)
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const cell = currentBoard[row][col];
        if (cell && 
            cell === currentBoard[row - 1][col + 1] && 
            cell === currentBoard[row - 2][col + 2] && 
            cell === currentBoard[row - 3][col + 3]) {
          return cell;
        }
      }
    }

    // Check diagonal (negative slope)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const cell = currentBoard[row][col];
        if (cell && 
            cell === currentBoard[row + 1][col + 1] && 
            cell === currentBoard[row + 2][col + 2] && 
            cell === currentBoard[row + 3][col + 3]) {
          return cell;
        }
      }
    }

    return null;
  };

  const handleClick = (col) => {
    if (isGameOver) return;

    const newBoard = [...board];
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = isRedTurn ? 'red' : 'yellow';
        break;
      }
    }

    setBoard(newBoard);
    const winner = checkWinner(newBoard);
    
    if (winner) {
      setWinner(winner);
      setIsGameOver(true);
    } else {
      setIsRedTurn(!isRedTurn);
    }
  };

  const resetGame = () => {
    setBoard(Array(6).fill().map(() => Array(7).fill(null)));
    setIsRedTurn(true);
    setWinner(null);
    setIsGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Connect Four</h1>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Current player: ${isRedTurn ? 'Red' : 'Yellow'}`}
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="cell"
                style={{ backgroundColor: cell || 'white' }}
                onClick={() => handleClick(colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Game; 