import { PathFinderHelper } from '../path-finder-helper';
import { Direction, Error, START_CHARACTER } from '../common';
import { IDirectionsValidationData, IPosition } from '../path-finder.model';
import { POSSIBLE_DIRECTIONS } from '../const';

export class PathFinderDirection {
    public nextDirection: Direction = null;
    public error: Error = null;

    constructor(protected map: string[][],
                protected currentPosition: IPosition,
                protected previousPosition: IPosition,
                protected previousDirection: Direction) {
        this.determineNextDirection();
    }

    protected determineNextDirection(): void {
        let directionsValidationData: IDirectionsValidationData = {};
        POSSIBLE_DIRECTIONS.forEach((potentialDirection: Direction) => {
            directionsValidationData[potentialDirection as string] =
                PathFinderHelper.validatePotentialDirection(this.map, this.currentPosition, this.previousPosition, this.previousDirection, potentialDirection);
        });

        // We calculate how many valid directions there are to determine if the path is broken or we have a fork in path
        const validDirectionsPathNo: number = [
            directionsValidationData['up'].isValid,
            directionsValidationData['down'].isValid,
            directionsValidationData['right'].isValid,
            directionsValidationData['left'].isValid,
        ].filter((isDirectionValid: boolean) => isDirectionValid).length;
        // We check if there is no other potential directions other than the fake turn direction
        const isAFakeTurn: boolean =
            (directionsValidationData['up'].isFakeTurn
                || directionsValidationData['down'].isFakeTurn
                || directionsValidationData['right'].isFakeTurn
                || directionsValidationData['left'].isFakeTurn)
            && validDirectionsPathNo === 0;

        let suggestedValidDirection: Direction = null;
        let isCharacterValid: boolean = true;
        // In case of a valid direction with a valid future position, we extract the only valid direction and take the character validation check
        if (validDirectionsPathNo === 1 && !isAFakeTurn) {
            suggestedValidDirection = POSSIBLE_DIRECTIONS.filter((d: Direction) => directionsValidationData[d as string].isValid)[0];
            isCharacterValid = directionsValidationData[suggestedValidDirection as string].isCharacterValid;
        }

        // We output the corresponding error or if there is no error, we set the potential direction as the next direction to use
        if (validDirectionsPathNo > 1) {
            const character: string = this.map[this.currentPosition.x][this.currentPosition.y];
            const isAStartingCharacter: boolean = character === START_CHARACTER;
            this.error = isAStartingCharacter ? 'Multiple starting paths' : 'Fork in path';
        } else if (isAFakeTurn) {
            // Fake turn can be considered a sub-case of "Broken path" error down below, which is why we check for it before the next if
            this.error = 'Fake turn';
        } else if (validDirectionsPathNo === 0) {
            this.error = 'Broken path';
        } else if (!isCharacterValid) {
            this.error = 'Invalid character found';
        } else {
            this.nextDirection = suggestedValidDirection;
        }
    }
}
