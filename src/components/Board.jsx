import styles from '../styles/Board.module.css'
import Tile from './Tile.jsx'
import { useEffect, useContext } from 'react';
import { TileDataContext } from '../contexts/tileDataContext.jsx';

export default function Board() {
    const tileData = useContext(TileDataContext);
    const tiles = tileData.map((typeData, index) => (
        <Tile key={index} 
            index={index} 
            type={typeData}>
            {index}
        </Tile>
    ));
    return (
        <ul className={styles.board}>
            {tiles}
        </ul>
    );
}