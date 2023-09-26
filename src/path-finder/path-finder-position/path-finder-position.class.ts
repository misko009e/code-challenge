import { PathFinderHelper } from '../path-finder-helper';
import { IPosition } from '../path-finder.model';
import { Direction, Error } from '../common';

export class PathFinderPosition {
    public nextPosition: IPosition = { x: -1, y: -1 };
    public error: Error = null;

    constructor(protected map: string[][],
                protected currentPosition: IPosition,
                protected currentDirection: Direction) {
        this.determineNextPosition();
    }

    protected determineNextPosition(): void {
        // We get the next position using the current direction which was previously verified, as we keep going straight
        const nextPosition: IPosition = PathFinderHelper.getNextDirectionPosition(this.currentPosition, this.currentDirection);
        // We check if there is a missing or an invalid character on the suggested direction
        if (!PathFinderHelper.doesAnyCharacterExist(this.map, nextPosition.x, nextPosition.y)) {
            this.error = 'Broken path';
            return;
        } else if (!PathFinderHelper.isCharacterValid(this.map, nextPosition.x, nextPosition.y)) {
            this.error = 'Invalid character found';
            return;
        }
        this.nextPosition = nextPosition;
    }
}
