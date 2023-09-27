import { ICharacterMetadata, IDirectionValidationData, IMatrixData, IPosition } from '../path-finder.model';
import {Direction, EMPTY_SPACE_CHARACTER, VALID_CHARACTERS} from '../common';

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

    public static validatePotentialDirection(map: string[][],
                                             currentPosition: IPosition,
                                             previousPosition: IPosition,
                                             previousDirection: Direction,
                                             nextPotentialDirection: Direction): IDirectionValidationData {
        // We find a position which should represent the next move using the suggested direction
        const nextPotentialPosition: IPosition = PathFinderHelper.getNextDirectionPosition(currentPosition, nextPotentialDirection);
        // We verify that there is an actual character (not necessarily valid) on the suggested position
        const isAnExistingCharacter: boolean = PathFinderHelper.doesAnyCharacterExist(map, nextPotentialPosition.x, nextPotentialPosition.y);
        // We check if the character is valid
        const isCharacterValid: boolean = PathFinderHelper.isCharacterValid(map, nextPotentialPosition.x, nextPotentialPosition.y);
        return { isAnExistingCharacter, isCharacterValid } as IDirectionValidationData;
    }
}
