import styles from '../styles/Board.module.css'
import Tile from './Tile.jsx'
import direction from '../assets/direction.svg'
import { useEffect, useContext } from 'react';
import { TileDataContext } from '../contexts/tileDataContext.jsx';
import { SolvedContext } from '../contexts/solvedContext.jsx';
import { BOARD_DIMENSIONS } from "../components/constants";

export default function Board({ resetTiles, pathIndex, pathIsCol, handleTouchStart, handleTouchMove, handleTouchEnd }) {
    const tileData = useContext(TileDataContext);
    const tiles = tileData.map((typeData, index) => (
        <Tile key={index} 
            index={index} 
            type={typeData}>
            {index}
        </Tile>
    ));

    const solved = useContext(SolvedContext);

    const cellSize = 100 / BOARD_DIMENSIONS; // Size of each cell in percentage
    const arrowSize = 10; // Adjust this value based on the actual size of your arrow in percentage

    const arrowPosition = {
        top: pathIsCol ?  `calc(-${arrowSize}%)` : `calc(${pathIndex * cellSize}%)`,
        left: pathIsCol ?  `calc(${pathIndex * cellSize}% + ${arrowSize/2}%)` : `calc(-${arrowSize}%)`,
        transform: pathIsCol ? 'rotate(180deg)': 'rotate(90deg)'
    };

    return (
    <section 
        className={styles.boardContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
        <img className={styles.arrow} style={arrowPosition} src={direction}/>
        {solved ? (
            <ul className={`${styles.board} ${styles.solvedBoard}`}>
                {tiles}
            </ul>
        ):(
            <ul className={styles.board}>
                {tiles}
            </ul>
        )}
        <button className={styles.resetBtn} onClick={resetTiles}>RESET</button>
    </section>
    );
}