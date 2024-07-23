import styles from '../styles/App.module.css'
import Board from './Board.jsx'
import React, { useState, useEffect } from 'react';
import { MoveDirectionContext } from '../contexts/moveDirectionContext.jsx'
import { TileDataContext } from '../contexts/tileDataContext.jsx';
import { BOARD_DIMENSIONS } from './constants'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}


const boardLeftMove = (prevTileData) => {
  const newTileData = [...prevTileData];
  for (let i = 1; i < newTileData.length; i++){
    if (i % (BOARD_DIMENSIONS) === 0){
      continue;
    }
    if (newTileData[i-1] === 0 && newTileData[i] === 1){
      newTileData[i-1] = 1;
      newTileData[i] = 0;
    }
  }
  return newTileData;
}

const boardRightMove = (prevTileData) => {
  const newTileData = [...prevTileData];
  for (let i = newTileData.length-2; i > -1; i--){
    if (i % BOARD_DIMENSIONS === (BOARD_DIMENSIONS - 1)){
      continue;
    }
    if (newTileData[i+1] === 0 && newTileData[i] === 1){
      newTileData[i+1] = 1;
      newTileData[i] = 0;
    }
  }
  return newTileData;
}

const boardUpMove = (prevTileData) => {
  const newTileData = [...prevTileData];
  for (let i = BOARD_DIMENSIONS; i < newTileData.length; i++){
    if (newTileData[i-BOARD_DIMENSIONS] === 0 && newTileData[i] === 1){
      newTileData[i-BOARD_DIMENSIONS] = 1;
      newTileData[i] = 0;
    }
  }
  return newTileData;
}

const boardDownMove = (prevTileData) => {
  const newTileData = [...prevTileData];
  for (let i = newTileData.length - BOARD_DIMENSIONS - 1; i >= 0; i--) {
    if (newTileData[i + BOARD_DIMENSIONS] === 0 && newTileData[i] === 1) {
      newTileData[i + BOARD_DIMENSIONS] = 1;
      newTileData[i] = 0;
    }
  }
  return newTileData;
}

/* 
* Board tiles:
* 0 - Blank tile
* 1 - Movable tile
* 2 - Immovable tile
*/

function App() {
  const [moveDirection, setMoveDirection] = useState(null);
  const [tileData, setTileData] = useState(() =>
    new Array(BOARD_DIMENSIONS ** 2).fill(null).map(() => getRandomInt(3))
  );

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setMoveDirection('up');
        setTileData(prevTileData => boardUpMove(prevTileData));
        break;
      case 'ArrowDown':
        setMoveDirection('down');
        setTileData(prevTileData => boardDownMove(prevTileData));
        break;
      case 'ArrowLeft':
        setMoveDirection('left');
        setTileData(prevTileData => boardLeftMove(prevTileData));
        break;
      case 'ArrowRight':
        setMoveDirection('right');
        setTileData(prevTileData => boardRightMove(prevTileData));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>Slidle</header>
      <TileDataContext.Provider value={tileData}>
        <MoveDirectionContext.Provider value={moveDirection}>
          <Board/>
        </MoveDirectionContext.Provider>
      </TileDataContext.Provider>
    </div>
  )
}

export default App
