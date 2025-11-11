import type { Anomaly, Level, MultiAnomalyImage } from './types/Level';

const levels = [
    {
        name: 'Party House',
        id: '1',
        rooms: [
            {
                id: '111',
                label: 'Kitchen 1',
                imageUrl: 'cam.jpg',
                activeImageUrl: 'cam.jpg',
                activeAnomolies: [] as Anomaly[],
                anomalies: [
                    {
                        id: '1111',
                        roomId: '',
                        imageURL: 'cam-dissappear.png',
                        validReports: ['Object Dissappearnace'],
                    },
                    {
                        id: '1112',
                        roomId: '',
                        imageURL: 'cam-appear.png',
                        validReports: ['Object Appearance'],
                    },
                    {
                        id: '1113',
                        roomId: '',
                        imageURL: 'cam-intrude.png',
                        validReports: ['Intruder'],
                    },
                ],
                multiAnomalyImages: [] as MultiAnomalyImage[],
            },
            {
                id: '20',
                label: 'Kitchen 2',
                imageUrl: 'cam2.jpg',
                activeImageUrl: 'cam2.jpg',
                activeAnomolies: [],
                anomalies: [
                    {
                        id: '2111',
                        roomId: '',
                        imageURL: 'cam2-dissappear.png',
                        validReports: ['Object Dissappearnace'],
                    },
                    {
                        id: '2119',
                        roomId: '',
                        imageURL: 'cam2-intrude.png',
                        validReports: ['Intruder'],
                    },
                ],
                multiAnomalyImages: [
                    {
                        id: '1000',
                        anomalyIds: ['2111', '2119'],
                        imageUrl: 'cam2-multi.png',
                    },
                ],
            },
        ],
    },
] as Level[];

levels.forEach((level) => {
    level.rooms.forEach((room) => {
        room.anomalies.forEach((anomaly) => {
            anomaly.roomId = room.id;
        });
    });
});

export default levels;
