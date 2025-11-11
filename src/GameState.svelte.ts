import selectAnomoly from './anomaly-selector';
import levels from './levels';
import type { GameView } from './types/GameView';
import type { Anomaly, Level, Room } from './types/Level';

const milliSecondsPerGameMinute = 1000; // MT is 5000
let gameView: GameView = $state('MainMenu');
let clockSeconds = $state(0);
let clockInterval: number;
let selectedLevel: Level = $state(levels[0]);
let activeRoom: Room = $state(levels[0].rooms[0]);
let nextAnomolyStartTime = $state(15);

let anomolyGameOverCount = $state(4);
let warning = $state({
    threshhold: 3,
    remainingWarnings: 1,
});
let resolvedAnomolys: Anomaly[] = $state([]);
let activeAnomolies = $derived.by(() => {
    let activeAnomalies: Anomaly[] = [];
    selectedLevel.rooms.forEach((room) => {
        activeAnomalies = activeAnomalies.concat(room.activeAnomolies);
    });
    return activeAnomalies;
});

const startGame = (level: Level) => {
    gameView = 'Playing';
    startTimer();
};

const startTimer = () => {
    clockInterval = setInterval(() => {
        clockSeconds = clockSeconds + 1;

        if (clockSeconds >= 360) {
            stopTimer();
        } else if (clockSeconds >= nextAnomolyStartTime) {
            if (gameIsOver()) {
                // show game over message, if they have the perk show them what anomolies they missed
                return stopTimer();
            }
            activateNewAnomaly();
            setNextAnomolyStartTime();
        }
    }, milliSecondsPerGameMinute);
};

const stopTimer = () => {
    if (clockInterval) clearInterval(clockInterval);
    else console.error('tried stopping timer before init.');
};

const gameIsOver = () => {
    return activeAnomolies.length === anomolyGameOverCount - 1;
};

const activateNewAnomaly = () => {
    const newAnomaly = selectAnomoly(activeAnomolies, resolvedAnomolys, selectedLevel.rooms);
};

const setNextAnomolyStartTime = () => {
    const wieghedTimes = [
        12,
        13, 13,
        14, 14, 14,
        15, 15, 15, 15, 15,
        16, 16,
        17,
    ];
    const i = Math.floor(Math.random() * wieghedTimes.length);
    nextAnomolyStartTime = clockSeconds + wieghedTimes[i];
};

const goToNextRoom = () => {
    const currentRoomIndex = selectedLevel.rooms.findIndex((room: Room) => {
        return room.id === activeRoom.id;
    });
    const nextIndex = currentRoomIndex + 1 === selectedLevel.rooms.length ? 0 : currentRoomIndex + 1;

    activeRoom = selectedLevel.rooms[nextIndex];
};

const goToPreviousRoom = () => {
    const currentRoomIndex = selectedLevel.rooms.findIndex((room: Room) => {
        return room.id === activeRoom.id;
    });
    const nextIndex = currentRoomIndex === 0 ? selectedLevel.rooms.length - 1 : currentRoomIndex - 1;
    activeRoom = selectedLevel.rooms[nextIndex];
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

const getWarning = () => {
    return warning;
};

const getActiveAnomaliesCount = () => {
    return activeAnomolies.length;
};

const getActiveRoom = () => {
    return activeRoom;
};

const getRooms = () => {
    return selectedLevel.rooms;
};

export {
    getGameView,
    setGameView,
    getClockSeconds,
    startGame,
    goToNextRoom,
    goToPreviousRoom,
    getWarning,
    getActiveAnomaliesCount,
    getActiveRoom,
    getRooms,
};
