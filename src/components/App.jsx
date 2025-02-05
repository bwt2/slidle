import styles from '../styles/App.module.css'
import Board from './Board.jsx'
import React, { useState, useEffect } from 'react';
import { MoveDirectionContext } from '../contexts/moveDirectionContext.jsx'
import { TileDataContext } from '../contexts/tileDataContext.jsx';
import { SolvedContext } from '../contexts/solvedContext.jsx';
import { boardLeftMove, boardRightMove, boardDownMove, 
         boardUpMove, generateTileData, generatePathData, 
         shuffleTiles, checkSolved } from '../scripts/boardHelpers.jsx';

/* 
* Board tiles:
* 0 - Blank tile
* 1 - Movable tile
* 2 - Immovable tile
*/

// Generate initial solved state
const { pathIndex, pathIsCol } = generatePathData();
const unshuffledTileData = generateTileData(pathIndex, pathIsCol);

// Shuffle the tiles
let shuffledTileData = shuffleTiles(unshuffledTileData);
while (checkSolved(shuffledTileData, pathIndex, pathIsCol)){
  shuffleTileData = shuffleTiles(shuffledTileData);
}

function App() {
  const [moveDirection, setMoveDirection] = useState(null);
  const [tileData, setTileData] = useState(shuffledTileData);
  const [initTileData, setInitTileData] = useState(shuffledTileData);
  const [solved, setSolved] = useState(false);

  const resetTiles = () => {
    setTileData(initTileData);
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        setMoveDirection('up');
        setTileData(prevTileData => boardUpMove(prevTileData));
        break;
      case 's':
      case 'ArrowDown':
        setMoveDirection('down');
        setTileData(prevTileData => boardDownMove(prevTileData));
        break;
      case 'a':
      case 'ArrowLeft':
        setMoveDirection('left');
        setTileData(prevTileData => boardLeftMove(prevTileData));
        break;
      case 'd':
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

  useEffect(() =>{
    if (checkSolved(tileData, pathIndex, pathIsCol)){
      setSolved(true);
    }
  }, [tileData])

  return (
    <div className={styles.layout}>
      <div className={styles.infoLeft}>
      Clear a path <br></br>
      for the arrow
      </div>
      <div className={styles.container}>
        <header className={styles.header}>Slidle</header>
          <SolvedContext.Provider value={solved}>
          <TileDataContext.Provider value={tileData}>
          <MoveDirectionContext.Provider value={moveDirection}>
            <Board resetTiles={resetTiles} pathIndex={pathIndex} pathIsCol={pathIsCol}/>
          </MoveDirectionContext.Provider>
          </TileDataContext.Provider>
          </SolvedContext.Provider>
        <footer className={styles.footer}>
          Powered by React.js <br></br>
          <a style={{ textDecoration: 'underline', color: 'white' }} target="_blank" href="https://github.com/bwt2/slidle">GitHub</a>
        </footer>
      </div>
      <div className={styles.infoRight}>
      <span style={{ textDecoration: 'underline' }}></span>
      Controls<br></br>
      W A S D<br></br>
      ↑ ← ↓ →
      </div>
    </div>

  )
}

export default App
