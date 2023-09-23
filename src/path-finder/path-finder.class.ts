import {IMatrixData, IPathFinderInputData, IPathFinderOutputData, IPosition} from './path-finder.interface';
import {Direction, END_CHARACTER, Error, START_CHARACTER, VALID_CHARACTERS} from './common';

export class PathDirection {
    public nextDirection: Direction = null;

    constructor(protected map: string[][],
                protected currentPosition: IPosition) {
        this.determineNextDirection();
    }

    protected determineNextDirection(): void {
        // TODO: Implement logic for next position calculation

    }
}

export class PathPosition {
    public nextPosition: IPosition = null;

    constructor(protected map: string[][],
                protected currentPosition: IPosition,
                protected currentDirection: Direction) {
        this.determineNextPosition();
    }

    protected determineNextPosition(): void {
        // TODO: Implement logic for next direction calculation
    }
}

export class PathFinder {
    protected readonly map: string[][];
    protected letters: string[] = [];
    protected path: string[] = [];
    protected error: Error;

    constructor(inputData: IPathFinderInputData) {
        this.map = inputData.nodes;
    }

    protected determineMatrixSize(): IMatrixData {
        const rows = Object.keys(this.map).length;
        const columns = rows > 0 ? Object.keys(this.map[0]).length : 0;
        return { rows, columns } as IMatrixData;
    }

    protected determineStartingPosition(): IPosition {
        let position: IPosition = null;
        const { rows, columns } = this.determineMatrixSize() as IMatrixData;
        let x = -1;
        let y = -1;
        for (let i=0;i<rows;i++) {
            for (let j=0;j<columns;j++) {
                const char = this.map[i][j];
                if (!!char && char === START_CHARACTER) {
                    x = i;
                    y = i;
                    break;
                }
            }
        }
        if (x !== -1 && y !== -1) {
            position = {x, y} as IPosition;
        }
        return position;
    }

    protected calculatePath(): void {
        let isPathFinished = false;
        let position:  IPosition = this.determineStartingPosition();
        if (!position) {
            this.error = 'Missing start character';
            return;
        }

        let direction: Direction = null;
        let character: string = this.map[position.x][position.y];
        this.path.push(character);
        while (!isPathFinished) {
            let pathDirection = new PathDirection(this.map, position);
            if (!pathDirection) {
                this.error = 'Broken path';
                return;
            }
            direction = pathDirection.nextDirection;

            const pathPosition = new PathPosition(this.map, position, direction);
            position = pathPosition.nextPosition;

            character = this.map[position.x][position.y];
            this.path.push(character);

            if (character === END_CHARACTER) {
                isPathFinished = true;
            } else if (VALID_CHARACTERS[character]) {
                this.letters.push(character);
            }
        }
    }

    public traversePath(): IPathFinderOutputData {
        this.calculatePath();
        return {
            letters: this.letters.join(''),
            path: this.path.join('')
        } as IPathFinderOutputData;
    }
}
