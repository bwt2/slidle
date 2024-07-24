import { BOARD_DIMENSIONS } from "../components/constants";

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

export const boardLeftMove = (prevTileData) => {
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

export const boardRightMove = (prevTileData) => {
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

export const boardUpMove = (prevTileData) => {
    const newTileData = [...prevTileData];
    for (let i = BOARD_DIMENSIONS; i < newTileData.length; i++){
        if (newTileData[i-BOARD_DIMENSIONS] === 0 && newTileData[i] === 1){
        newTileData[i-BOARD_DIMENSIONS] = 1;
        newTileData[i] = 0;
        }
    }
    return newTileData;
}

export const boardDownMove = (prevTileData) => {
    const newTileData = [...prevTileData];
    for (let i = newTileData.length - BOARD_DIMENSIONS - 1; i >= 0; i--) {
        if (newTileData[i + BOARD_DIMENSIONS] === 0 && newTileData[i] === 1) {
        newTileData[i + BOARD_DIMENSIONS] = 1;
        newTileData[i] = 0;
        }
    }
    return newTileData;
}

export const generatePathData = () => {
    const pathIndex = getRandomInt(BOARD_DIMENSIONS-2)+1; // dont allow path at 0 or at BOARD_DIMENSIONS
    const pathIsCol = getRandomInt(2);
    return {pathIndex, pathIsCol};
}
  
export const generateTileData = (pathIndex, pathIsCol) => {
    const tileData = new Array(BOARD_DIMENSIONS ** 2).fill(null).map(() => getRandomInt(3));
    // row path
    if (!pathIsCol){ 
        for (let i = pathIndex * 5; i < pathIndex * 5 + BOARD_DIMENSIONS; i++){
            tileData[i] = 0;
        }
    } else { // col path
        for (let i = pathIndex; i < tileData.length; i += 5){
            tileData[i] = 0;
        }
    }
    return tileData;
}
  
export const shuffleTiles = (tileData) => {
    let newTileData = [...tileData];
    const SHUFFLE_MOVES = 5;
    for (let i = 0; i < SHUFFLE_MOVES; i++) {
        const moveDirection = getRandomInt(4);
        switch (moveDirection) {
            case 0:
                newTileData = boardLeftMove(newTileData);
                break;
            case 1:
                newTileData = boardRightMove(newTileData);
                break;
            case 2:
                newTileData = boardUpMove(newTileData);
                break;
            case 3:
                newTileData = boardDownMove(newTileData);
                break;
            default:
                break;
        }
    }
    return newTileData;
}

export const checkSolved = (tileData, pathIndex, pathIsCol) => {
    if (!pathIsCol){ 
        for (let i = pathIndex * 5; i < pathIndex * 5 + BOARD_DIMENSIONS; i++){
            if (tileData[i] === 1) {return false;}
        }
    } else { // col path
        for (let i = pathIndex; i < tileData.length; i += 5){
            if (tileData[i] === 1) {return false;}
        }
    }
    return true;
}