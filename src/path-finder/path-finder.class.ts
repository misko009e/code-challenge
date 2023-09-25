import {
    ICharacterMetadata,
    IMatrixData,
    IMatrixPositionMap,
    IPathFinderInputData,
    IPathFinderOutputData,
    IPosition
} from './path-finder.interface';
import {
    Direction,
    END_CHARACTER,
    Error,
    INTERSECTION_CHARACTER,
    START_CHARACTER,
    LETTER_CHARACTERS,
    VALID_CHARACTERS, EMPTY_SPACE_CHARACTER
} from './common';

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
}

export class PathDirection {
    public nextDirection: Direction = null;
    public error: Error = null;

    constructor(protected map: string[][],
                protected visitedPathPositions: IMatrixPositionMap,
                protected currentPosition: IPosition,
                protected currentDirection: Direction) {
        this.determineNextDirection();
    }

    protected determineNextDirection(): void {
        const currentX: number = this.currentPosition.x;
        const currentY: number = this.currentPosition.y;
        console.log('[PathDirection] Current X:', currentX);
        console.log('[PathDirection] Current Y:', currentY);
        console.log('[PathDirection] Current direction:', this.currentDirection);

        const upPosition: IPosition = PathFinderHelper.getNextDirectionPosition(this.currentPosition, 'up');
        const isUpPositionValid: boolean =
            PathFinderHelper.isCharacterValid(this.map, upPosition.x, upPosition.y)
            && !this.visitedPathPositions[`${upPosition.x},${upPosition.y}`];
        const isAFakeUpTurn: boolean = isUpPositionValid && this.currentDirection === 'up';

        const downPosition: IPosition = PathFinderHelper.getNextDirectionPosition(this.currentPosition, 'down');
        const isDownPositionValid: boolean =
            PathFinderHelper.isCharacterValid(this.map, downPosition.x, downPosition.y)
            && !this.visitedPathPositions[`${downPosition.x},${downPosition.y}`];
        const isAFakeDownTurn: boolean = isDownPositionValid && this.currentDirection === 'down';

        const rightPosition: IPosition = PathFinderHelper.getNextDirectionPosition(this.currentPosition, 'right');
        const isRightPositionValid: boolean =
            PathFinderHelper.isCharacterValid(this.map, rightPosition.x, rightPosition.y)
            && !this.visitedPathPositions[`${rightPosition.x},${rightPosition.y}`];
        const isAFakeRightTurn: boolean = isRightPositionValid && this.currentDirection === 'right';

        const leftPosition: IPosition = PathFinderHelper.getNextDirectionPosition(this.currentPosition, 'left');
        const isLeftPositionValid: boolean =
            PathFinderHelper.isCharacterValid(this.map, leftPosition.x, leftPosition.y)
            && !this.visitedPathPositions[`${leftPosition.x},${leftPosition.y}`];
        const isAFakeLeftTurn: boolean = isLeftPositionValid && this.currentDirection === 'left';

        const validDirectionsPathNo: number = [
            isUpPositionValid,
            isDownPositionValid,
            isRightPositionValid,
            isLeftPositionValid
        ].filter((isDirectionValid: boolean) => isDirectionValid).length;

        if (validDirectionsPathNo === 0) {
            this.error = 'Broken path';
        } else if (validDirectionsPathNo > 1) {
            this.error = 'Fork in path';
        } else if (isAFakeUpTurn || isAFakeDownTurn || isAFakeRightTurn || isAFakeLeftTurn) {
            this.error = 'Fake turn';
        } else if (isUpPositionValid) {
            this.nextDirection = 'up';
        } else if (isDownPositionValid) {
            this.nextDirection = 'down';
        } else if (isRightPositionValid) {
            this.nextDirection = 'right';
        } else if (isLeftPositionValid) {
            this.nextDirection = 'left';
        } else {
            this.error = 'Broken path';
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
        const nextPosition: IPosition = PathFinderHelper.getNextDirectionPosition(this.currentPosition, this.currentDirection);
        if (!PathFinderHelper.isCharacterValid(this.map, nextPosition.x, nextPosition.y)) {
            this.error = 'Broken path';
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

    public traversePath(): IPathFinderOutputData {
        let isPathFinished: boolean = false;
        const startCharacterMetadata: ICharacterMetadata = PathFinderHelper.determineCharacterPosition(this.map, START_CHARACTER);
        if (startCharacterMetadata.occurrencesNo === 0) {
            this.error = 'Missing start character';
            return { error: this.error } as IPathFinderOutputData;
        } else if (startCharacterMetadata.occurrencesNo > 1) {
            this.error = 'Multiple starts';
            return { error: this.error } as IPathFinderOutputData;
        }

        const endCharacterMetadata: ICharacterMetadata = PathFinderHelper.determineCharacterPosition(this.map, END_CHARACTER);
        if (endCharacterMetadata.occurrencesNo === 0) {
            this.error = 'Missing end character';
            return { error: this.error } as IPathFinderOutputData;
        } else if (endCharacterMetadata.occurrencesNo > 1) {
            // TODO: This might need to be removed and replaced with "Fork in path" error
            this.error = 'Multiple ends';
            return { error: this.error } as IPathFinderOutputData;
        }

        let position: IPosition = { x: startCharacterMetadata.x, y: startCharacterMetadata.y };
        let direction: Direction = null;
        let character: string = this.map[position.x][position.y];
        this.path.push(character);
        this.visitedPathPositions[`${position.x},${position.y}`] = true;

        while (!isPathFinished) {
            console.log('*********************************************************************');
            console.log('Path: ', this.path.join(''));
            if (!direction) {
                let pathDirection: PathDirection = new PathDirection(this.map, this.visitedPathPositions, position, direction);
                if (!!pathDirection.error) {
                    this.error = pathDirection.error;
                    return { error: this.error } as IPathFinderOutputData;
                }
                direction = pathDirection.nextDirection;
            }
            console.log('Direction: ', direction);

            const pathPosition: PathPosition = new PathPosition(this.map, position, direction);
            if (!!pathPosition.error) {
                this.error = pathPosition.error;
                return { error: this.error } as IPathFinderOutputData;
            }
            position = pathPosition.nextPosition;
            console.log(`Position: ${position.x}, ${position.y}`);
            console.log('*********************************************************************');

            character = this.map[position.x][position.y];
            if (LETTER_CHARACTERS[character]) {
                // A check for weather or not is this an intersection
                const nextPotentialPosition: IPosition = PathFinderHelper.getNextDirectionPosition(position, direction);
                const isNextCharacterValid: boolean = PathFinderHelper.isCharacterValid(this.map, nextPotentialPosition.x, nextPotentialPosition.y);
                if (!isNextCharacterValid) {
                    direction = null;
                }
                // Only add those letters which were previously not added
                if (!this.visitedPathPositions[`${position.x},${position.y}`]) {
                    this.letters.push(character);
                }
            }

            this.visitedPathPositions[`${position.x},${position.y}`] = true;
            this.path.push(character);

            if (character === INTERSECTION_CHARACTER) {
                direction = null;
            } else if (character === END_CHARACTER) {
                isPathFinished = true;
            } else if (character === EMPTY_SPACE_CHARACTER) {
                this.error = 'Broken path';
                isPathFinished = true;
            } else if (!VALID_CHARACTERS[character]) {
                this.error = 'Invalid character found';
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
