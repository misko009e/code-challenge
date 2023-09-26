import { Error } from './common';

export interface IPathFinderInputData {
    nodes: string[][];
}

export interface IPathFinderOutputData {
    letters?: string;
    path?: string;
    error: Error;
}

export interface ILettersMap {
    [key: string]: boolean;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface ICharacterMetadata extends IPosition {
    occurrencesNo: number;
}

export interface IMatrixData {
    rows: number;
    columns: number;
}

export interface IMatrixPositionMap {
    [key: string]: boolean;
}

export interface IDirectionValidationData {
    isValid: boolean;
    isFakeTurn: boolean;
    isCharacterValid: boolean;
}

export interface IDirectionsValidationData {
    [key: string]: IDirectionValidationData;
}
