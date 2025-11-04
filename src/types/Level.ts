export interface Anomaly {
    id: string;
    imageURL: string;
    validReports: string[];
}

export interface MultiAnomalyImage {
    id: string;
    anomalyIds: string[];
    imageURL: string;
}

export interface Room {
    id: string;
    label: string;
    imageUrl: string;
    activeImageUrl: string;
    activeAnomolies: Anomaly[];
    anomolies: Anomaly[];
    multiAnomalyImages: MultiAnomalyImage[];
}

export interface Level {
    id: string;
    name: string;
    rooms: Room[];
}
