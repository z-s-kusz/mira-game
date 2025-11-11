import type { Anomaly, Room } from './types/Level';

const selectAnomoly = (activeAnomalies: Anomaly[], resolvedAnomalies: Anomaly[], rooms: Room[]) => {
    const maxAnomaliesPerRoom = 2;
    const invalidAnomalyIds = activeAnomalies.concat(resolvedAnomalies).map(anomaly => anomaly.id);
    const validAnomalies = rooms.reduce((anomolies, room) => {
        if (room.activeAnomolies.length >= maxAnomaliesPerRoom) {
            // room already has the max anomolies that can appear on screen, don't add any from it to list
            return anomolies;
        }
        const validAnomaliesInRoom = room.anomalies.filter((anomaly) => {
            return !invalidAnomalyIds.includes(anomaly.id);
        });
        return [...anomolies, ...validAnomaliesInRoom];
    }, [] as Anomaly[]);

    if (validAnomalies.length === 0) {
        throw Error('Could not find valid anomaly');
    }

    const i = Math.floor(Math.random() * validAnomalies.length);
    return  validAnomalies[i];
};

export default selectAnomoly;
