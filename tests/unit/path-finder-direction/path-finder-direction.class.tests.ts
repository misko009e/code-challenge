import { PathFinderDirection } from '../../../src/path-finder/path-finder-direction';
import { Direction, IMatrixPositionMap, IPosition } from '../../../src/path-finder';

export class PathFinderDirectionTests extends PathFinderDirection {
    constructor(
        protected map: string[][],
        protected visitedPathPositions: IMatrixPositionMap,
        protected currentPosition: IPosition,
        protected previousDirection: Direction,
    ) {
        super(map, visitedPathPositions, currentPosition, previousDirection);
    }

    public testDetermineNextDirection(): void {
        this.determineNextDirection();
    }
}
