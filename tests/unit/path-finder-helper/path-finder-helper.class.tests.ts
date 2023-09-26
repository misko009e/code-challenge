import { PathFinderHelper } from '../../../src/path-finder/path-finder-helper';
import {
    Direction,
    ICharacterMetadata,
    IDirectionValidationData,
    IMatrixData,
    IPosition
} from '../../../src/path-finder';

export class PathFinderHelperTests {
    public testDetermineMatrixSize = () => {
        const map: string[][] = [
            ['@', 'B', '+'],
            ['x', '-', '+']
        ];
        const expectedMatrixData: IMatrixData = { rows: 2, columns: 3 };

        const actualMatrixData: IMatrixData = PathFinderHelper.determineMatrixSize(map);
        if (actualMatrixData.rows !== expectedMatrixData.rows || actualMatrixData.columns !== expectedMatrixData.columns) {
            throw new Error('The matrix size was not determined correctly.');
        }
    }

    public testDetermineCharacterPosition = () => {
        // Test case 1: Character is found in the map.
        const map: string[][] = [
            ['@', 'B', '+'],
            ['x', '-', '+']
        ];
        const expectedPosition: ICharacterMetadata = { x: 0, y: 0, occurrencesNo: 1 };
        const actualPosition: ICharacterMetadata = PathFinderHelper.determineCharacterPosition(map, '@');
        if (actualPosition.x !== expectedPosition.x || actualPosition.y !== expectedPosition.y || actualPosition.occurrencesNo !== expectedPosition.occurrencesNo) {
            throw new Error('The character position was not determined correctly.');
        }

        // Test case 2: Character is not found in the map.
        const expectedPositionNotFound: ICharacterMetadata = { x: -1, y: -1, occurrencesNo: 0 };
        const actualPositionNotFound: ICharacterMetadata = PathFinderHelper.determineCharacterPosition(map, 'G');
        if (actualPositionNotFound.x !== expectedPositionNotFound.x || actualPositionNotFound.y !== expectedPositionNotFound.y || actualPositionNotFound.occurrencesNo !== expectedPositionNotFound.occurrencesNo) {
            throw new Error('The character position was not determined correctly.');
        }

        // Test case 3: Multiple occurrences of the character are found in the map.
        const expectedPositionMultipleOccurrences: ICharacterMetadata = { x: 1, y: 1, occurrencesNo: 2 };
        const mapWithMultipleOccurrences: string[][] = [
            ['@', 'B', '+'],
            ['x', 'B', '+']
        ];
        const actualPositionMultipleOccurrences: ICharacterMetadata = PathFinderHelper.determineCharacterPosition(mapWithMultipleOccurrences, 'B');
        if (actualPositionMultipleOccurrences.x !== expectedPositionMultipleOccurrences.x || actualPositionMultipleOccurrences.y !== expectedPositionMultipleOccurrences.y || actualPositionMultipleOccurrences.occurrencesNo !== expectedPositionMultipleOccurrences.occurrencesNo) {
            throw new Error('The character position was not determined correctly.');
        }
    }

    public testIsPositionWithinMapBounds = () => {
        // Test case 1: Position is within the map bounds.
        const map: string[][] = [
            ['@', 'B', '+'],
            ['x', 'B', '+']
        ];
        const x = 0;
        const y = 0;

        const isPositionWithinMapBounds: boolean = PathFinderHelper.isPositionWithinMapBounds(map, x, y);
        if (!isPositionWithinMapBounds) {
            throw new Error('The position was not determined to be within the map bounds.');
        }

        // Test case 2: Position is not within the map bounds.
        const xOutOfBounds = -1;
        const yOutOfBounds = 3;
        const isPositionOutOfBounds: boolean = PathFinderHelper.isPositionWithinMapBounds(map, xOutOfBounds, yOutOfBounds);
        if (isPositionOutOfBounds) {
            throw new Error('The position was determined to be within the map bounds, even though it is not.');
        }
    }

    public testDoesAnyCharacterExist = () => {
        // Test case 1: Character exists at the specified position.
        const map: string[][] = [
            ['@', 'B', '+'],
            ['x', 'B', '+']
        ];
        const x = 0;
        const y = 0;

        const doesAnyCharacterExist: boolean = PathFinderHelper.doesAnyCharacterExist(map, x, y);
        if (!doesAnyCharacterExist) {
            throw new Error('The function did not return true, even though a character exists at the specified position.');
        }

        // Test case 2: Character does not exist at the specified position.
        const xOutOfBounds = -1;
        const yOutOfBounds = 3;
        const doesAnyCharacterExistOutOfBounds: boolean = PathFinderHelper.doesAnyCharacterExist(map, xOutOfBounds, yOutOfBounds);
        if (doesAnyCharacterExistOutOfBounds) {
            throw new Error('The function returned true, even though a character does not exist at the specified position.');
        }

        // Test case 3: Character is an empty space character at the specified position.
        const emptySpaceMap: string[][] = [
            ['', 'B', '+'],
            ['x', 'B', '+']
        ];
        const doesAnyCharacterExistEmptySpace: boolean = PathFinderHelper.doesAnyCharacterExist(emptySpaceMap, x, y);
        if (doesAnyCharacterExistEmptySpace) {
            throw new Error('The function returned true, even though the character at the specified position is an empty space character.');
        }
    }

    public testIsCharacterValid = () => {
        // Test case 1: Character is valid.
        const map: string[][] = [
            ['@', 'A', '+'],
            ['1', 'B', '+']
        ];
        const x = 0;
        const y = 0;
        const isCharacterValid: boolean = PathFinderHelper.isCharacterValid(map, x, y);
        if (!isCharacterValid) {
            throw new Error('The function did not return true, even though the character is valid.');
        }

        // Test case 2: Character is not valid.
        const invalidX = 1;
        const invalidY = 0;
        const isInvalidCharacterValid: boolean = PathFinderHelper.isCharacterValid(map, invalidX, invalidY);
        if (isInvalidCharacterValid) {
            throw new Error('The function returned true, even though the character is not valid.');
        }

        // Test case 3: Character is an empty space character.
        const emptySpaceMap: string[][] = [
            ['', 'A', '+'],
            ['x', 'B', '+']
        ];
        const isEmptySpaceCharacterValid: boolean = PathFinderHelper.isCharacterValid(emptySpaceMap, x, y);
        if (isEmptySpaceCharacterValid) {
            throw new Error('The function returned true, even though the character is an empty space character.');
        }
    }

    public testGetNextDirectionPosition = () => {
        const currentPosition: IPosition = { x: 0, y: 0 };

        // Test case 1: Direction is up.
        const directionUp: Direction = 'up';
        const expectedNextPosition: IPosition = { x: -1, y: 0 };
        const actualNextPosition: IPosition = PathFinderHelper.getNextDirectionPosition(currentPosition, directionUp);
        if (actualNextPosition.x !== expectedNextPosition.x || actualNextPosition.y !== expectedNextPosition.y) {
            throw new Error('The next position was not calculated correctly.');
        }

        // Test case 2: Direction is down.
        const directionDown: Direction = 'down';
        const expectedNextPositionDown: IPosition = { x: 1, y: 0 };
        const actualNextPositionDown: IPosition = PathFinderHelper.getNextDirectionPosition(currentPosition, directionDown);
        if (actualNextPositionDown.x !== expectedNextPositionDown.x || actualNextPositionDown.y !== expectedNextPositionDown.y) {
            throw new Error('The next position was not calculated correctly.');
        }

        // Test case 3: Direction is right.
        const directionRight: Direction = 'right';
        const expectedNextPositionRight: IPosition = { x: 0, y: 1 };
        const actualNextPositionRight: IPosition = PathFinderHelper.getNextDirectionPosition(currentPosition, directionRight);
        if (actualNextPositionRight.x !== expectedNextPositionRight.x || actualNextPositionRight.y !== expectedNextPositionRight.y) {
            throw new Error('The next position was not calculated correctly.');
        }

        // Test case 4: Direction is left.
        const directionLeft: Direction = 'left';
        const expectedNextPositionLeft: IPosition = { x: 0, y: -1 };
        const actualNextPositionLeft: IPosition = PathFinderHelper.getNextDirectionPosition(currentPosition, directionLeft);
        if (actualNextPositionLeft.x !== expectedNextPositionLeft.x || actualNextPositionLeft.y !== expectedNextPositionLeft.y) {
            throw new Error('The next position was not calculated correctly.');
        }
    }

    public testAreDifferentPositions = () => {
        // Test case 1: Positions are different.
        const firstPosition: IPosition = { x: 0, y: 0 };
        const secondPosition: IPosition = { x: 1, y: 1 };
        const areDifferentPositions: boolean = PathFinderHelper.areDifferentPositions(firstPosition, secondPosition);
        if (!areDifferentPositions) {
            throw new Error('The function did not return true, even though the positions are different.');
        }

        // Test case 2: Positions are the same.
        const firstPositionSame: IPosition = { x: 0, y: 0 };
        const secondPositionSame: IPosition = { x: 0, y: 0 };
        const areDifferentPositionsSame: boolean = PathFinderHelper.areDifferentPositions(firstPositionSame, secondPositionSame);
        if (areDifferentPositionsSame) {
            throw new Error('The function returned true, even though the positions are the same.');
        }
    }

    public testIsDifferentDirection = () => {
        // Test case 1: Directions are different.
        const firstDirection: Direction = 'up';
        const secondDirection: Direction = 'down';
        const isDifferentDirection: boolean = PathFinderHelper.isDifferentDirection(firstDirection, secondDirection);
        if (!isDifferentDirection) {
            throw new Error('The function did not return true, even though the directions are different.');
        }

        // Test case 2: Directions are the same.
        const firstDirectionSame: Direction = 'up';
        const secondDirectionSame: Direction = 'up';
        const isDifferentDirectionSame: boolean = PathFinderHelper.isDifferentDirection(firstDirectionSame, secondDirectionSame);
        if (isDifferentDirectionSame) {
            throw new Error('The function returned true, even though the directions are the same.');
        }
    }

    public testValidatePotentialDirection = () => {
        // Test case 1: Valid direction.
        const map: string[][] = [
            ['@', 'A', '+'],
            ['x', '-', 'B']
        ];
        const currentPosition: IPosition = { x: 0, y: 2 };
        const previousPosition: IPosition = { x: 0, y: 1 };
        const previousDirection: Direction = 'right';
        const nextPotentialDirection: Direction = 'down';

        const directionValidationData: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(map, currentPosition, previousPosition, previousDirection, nextPotentialDirection);
        if (!directionValidationData.isValid) {
            throw new Error('The function did not return a valid direction.');
        }

        // Test case 2: Invalid direction (off the map).
        const nextPotentialDirectionOutOfBounds: Direction = 'up';
        const directionValidationDataOutOfBounds: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(map, currentPosition, previousPosition, previousDirection, nextPotentialDirectionOutOfBounds);
        if (directionValidationDataOutOfBounds.isValid) {
            throw new Error('The function returned a valid direction, even though the direction is off the map.');
        }

        // Test case 3: Invalid direction (backtracking).
        const nextPotentialDirectionBacktracking: Direction = 'left';
        const directionValidationDataBacktracking: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(map, currentPosition, previousPosition, previousDirection, nextPotentialDirectionBacktracking);
        if (directionValidationDataBacktracking.isValid) {
            throw new Error('The function returned a valid direction, even though the direction is backtracking.');
        }

        // Test case 4: Invalid direction (fake turn).
        const fakeTurnMap: string[][] = [
            ['@', '-', 'A', '-', '+', '-', 'B', '-', 'x'],
        ];
        const fakeTurnPosition: IPosition = { x: 0, y: 4 };
        const fakeTurnPreviousPosition: IPosition = { x: 0, y: 3 };
        const nextPotentialDirectionFakeTurn: Direction = 'right';
        const directionValidationDataFakeTurn: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(fakeTurnMap, fakeTurnPosition, fakeTurnPreviousPosition, previousDirection, nextPotentialDirectionFakeTurn);
        if (!directionValidationDataFakeTurn.isFakeTurn) {
            throw new Error('The function returned a valid direction, even though the direction is a fake turn.');
        }

        // Test case 5: Invalid direction (empty space).
        const nextPotentialDirectionEmptySpace: Direction = 'right';
        const emptySpaceMap: string[][] = [
            ['@', 'A', ''],
            ['x', '-', '-']
        ];
        const emptySpacePosition: IPosition = { x: 0, y: 1 };
        const emptySpacePreviousPosition: IPosition = { x: 0, y: 0 };
        const directionValidationDataEmptySpace: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(emptySpaceMap, emptySpacePosition, emptySpacePreviousPosition, previousDirection, nextPotentialDirectionEmptySpace);
        if (directionValidationDataEmptySpace.isValid) {
            throw new Error('The function returned a valid direction, even though the direction is to an empty space.');
        }

        // Test case 6: Invalid direction (invalid character).
        const nextPotentialDirectionInvalidCharacter: Direction = 'right';
        const invalidCharacterMap: string[][] = [
            ['@', 'A', '1'],
            ['x', '-', '-']
        ];
        const invalidCharacterPosition: IPosition = { x: 0, y: 1 };
        const invalidCharacterPreviousPosition: IPosition = { x: 0, y: 0 };
        const directionValidationDataInvalidCharacter: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(invalidCharacterMap, invalidCharacterPosition, invalidCharacterPreviousPosition, previousDirection, nextPotentialDirectionInvalidCharacter);
        if (directionValidationDataInvalidCharacter.isValid) {
            throw new Error('The function returned a valid direction, even though the direction is to an invalid character.');
        }
    }

    public runTest(originalFunctionName: string, testFunction: Function): void {
        try {
            console.log('*********************************************************************');
            console.log(`Testing PathFinderHelperClass [${originalFunctionName}] ...`);
            testFunction();
            console.log(`[Success]: PathFinderHelperClass [${originalFunctionName}]`);
        } catch (e) {
            console.log(`[Error] PathFinderHelperClass [${originalFunctionName}]: `, e);
        }
    }

    public runAllTests(): void {
        this.runTest('determineMatrixSize', this.testDetermineMatrixSize);
        this.runTest('determineCharacterPosition', this.testDetermineCharacterPosition);
        this.runTest('isPositionWithinMapBounds', this.testIsPositionWithinMapBounds);
        this.runTest('doesAnyCharacterExist', this.testDoesAnyCharacterExist);
        this.runTest('isCharacterValid', this.testIsCharacterValid);
        this.runTest('getNextDirectionPosition', this.testGetNextDirectionPosition);
        this.runTest('areDifferentPositions', this.testAreDifferentPositions);
        this.runTest('isDifferentDirection', this.testIsDifferentDirection);
        this.runTest('validatePotentialDirection', this.testValidatePotentialDirection);
    }
}
