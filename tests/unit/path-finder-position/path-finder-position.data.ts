import { IPathFinderPositionUnitTestCase } from './path-finder-position.model';

export const pathFinderPositionTestCases: IPathFinderPositionUnitTestCase[] = [
    {
        shouldBeCorrect: false,
        name: 'Broken path',
        map: [
            ['@', '-', 'A', '', 'B', '-', 'C', '-', 'x'],
        ],
        currentPosition: { x: 0, y: 2 },
        currentDirection: 'right',
        error: 'Broken path'
    },
    {
        shouldBeCorrect: false,
        name: 'Invalid character found',
        map: [
            ['@', '-', 'A', '3', 'B', '-', 'C', '-', 'x'],
        ],
        currentPosition: { x: 0, y: 2 },
        currentDirection: 'right',
        error: 'Invalid character found'
    },
    {
        shouldBeCorrect: true,
        name: 'Get next position',
        map: [
            ['@', '-', 'A', '-', 'B', '-', 'C', '-', 'x'],
        ],
        currentPosition: { x: 0, y: 2 },
        currentDirection: 'right',
        outputPosition: { x: 0, y: 3 }
    },
];
