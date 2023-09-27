import { PathFinderHelper } from '../path-finder-helper';
import { Direction, Error, POSSIBLE_DIRECTIONS, START_CHARACTER } from '../common';
import { IDirectionsValidationData, IDirectionValidationData, IPosition } from '../path-finder.model';

export class PathFinderDirection {
    public nextDirection: Direction = null;
    public error: Error = null;

    constructor(protected map: string[][],
                protected currentPosition: IPosition,
                protected previousDirection: Direction) {
        this.determineNextDirection();
    }

    protected determineNextDirection(): void {
        let directionsValidationData: IDirectionsValidationData = {};
        let possibleDirections: Direction[] = POSSIBLE_DIRECTIONS;
        const fakeTurnDirection: Direction = this.previousDirection;
        if (this.previousDirection === 'up' || this.previousDirection === 'down') {
            possibleDirections = ['left', 'right'];
        } else if (this.previousDirection === 'right' || this.previousDirection === 'left') {
            possibleDirections = ['up', 'down'];
        }

        let validDirectionsPathNo: number = 0;
        possibleDirections.forEach((potentialDirection: Direction) => {
            directionsValidationData[potentialDirection as string] =
                PathFinderHelper.validatePotentialDirection(this.map, this.currentPosition, potentialDirection);
            if (directionsValidationData[potentialDirection as string].isCharacterValid) {
                validDirectionsPathNo++;
            }
        });

        if (validDirectionsPathNo === 0) {
            // We check to see if there are any existing characters that are not valid, like numbers for example, otherwise the path is broken
            const doInvalidCharactersExist: boolean =
                possibleDirections.filter((d: Direction) => directionsValidationData[d as string].isAnExistingCharacter).length > 0;
            // We check to see if there is a fake turn position straight in front of the intersection
            const fakeDirectionPosition: IDirectionValidationData =
                PathFinderHelper.validatePotentialDirection(this.map, this.currentPosition, fakeTurnDirection);

            if (doInvalidCharactersExist) {
                this.error = 'Invalid character found';
            } else if (fakeDirectionPosition.isAnExistingCharacter) {
                this.error = 'Fake turn';
            } else {
                this.error = 'Broken path';
            }
        } else if (validDirectionsPathNo === 1) {
            // If there is only a single valid direction, return it
            this.nextDirection = possibleDirections.filter((d: Direction) => directionsValidationData[d as string].isCharacterValid)[0];
        } else if (validDirectionsPathNo === 2) {
            // In case of 2 possible directions, determine the error depending on if it is in the starting character positions
            const character: string = this.map[this.currentPosition.x][this.currentPosition.y];
            const isAStartingCharacter: boolean = character === START_CHARACTER;
            this.error = isAStartingCharacter ? 'Multiple starting paths' : 'Fork in path';
        }
    }
}
