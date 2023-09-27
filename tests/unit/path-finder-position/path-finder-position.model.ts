import { Direction, Error, IPosition } from '../../../src/path-finder';

export interface IPathFinderPositionUnitTestCase  {
    shouldBeCorrect: boolean;
    name: string;
    map: string[][];
    currentPosition: IPosition;
    currentDirection: Direction;
    outputPosition?: IPosition;
    error?: Error;
}
