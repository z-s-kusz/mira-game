import selectAnomoly from './lib/anomaly-selector';
import levels from './levels';
import wait from './lib/wait';
import type { GameView } from './types/GameView';
import type { Anomaly, Level, Room } from './types/Level';
// let devMode = false;
let devMode = import.meta.env.DEV;

// time being less than ~3000 will result in some jittery fade ins/outs
const milliSecondsPerGameMinute = devMode ? 500 : 4000; // MT is 5000
let gameView: GameView = $state('MainMenu');
let clockSeconds = $state(0);
let clockInterval: number;
let selectedLevel: Level = $state(levels[0]); // only use after assigning in startGame()
let activeRoom: Room = $state(selectedLevel.rooms[0]); //  only use after assigning in startGame()
let nextAnomolyStartTime = $state(15);

let centerMessage = $state('');
let showFixingView = $state(false);
let gameOverState: 'win' | 'lose' | '' = $state('');
let anomolyGameOverCount = $state(4);
let warning = $state({
    threshhold: 3,
    remainingWarnings: 1,
});
let resolvedAnomalies: Anomaly[] = $state([]);
let activeAnomolies = $derived.by(() => {
    let activeAnomalies: Anomaly[] = [];
    selectedLevel.rooms.forEach((room) => {
        activeAnomalies = activeAnomalies.concat(room.activeAnomolies);
    });
    return activeAnomalies;
});

const startGame = (level: Level) => {
    gameView = 'Playing';
    selectedLevel = level;
    activeRoom = selectedLevel.rooms[0];
    startTimer();
};

const startTimer = () => {
    clockInterval = setInterval(() => {
        clockSeconds = clockSeconds + 1;

        if (clockSeconds >= 360) {
            gameOverState = 'win';
            gameView = 'GameOver';
            stopTimer();
        } else if (clockSeconds >= nextAnomolyStartTime) {
            if (checkForGameOver()) {
                // show game over message, if they have the perk show them what anomolies they missed
                gameOverState = 'lose';
                gameView = 'GameOver';
                return stopTimer();
            }
            activateNewAnomaly();
            setNextAnomolyStartTime();
        }
    }, milliSecondsPerGameMinute);
};

const stopTimer = () => {
    if (clockInterval) clearInterval(clockInterval);
    else throw Error('Tried stopping timer before init.');
};

const checkForGameOver = () => {
    return activeAnomolies.length === anomolyGameOverCount - 1;
};

const activateNewAnomaly = () => {
    let newAnomaly:Anomaly;
    try {
        newAnomaly = selectAnomoly(activeAnomolies, resolvedAnomalies, selectedLevel.rooms);
    } catch (error) {
        return handleError('No new anomalies found.')
    }
    if (!newAnomaly) return handleError('No new anomalies found.');

    const affectedRoom = selectedLevel.rooms.find((room) => room.id === newAnomaly.roomId);
    if (!affectedRoom) return handleError('Room ID for next anomaly not found.');

    affectedRoom.activeAnomolies.push(newAnomaly);

    if (affectedRoom.activeAnomolies.length >= 2) {
        const multiAnomalyImage = affectedRoom.multiAnomalyImages.find((multiAnomalyImage) => {
            let matchingAnomaliesCount = 0;
            affectedRoom.activeAnomolies.forEach((activeAnomaly) => {
                if (multiAnomalyImage.anomalyIds.includes(activeAnomaly.id)) {
                    matchingAnomaliesCount++;
                }
            });
            return matchingAnomaliesCount === affectedRoom.activeAnomolies.length;
        });
        if (!multiAnomalyImage) return handleError('Unable to find image for multi-anomoly.');
        affectedRoom.activeImageUrl = multiAnomalyImage.imageUrl;
    } else {
        affectedRoom.activeImageUrl = newAnomaly.imageUrl;
    }
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

const report = async (reportType: string, roomId?: string) => {
    if (!roomId) roomId = activeRoom.id;
    const room = selectedLevel.rooms.find((room) => room.id === roomId);
    if (!room) return handleError(`Room id ${roomId} not found.`);
    const reportIsCorrect = !!room.activeAnomolies.find((anomaly) => {
        return anomaly.validReports.includes(reportType);
    });

    centerMessage = 'Report pending...';
    await wait(milliSecondsPerGameMinute);
    centerMessage = '';

    if (reportIsCorrect) {
        showFixingView = true;
        // will remove ALL anomalies of that type in that room
        room.activeAnomolies = room.activeAnomolies.filter((anomaly) => {
            if (anomaly.validReports.includes(reportType)) {
                resolvedAnomalies.push(anomaly);
                return false;
            }
            return true;
        });

        if (room.activeAnomolies.length >= 2) { // limit is 2 so this if will never be hit but it'd be nice to add in the future
            const multiAnomalyImage = room.multiAnomalyImages.find((multiAnomalyImage) => {
                let matchingAnomaliesCount = 0;
                room.activeAnomolies.forEach((activeAnomaly) => {
                    if (multiAnomalyImage.anomalyIds.includes(activeAnomaly.id)) {
                        matchingAnomaliesCount++;
                    }
                });
                return matchingAnomaliesCount === room.activeAnomolies.length;
            });
            if (!multiAnomalyImage) return handleError('Unable to find multi-anomaly image after report filed.');
            room.activeImageUrl = multiAnomalyImage.imageUrl;
        } else if (room.activeAnomolies.length === 1) {
            room.activeImageUrl = room.activeAnomolies[0].imageUrl;
        } else {
            room.activeImageUrl = room.imageUrl;
        }
        await wait(devMode ? 500 : milliSecondsPerGameMinute / 2);
        showFixingView = false;

    } else {
        centerMessage = `Reported anomaly not found in ${room.label}`;
        await wait(milliSecondsPerGameMinute / 2);
        centerMessage = '';
    }
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

const decrementWarnings = () => {
    warning.remainingWarnings = warning.remainingWarnings - 1;
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

const getShowFixingView = () => {
    return showFixingView;
};

const getCenterMessage = () => {
    return centerMessage;
};

const getGameOverState = () => {
    return gameOverState;
};

const getResolvedAnomalies = () => {
    return resolvedAnomalies;
};

const handleError = (message: string) => {
    centerMessage = `Error: ${message} Refresh page to reset.`
    stopTimer();
    throw Error(message);
}

const reset = (replay = false) => {
    selectedLevel.rooms.forEach((room) => {
        room.activeImageUrl = room.imageUrl;
        room.activeAnomolies = [];
    });
    clockSeconds = 0;
    activeRoom = selectedLevel.rooms[0];
    nextAnomolyStartTime = 15;
    centerMessage = '';
    showFixingView = false;
    gameOverState = '';
    warning.remainingWarnings = 1;
    resolvedAnomalies = [];
    if (replay) {
        startGame(selectedLevel);
    } else {
        gameView = 'MainMenu';
    }
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
    report,
    getShowFixingView,
    getCenterMessage,
    getGameOverState,
    getResolvedAnomalies,
    decrementWarnings,
    reset,
};
