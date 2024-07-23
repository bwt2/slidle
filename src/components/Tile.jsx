import styles from '../styles/Tile.module.css'
import { useContext } from 'react';
import { MoveDirectionContext } from '../contexts/moveDirectionContext.jsx'

  /* 
  * Board tiles:
  * 0 - Blank tile
  * 1 - Movable tile
  * 2 - Immovable tile
  */

export default function Tile({ index, type }){
    const moveDirection = useContext(MoveDirectionContext);
    let tile = null;
    switch (type){
        case 0:
            tile = (
                <div className={`${styles.tile}`}></div>
            );
            break;
        case 1:
            tile = (
                <div className={`${styles.tile} ${styles.movableTile}`}>{index}</div>
            );
            break;
        case 2:
            tile = (
                <div className={`${styles.tile} ${styles.immovableTile}`}></div>
            );
            break;
    }
    return (<>
        {tile}
    </>);
}