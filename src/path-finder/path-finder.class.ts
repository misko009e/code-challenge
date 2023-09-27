import { PathFinderHelper } from './path-finder-helper';
import { PathFinderDirection } from './path-finder-direction';
import { PathFinderPosition } from './path-finder-position';
import {
    ICharacterMetadata, IMatrixData,
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
        let startCharacterMetadata: ICharacterMetadata = { x: -1, y: -1, occurrencesNo: -1};

        if (this.map.length === 0 || this.map[0].length === 0) {
            this.error = 'No data';
        }

        if (!this.error) {
            /* IMPORTANT NOTE: Even though the task description says jagged matrices are allowed,
            * due to the fact that there was no logic described around how to parse the jagged matrix,
            * and which formats are allowed, I have set this case as an error, and have
            * implemented the logic around matrices whose rows have an equal number of columns.*/
            /* POTENTIAL SOLUTION: If necessary, we could add logic which parses the jagged matrix into
            * the format used in the algorithm prior to running the algorithm, but I would need to know
            * which parsing logic is expected, since this was described ambiguously with no example. */
            const { columns} = PathFinderHelper.determineMatrixSize(this.map) as IMatrixData;
            this.map.forEach((rowData: string[]) => {
                if (rowData.length !== columns) {
                    this.error = 'Invalid data matrix format';
                }
            });
        }

        if (!this.error) {
            startCharacterMetadata = PathFinderHelper.determineCharacterPosition(this.map, START_CHARACTER);
            if (startCharacterMetadata.occurrencesNo === 0) {
                this.error = 'Missing start character';
            } else if (startCharacterMetadata.occurrencesNo > 1) {
                this.error = 'Multiple starts';
            }
        }

        if (!this.error) {
            const endCharacterMetadata: ICharacterMetadata = PathFinderHelper.determineCharacterPosition(this.map, END_CHARACTER);
            if (endCharacterMetadata.occurrencesNo === 0) {
                this.error = 'Missing end character';
            }
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

            const pathPosition: PathFinderPosition = new PathFinderPosition(this.map, position, direction);
            if (!!pathPosition.error) {
                this.error = pathPosition.error;
                return { error: this.error } as IPathFinderOutputData;
            }
            position = pathPosition.nextPosition;

            character = this.map[position.x][position.y];
            // If we encountered an intersection or if a character is at an intersection, we nullify direction so it can be recalculated
            if (LETTER_CHARACTERS[character]) {
                const nextPotentialPosition: IPosition = PathFinderHelper.getNextDirectionPosition(position, direction);
                const doesAnyCharacterExistOnNextPosition: boolean = PathFinderHelper.doesAnyCharacterExist(this.map, nextPotentialPosition.x, nextPotentialPosition.y);
                if (!doesAnyCharacterExistOnNextPosition) {
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
