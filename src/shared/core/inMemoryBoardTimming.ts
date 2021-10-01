export interface IChannel {
    id: string;
    active: boolean;
    currentTime: number;
}

export interface IGuild {
    id: string;
    channels: Array<IChannel>;
}

const inMemoryBoardTimming: Array<IGuild> = [];

export default inMemoryBoardTimming;
