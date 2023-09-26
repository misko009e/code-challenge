import { Direction, Error, IPosition } from '../../../src/path-finder';

export interface IPathFinderDirectionUnitTestCase  {
    shouldBeCorrect: boolean;
    name: string;
    map: string[][];
    currentPosition: IPosition;
    previousPosition: IPosition;
    previousDirection: Direction;
    error?: Error;
}
