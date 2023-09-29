import { PathFinderHelper } from '../../../src/path-finder/path-finder-helper';
import {
    Direction,
    ICharacterMetadata,
    IDirectionValidationData,
    IMatrixData, IMatrixPositionMap,
    IPosition
} from '../../../src/path-finder';
import {IPathFinderHelperTestsResult} from "./path-finder-helper.model";

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

    public testValidatePotentialDirection = () => {
        // Test case 1: Valid character on next position.
        const map: string[][] = [
            ['@', 'A', '+'],
            ['x', '-', 'B']
        ];
        const currentPosition: IPosition = { x: 0, y: 2 };
        const nextPotentialDirection: Direction = 'down';
        const visitedLocations: IMatrixPositionMap = {
            '0,0': true,
            '0,1': true
        };

        const directionValidationData: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(map, visitedLocations, currentPosition, nextPotentialDirection);
        if (!directionValidationData.isCharacterValid) {
            throw new Error('The function did not return a valid character.');
        }

        // Test case 2: Invalid character on next position.
        const invalidCharacterMap: string[][] = [
            ['@', 'A', '+'],
            ['x', '-', '2']
        ];
        const directionValidationDataInvalidCharacter: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(invalidCharacterMap, visitedLocations, currentPosition, nextPotentialDirection);
        if (!directionValidationDataInvalidCharacter.isAnExistingCharacter) {
            throw new Error('The function returned a valid direction, even though the direction is off the map.');
        }

        // Test case 3: Non-existing character (off the map).
        const nextPotentialDirectionOutOfBounds: Direction = 'up';
        const directionValidationDataOutOfBounds: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(map, visitedLocations, currentPosition, nextPotentialDirectionOutOfBounds);
        if (directionValidationDataOutOfBounds.isAnExistingCharacter) {
            throw new Error('The function returned a valid direction, even though the direction is off the map.');
        }

        // Test case 4: Previously visited intersection.
        const previouslyVisitedIntersectionMap: string[][] = [
            ['@', '-', '+', '+', 'x'],
            ['', '', '+', '+', ''],
        ];
        const previouslyVisitedIntersectionVisitedLocations: IMatrixPositionMap = {
            '0,0': true,
            '0,1': true,
            '0,2': true,
            '1,2': true,
            '1,3': true,
            '0,3': true,
        };
        const previouslyVisitedIntersectionPosition: IPosition = { x: 0, y: 3 };
        const previouslyVisitedIntersectionDirection: Direction = 'left';
        const directionValidationDataPreviouslyVisitedIntersection: IDirectionValidationData =
            PathFinderHelper.validatePotentialDirection(
                previouslyVisitedIntersectionMap,
                previouslyVisitedIntersectionVisitedLocations,
                previouslyVisitedIntersectionPosition,
                previouslyVisitedIntersectionDirection
            );
        if (!directionValidationDataPreviouslyVisitedIntersection.isPreviouslyVisitedIntersection) {
            throw new Error('The function returned an invalid direction, even though the direction is leading to a visited intersection.');
        }
    }

    public runTest(originalFunctionName: string, testFunction: Function): boolean {
        try {
            console.log('*********************************************************************');
            console.log(`Testing PathFinderHelperClass [${originalFunctionName}] ...`);
            testFunction();
            console.log(`[Success]: PathFinderHelperClass [${originalFunctionName}]`);
            return true;
        } catch (e) {
            console.log(`[Error] PathFinderHelperClass [${originalFunctionName}]: `, e);
            return false;
        }
    }

    public runAllTests(): IPathFinderHelperTestsResult {
        let successfulTestsCount: number = 0;
        this.runTest('determineMatrixSize', this.testDetermineMatrixSize) ? successfulTestsCount++ : null;
        this.runTest('determineCharacterPosition', this.testDetermineCharacterPosition) ? successfulTestsCount++ : null;
        this.runTest('isPositionWithinMapBounds', this.testIsPositionWithinMapBounds) ? successfulTestsCount++ : null;
        this.runTest('doesAnyCharacterExist', this.testDoesAnyCharacterExist) ? successfulTestsCount++ : null;
        this.runTest('isCharacterValid', this.testIsCharacterValid) ? successfulTestsCount++ : null;
        this.runTest('getNextDirectionPosition', this.testGetNextDirectionPosition) ? successfulTestsCount++ : null;
        this.runTest('validatePotentialDirection', this.testValidatePotentialDirection) ? successfulTestsCount++ : null;
        return { totalTestsCount: 7, successfulTestsCount} as IPathFinderHelperTestsResult;
    }
}
