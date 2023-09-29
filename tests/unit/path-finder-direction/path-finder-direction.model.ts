import {Direction, Error, IMatrixPositionMap, IPosition} from '../../../src/path-finder';

export interface IPathFinderDirectionUnitTestCase  {
    shouldBeCorrect: boolean;
    name: string;
    map: string[][];
    currentPosition: IPosition;
    visitedPathPositions: IMatrixPositionMap;
    previousDirection: Direction;
    outputDirection?: Direction;
    error?: Error;
}
