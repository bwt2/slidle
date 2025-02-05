import styles from '../styles/Tile.module.css'
import { useContext } from 'react';
import { MoveDirectionContext } from '../contexts/moveDirectionContext.jsx'
import { SolvedContext } from '../contexts/solvedContext.jsx';

  /* 
  * Board tiles:
  * 0 - Blank tile
  * 1 - Movable tile
  * 2 - Immovable tile
  */

export default function Tile({ index, type }){
    const moveDirection = useContext(MoveDirectionContext);
    const solved = useContext(SolvedContext);

    const solvedClass = solved ? styles.solved : '';

    return (
        <div
            className={`
                ${styles.tile} 
                ${type === 1 ? `${styles.movableTile} ${solvedClass}` : ''} 
                ${type === 2 ? `${styles.immovableTile} ${solvedClass}` : ''} 
            `}
        ></div>
    );
}