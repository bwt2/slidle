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

function App() {
  const [pathIndex, setPathIndex] = useState(null);
  const [pathIsCol, setPathIsCol] = useState(null);
  const [moveDirection, setMoveDirection] = useState(null);
  const [tileData, setTileData] = useState(null);
  const [initTileData, setInitTileData] = useState(null);
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(true);

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
              <MoveDirectionContext.Provider value={moveDirection}>
                <Board resetTiles={resetTiles} pathIndex={pathIndex} pathIsCol={pathIsCol}/>
              </MoveDirectionContext.Provider>
            </TileDataContext.Provider>
          </SolvedContext.Provider>
        )}

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
