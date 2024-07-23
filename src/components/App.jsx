import styles from '../styles/App.module.css'
import Board from './Board.jsx'
import React, { useState, useEffect } from 'react';
import { MoveDirectionContext } from '../contexts/moveDirectionContext.jsx'
import { TileDataContext } from '../contexts/tileDataContext.jsx';
import { BOARD_DIMENSIONS } from './constants'
import { getRandomInt, boardLeftMove, boardRightMove, boardDownMove, boardUpMove } from '../scripts/boardHelpers.jsx';

/* 
* Board tiles:
* 0 - Blank tile
* 1 - Movable tile
* 2 - Immovable tile
*/

const fooTileData = new Array(BOARD_DIMENSIONS ** 2).fill(null).map(() => getRandomInt(3));

function App() {
  const [moveDirection, setMoveDirection] = useState(null);
  const [tileData, setTileData] = useState(fooTileData);
  const [initTileData, setInitTileData] = useState(fooTileData);

  const resetTiles = () => {
    setTileData(initTileData);
  }

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
      <button className={styles.resetBtn} onClick={resetTiles}>RESET</button>
    </div>
  )
}

export default App
