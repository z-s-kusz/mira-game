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
                        imageUrl: 'cam-dissappear.png',
                        validReports: ['obj-dpr'],
                    },
                    {
                        id: '1112',
                        roomId: '',
                        imageUrl: 'cam-appear.png',
                        validReports: ['obj-apr'],
                    },
                    {
                        id: '1113',
                        roomId: '',
                        imageUrl: 'cam-intrude.png',
                        validReports: ['itr-apr'],
                    },
                ],
                multiAnomalyImages: [
                    {
                        id: '2001',
                        anomalyIds: ['1111', '1112'],
                        imageUrl: 'cam-dissappear+appear.png',
                    },
                    {
                        id: '2002',
                        anomalyIds: ['1113', '1112'],
                        imageUrl: 'cam-intruder+appear.png',
                    },
                    {
                        id: '2003',
                        anomalyIds: ['1113', '1111'],
                        imageUrl: 'cam-intruder+dissappear.png',
                    },
                ] as MultiAnomalyImage[],
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
                        imageUrl: 'cam2-dissappear.png',
                        validReports: ['obj-dpr'],
                    },
                    {
                        id: '2119',
                        roomId: '',
                        imageUrl: 'cam2-intrude.png',
                        validReports: ['itr-apr'],
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
