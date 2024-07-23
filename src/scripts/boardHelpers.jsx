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