import { PathFinderPosition } from '../../../src/path-finder/path-finder-position';
import { Direction, IPosition } from '../../../src/path-finder';

export class PathFinderPositionTests extends PathFinderPosition {
    constructor(
        protected map: string[][],
        protected currentPosition: IPosition,
        protected currentDirection: Direction,
    ) {
        super(map, currentPosition, currentDirection);
    }

    public testDetermineNextPosition(): void {
        this.determineNextPosition();
    }
}
