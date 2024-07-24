import styles from '../styles/Board.module.css'
import Tile from './Tile.jsx'
import direction from '../assets/direction.svg'
import { useEffect, useContext } from 'react';
import { TileDataContext } from '../contexts/tileDataContext.jsx';

export default function Board({ resetTiles }) {
    const tileData = useContext(TileDataContext);
    const tiles = tileData.map((typeData, index) => (
        <Tile key={index} 
            index={index} 
            type={typeData}>
            {index}
        </Tile>
    ));
    return (
    <section className={styles.boardContainer}>
        <img className={styles.arrow} src={direction}/>
        <ul className={styles.board}>
            {tiles}
        </ul>
        <button className={styles.resetBtn} onClick={resetTiles}>RESET</button>
    </section>);
}