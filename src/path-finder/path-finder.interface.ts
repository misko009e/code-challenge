export interface IPathFinderInputData {
    nodes: string[][];
}

export interface IPathFinderOutputData {
    letters: string;
    path: string;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface IMatrixData {
    rows: number;
    columns: number;
}
