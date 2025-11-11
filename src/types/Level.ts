export interface AnimationFrame {
    imageUrl: string;
    time: number;
}

export interface Anomaly {
    id: string;
    roomId: string;
    imageURL: string;
    validReports: string[];
    isAnimated: boolean;
    loopAnimation: boolean;
    frames: AnimationFrame[];
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
    anomalies: Anomaly[];
    multiAnomalyImages: MultiAnomalyImage[];
}

export interface Level {
    id: string;
    name: string;
    rooms: Room[];
}
