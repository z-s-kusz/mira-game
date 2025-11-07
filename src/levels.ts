import type { Anomaly, Level, MultiAnomalyImage } from './types/Level';

export default [
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
                        id: '11',
                        imageURL: 'cam-dissappear.png',
                        validReports: ['Object Dissappearnace'],
                    },
                    {
                        id: '12',
                        imageURL: 'cam-appear.png',
                        validReports: ['Object Appearance'],
                    },
                    {
                        id: '13',
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
                        id: '11',
                        imageURL: 'cam2-dissappear.png',
                        validReports: ['Object Dissappearnace'],
                    },
                    {
                        id: '9',
                        imageURL: 'cam2-intrude.png',
                        validReports: ['Intruder'],
                    },
                ],
                multiAnomalyImages: [
                    {
                        id: '1000',
                        anomalyIds: ['11', '9'],
                        imageUrl: 'cam2-,ulti.png',
                    },
                ],
            },
        ],
    },
] as Level[];
