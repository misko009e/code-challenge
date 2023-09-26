import { PathFinderHelper } from './path-finder-helper';
import { PathFinderDirection } from './path-finder-direction';
import {
    ICharacterMetadata,
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
} from './common';

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

        // We prepare the initial algorithm state of the used variables
        let isPathFinished: boolean = false;
        let position: IPosition = { x: startCharacterMetadata.x, y: startCharacterMetadata.y };
        let previousPosition: IPosition = { x: -1, y: -1 };
        let direction: Direction = null;
        let previousDirection: Direction = null;
        let character: string = this.map[position.x][position.y];
        this.path.push(character);
        this.visitedPathPositions[`${position.x},${position.y}`] = true;

        while (!isPathFinished) {
            if (!direction) {
                let pathDirection: PathFinderDirection = new PathFinderDirection(this.map, position, previousPosition, previousDirection);
                if (!!pathDirection.error) {
                    this.error = pathDirection.error;
                    return { error: this.error } as IPathFinderOutputData;
                }
                direction = pathDirection.nextDirection;
            }
            previousPosition = { ...position };
            previousDirection = direction;

            const pathPosition: PathPosition = new PathPosition(this.map, position, direction);
            if (!!pathPosition.error) {
                this.error = pathPosition.error;
                return { error: this.error } as IPathFinderOutputData;
            }
            position = pathPosition.nextPosition;
            // console.log(`Position: ${position.x}, ${position.y}`);

            character = this.map[position.x][position.y];
            // If we encountered an intersection or a character is at an intersection, we nullify direction so it can be recalculated
            if (LETTER_CHARACTERS[character]) {
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
