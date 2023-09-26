import { PathFinderDirection } from '../../../src/path-finder/path-finder-direction';
import { Direction, IPosition } from '../../../src/path-finder';

export class PathFinderDirectionTests extends PathFinderDirection {
    constructor(
        protected map: string[][],
        protected currentPosition: IPosition,
        protected previousPosition: IPosition,
        protected previousDirection: Direction,
    ) {
        super(map, currentPosition, previousPosition, previousDirection);
    }

    // TODO: Implement unit tests for direction class
}
