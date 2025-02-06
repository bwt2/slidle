import styles from '../styles/App.module.css'
import Board from './Board.jsx'
import React, { useState, useEffect } from 'react';
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

function App() {
  const [pathIndex, setPathIndex] = useState(null);
  const [pathIsCol, setPathIsCol] = useState(null);
  const [tileData, setTileData] = useState(null);
  const [initTileData, setInitTileData] = useState(null);
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(true);

  const resetTiles = () => {
    setTileData(initTileData);
  }

  // touchscreen inputs
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        setTileData(prevTileData => boardRightMove(prevTileData));
      } else if (deltaX < -50) {
        setTileData(prevTileData => boardLeftMove(prevTileData));
      }
    } else {
      if (deltaY > 50) {
        setTileData(prevTileData => boardDownMove(prevTileData));
      } else if (deltaY < -50) {
        setTileData(prevTileData => boardUpMove(prevTileData));
      }
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        setTileData(prevTileData => boardUpMove(prevTileData));
        break;
      case 's':
      case 'ArrowDown':
        setTileData(prevTileData => boardDownMove(prevTileData));
        break;
      case 'a':
      case 'ArrowLeft':
        setTileData(prevTileData => boardLeftMove(prevTileData));
        break;
      case 'd':
      case 'ArrowRight':
        setTileData(prevTileData => boardRightMove(prevTileData));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Generate initial solved state
    const { pathIndex, pathIsCol } = generatePathData();
    const unshuffledTileData = generateTileData(pathIndex, pathIsCol);

    // Shuffle the tiles
    let shuffledTileData = shuffleTiles(unshuffledTileData);
    while (checkSolved(shuffledTileData, pathIndex, pathIsCol)){
      shuffledTileData = shuffleTiles(shuffledTileData);
    }

    setTileData(shuffledTileData);
    setInitTileData(shuffledTileData);
    setPathIndex(pathIndex);
    setPathIsCol(pathIsCol);

    window.addEventListener('keydown', handleKeyDown);

    setLoading(false);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() =>{
    if (!loading){
      if (checkSolved(tileData, pathIndex, pathIsCol)){
        setSolved(true);
      }
    }
  }, [tileData])

  // <br /> hack
  return ( 
    <div className={styles.layout}>

      <div className={styles.infoLeft}>
        Clear a path <br/> 
        for the arrow
      </div>

      <div className={styles.container}>
        <header className={styles.header}>Slidle</header>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <SolvedContext.Provider value={solved}>
            <TileDataContext.Provider value={tileData}>
                <Board 
                  resetTiles={resetTiles} 
                  pathIndex={pathIndex} 
                  pathIsCol={pathIsCol}
                  handleTouchStart={handleTouchStart}
                  handleTouchMove={handleTouchMove}
                  handleTouchEnd={handleTouchEnd}
                />
            </TileDataContext.Provider>
          </SolvedContext.Provider>
        )}

        <div className={styles.infoBottom}>
          Swipe up / down / left / right <br/>
          Clear a path <br/> 
          for the arrow
        </div>

        <footer className={styles.footer}>
          Powered by React.js <br />
          <a style={{ textDecoration: 'underline', color: 'white' }} target="_blank" href="https://github.com/bwt2/slidle">
            GitHub
          </a>
        </footer>
      </div>

      <div className={styles.infoRight}>
        <span style={{ textDecoration: 'underline' }}></span>
        Controls<br/>
        W A S D<br/>
        ↑ ← ↓ →
      </div>

    </div>
  )
}

export default App
