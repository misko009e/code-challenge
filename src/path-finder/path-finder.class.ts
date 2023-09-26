import {
    ICharacterMetadata,
    IDirectionsValidationData,
    IDirectionValidationData,
    IMatrixData,
    IMatrixPositionMap,
    IPathFinderInputData,
    IPathFinderOutputData,
    IPosition,
} from './path-finder.model';
import {
    Direction,
    END_CHARACTER,
    Error,
    INTERSECTION_CHARACTER,
    START_CHARACTER,
    LETTER_CHARACTERS,
    VALID_CHARACTERS, EMPTY_SPACE_CHARACTER
} from './common';
import { POSSIBLE_DIRECTIONS } from './const';

export class PathFinderHelper {
    public static determineMatrixSize(map: string[][]): IMatrixData {
        const rows = Object.keys(map).length;
        const columns = rows > 0 ? Object.keys(map[0]).length : 0;
        return { rows, columns } as IMatrixData;
    }

    public static determineCharacterPosition(map: string[][], character: string): ICharacterMetadata {
        let position: ICharacterMetadata = { x: -1, y: -1, occurrencesNo: 0 };
        const { rows, columns } = this.determineMatrixSize(map) as IMatrixData;
        for (let i=0;i<rows;i++) {
            for (let j=0;j<columns;j++) {
                const char: string = map[i][j];
                if (!!char && char === character) {
                    position.x = i;
                    position.y = j;
                    position.occurrencesNo++;
                }
            }
        }
        return position;
    }

    public static isPositionWithinMapBounds(map: string[][], x: number, y: number): boolean {
        const { rows, columns } = this.determineMatrixSize(map) as IMatrixData;
        const isXWithinMapBounds = x >= 0 && x < rows;
        const isYWithinMapBounds = y >= 0 && y < columns;
        return isXWithinMapBounds && isYWithinMapBounds;
    }

    public static doesAnyCharacterExist(map: string[][], x: number, y: number): boolean {
        let doesAnyCharacterExist: boolean = false;
        if (this.isPositionWithinMapBounds(map, x, y)) {
            const character: string = map[x][y];
            if (character !== EMPTY_SPACE_CHARACTER) {
                doesAnyCharacterExist = true;
            }
        }
        return doesAnyCharacterExist;
    }

    public static isCharacterValid(map: string[][], x: number, y: number): boolean {
        let isCharacterValid: boolean = false;
        if (this.isPositionWithinMapBounds(map, x, y)) {
            const character: string = map[x][y];
            if (VALID_CHARACTERS[character]) {
                isCharacterValid = true;
            }
        }
        return isCharacterValid;
    }

    public static getNextDirectionPosition(currentPosition: IPosition, direction: Direction): IPosition {
        const nextPotentialPosition: IPosition = { x: currentPosition.x, y: currentPosition.y };
        switch (direction) {
            case 'up':
                nextPotentialPosition.x--;
                break;
            case 'down':
                nextPotentialPosition.x++;
                break;
            case 'right':
                nextPotentialPosition.y++;
                break;
            case 'left':
                nextPotentialPosition.y--;
                break;
        }
        return nextPotentialPosition;
    }

    public static areDifferentPositions(firstPosition: IPosition, secondPosition: IPosition): boolean {
        return firstPosition.x !== secondPosition.x || firstPosition.y !== secondPosition.y;
    }

    public static isDifferentDirection(firstDirection: Direction, secondDirection: Direction): boolean {
        return firstDirection !== secondDirection;
    }

    public static validatePotentialDirection(map: string[][],
                                             currentPosition: IPosition,
                                             previousPosition: IPosition,
                                             previousDirection: Direction,
                                             nextPotentialDirection: Direction): IDirectionValidationData {
        // We find a position which should represent the next move using the suggested direction
        const nextPotentialPosition: IPosition = PathFinderHelper.getNextDirectionPosition(currentPosition, nextPotentialDirection);
        // We verify that there is an actual character (not necessarily valid) on the suggested position
        const isAnExistingCharacter: boolean = PathFinderHelper.doesAnyCharacterExist(map, nextPotentialPosition.x, nextPotentialPosition.y);
        // We verify that we are not backtracking
        const isDifferentPositionThanPrevious: boolean = PathFinderHelper.areDifferentPositions(previousPosition, nextPotentialPosition);
        // We verify that we are not making a fake turn
        const isDifferentDirectionThanPrevious: boolean = PathFinderHelper.isDifferentDirection(previousDirection, nextPotentialDirection);
        // We calculate is the position valid, meaning a position with an actual character within map bounds that is not a fake turn
        const isValid: boolean = isAnExistingCharacter && isDifferentPositionThanPrevious && isDifferentDirectionThanPrevious;
        // We calculate is the position a fake turn based on the calculated parameters
        const isFakeTurn: boolean = isAnExistingCharacter && isDifferentPositionThanPrevious && !isDifferentDirectionThanPrevious;
        const isCharacterValid: boolean = PathFinderHelper.isCharacterValid(map, nextPotentialPosition.x, nextPotentialPosition.y);
        return { isValid, isFakeTurn, isCharacterValid } as IDirectionValidationData;
    }
}

export class PathDirection {
    public nextDirection: Direction = null;
    public error: Error = null;

    constructor(protected map: string[][],
                protected currentPosition: IPosition,
                protected previousPosition: IPosition,
                protected previousDirection: Direction) {
        this.determineNextDirection();
    }

    protected determineNextDirection(): void {
        /*console.log('[PathDirection] Current Position:', this.currentPosition);
        console.log('[PathDirection] Previous position:', this.previousPosition);
        console.log('[PathDirection] Previous direction:', this.previousDirection);*/
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

export class PathPosition {
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

export class PathFinder {
    protected readonly map: string[][];
    protected letters: string[] = [];
    protected visitedPathPositions: IMatrixPositionMap = {};
    protected path: string[] = [];
    protected error: Error = null;

    constructor(protected inputData: IPathFinderInputData) {
        this.map = inputData.nodes;
    }

    protected verifyEdgeCasesAndFindStartingPosition(): ICharacterMetadata {
        const startCharacterMetadata: ICharacterMetadata = PathFinderHelper.determineCharacterPosition(this.map, START_CHARACTER);
        if (startCharacterMetadata.occurrencesNo === 0) {
            this.error = 'Missing start character';
        } else if (startCharacterMetadata.occurrencesNo > 1) {
            this.error = 'Multiple starts';
        }

        const endCharacterMetadata: ICharacterMetadata = PathFinderHelper.determineCharacterPosition(this.map, END_CHARACTER);
        if (endCharacterMetadata.occurrencesNo === 0) {
            this.error = 'Missing end character';
        }

        return startCharacterMetadata;
    }

    public traversePath(): IPathFinderOutputData {
        const startCharacterMetadata: ICharacterMetadata = this.verifyEdgeCasesAndFindStartingPosition();
        if (!!this.error) {
            return { error: this.error } as IPathFinderOutputData;
        }

        let isPathFinished: boolean = false;
        let position: IPosition = { x: startCharacterMetadata.x, y: startCharacterMetadata.y };
        let previousPosition: IPosition = { x: -1, y: -1 };
        let direction: Direction = null;
        let previousDirection: Direction = null;
        let character: string = this.map[position.x][position.y];
        this.path.push(character);
        this.visitedPathPositions[`${position.x},${position.y}`] = true;

        while (!isPathFinished) {
            /*console.log('*********************************************************************');
            console.log('Path: ', this.path.join(''));*/
            if (!direction) {
                let pathDirection: PathDirection = new PathDirection(this.map, position, previousPosition, previousDirection);
                if (!!pathDirection.error) {
                    this.error = pathDirection.error;
                    return { error: this.error } as IPathFinderOutputData;
                }
                direction = pathDirection.nextDirection;
            }
            // console.log('Direction: ', direction);
            previousPosition = { ...position };
            // console.log('Previous Position: ', direction);
            previousDirection = direction;

            const pathPosition: PathPosition = new PathPosition(this.map, position, direction);
            if (!!pathPosition.error) {
                this.error = pathPosition.error;
                return { error: this.error } as IPathFinderOutputData;
            }
            position = pathPosition.nextPosition;
            // console.log(`Position: ${position.x}, ${position.y}`);

            character = this.map[position.x][position.y];
            /*console.log('Character: ', character);
            console.log('*********************************************************************');*/
            if (LETTER_CHARACTERS[character]) {
                // A check for weather or not is this an intersection
                const nextPotentialPosition: IPosition = PathFinderHelper.getNextDirectionPosition(position, direction);
                const isNextCharacterValid: boolean = PathFinderHelper.doesAnyCharacterExist(this.map, nextPotentialPosition.x, nextPotentialPosition.y);
                if (!isNextCharacterValid) {
                    direction = null;
                }
                // Only add those letters which were previously not added
                if (!this.visitedPathPositions[`${position.x},${position.y}`]) {
                    this.letters.push(character);
                }
            } else if (character === INTERSECTION_CHARACTER) {
                direction = null;
            }

            // Log the visited path indexes
            this.visitedPathPositions[`${position.x},${position.y}`] = true;
            this.path.push(character);

            // If a character is the end character, exit the loop
            if (character === END_CHARACTER) {
                isPathFinished = true;
            }
        }

        return {
            letters: this.letters.join(''),
            path: this.path.join(''),
            ...(!!this.error ? { error: this.error } : {})
        } as IPathFinderOutputData;
    }
}
