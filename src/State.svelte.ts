import type { GameView } from './types/GameView';

let gameView: GameView = $state('MainMenu');

let clockSeconds = $state(0);
let clockInterval: number;

const startGame = () => {
    gameView = 'Playing';
    startTimer();
};

const startTimer = () => {
    clockInterval = setInterval(() => {
        clockSeconds = clockSeconds + 1;
        if (clockSeconds >= 1440) stopTimer();
    }, 4000);
};

const stopTimer = () => {
    if (clockInterval) clearInterval(clockInterval);
    else console.error('tried stopping timer before init.');
};

const getClockSeconds = () => {
    return clockSeconds;
};
const getGameView = () => {
    return gameView;
};
const setGameView = (value: GameView) => {
    gameView = value;
};

export {
    getGameView,
    setGameView,
    getClockSeconds,
    startGame,
};
