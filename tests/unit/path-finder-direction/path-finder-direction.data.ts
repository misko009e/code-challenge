import { IPathFinderDirectionUnitTestCase } from './path-finder-direction.model';

export const pathFinderDirectionTestCases: IPathFinderDirectionUnitTestCase[] = [
    {
        shouldBeCorrect: false,
        name: 'Multiple starting paths',
        map: [
            ['x', '-', 'B', '-', '@', '-', 'A', '-', 'x'],
        ],
        currentPosition: { x: 0, y: 4 },
        previousPosition: { x: -1, y: -1 },
        previousDirection: null,
        error: 'Multiple starting paths'
    },
    {
        shouldBeCorrect: false,
        name: 'Fork in path',
        map: [
            ['', '', '', '', '', 'C', '-', 'B'],
            ['', '', '', '', '', '', '', '|'],
            ['@', '-', '-', 'A', '-', '-', '-', '+'],
            ['', '', '', '', '', '', '', '|'],
            ['', '', '', 'x', '+', '', '', 'C'],
            ['', '', '', '', '|', '', '', '|'],
            ['', '', '', '', '-', '-', '-', '+'],
        ],
        currentPosition: { x: 2, y: 7 },
        previousPosition: { x: -2, y: 6 },
        previousDirection: 'right',
        error: 'Fork in path'
    },
    {
        shouldBeCorrect: false,
        name: 'Fake turn',
        map: [
            ['@', '-', 'A', '-', '+', '-', 'B', '-', 'x'],
        ],
        currentPosition: { x: 0, y: 4 },
        previousPosition: { x: 0, y: 3 },
        previousDirection: 'right',
        error: 'Fake turn'
    },
    {
        shouldBeCorrect: false,
        name: 'Broken path',
        map: [
            ['@', '-', '-', 'A', '-', '+', '', ''],
            ['', '', '', '', '', '|', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', 'B', '-', 'x'],
        ],
        currentPosition: { x: 1, y: 5 },
        previousPosition: { x: 0, y: 5 },
        previousDirection: 'down',
        error: 'Broken path'
    },
    {
        shouldBeCorrect: false,
        name: 'Invalid character found',
        map: [
            ['@', '-', '-', 'A', '-', '+', '', ''],
            ['', '', '', '', '', '1', '', ''],
            ['', '', '', '', '', '|', '', ''],
            ['', '', '', '', '', 'B', '-', 'x'],
        ],
        currentPosition: { x: 0, y: 5 },
        previousPosition: { x: 0, y: 4 },
        previousDirection: 'right',
        error: 'Invalid character found'
    },
    {
        shouldBeCorrect: false,
        name: 'Invalid character found #2',
        map: [
            ['@', '1', '%', '', ''],
            ['', '', '3', '', ''],
            ['', '', '5', '', ''],
            ['', '', '1', '', ''],
            ['', '', '7', '2', 'x'],
        ],
        currentPosition: { x: 0, y: 2 },
        previousPosition: { x: 0, y: 1 },
        previousDirection: 'right',
        error: 'Invalid character found'
    },
    {
        shouldBeCorrect: true,
        name: 'Successful up turn',
        map: [
            ['', '', '', '', '', 'B', '-', 'x'],
            ['', '', '', '', '', '|', '', ''],
            ['', '', '', '', '', '|', '', ''],
            ['@', '-', '-', 'A', '-', '+', '', ''],
        ],
        currentPosition: { x: 3, y: 5 },
        previousPosition: { x: 3, y: 4 },
        previousDirection: 'right',
        outputDirection: 'up'
    },
    {
        shouldBeCorrect: true,
        name: 'Successful up turn #2',
        map: [
            ['@', '+', '', '+', '-', '-', '+', ''],
            ['', '|', '', '|', '', '', '|', ''],
            ['', '|', '', '|', '', 'x', '|', ''],
            ['', '+', '-', 'A', '-', '+', 'B', ''],
        ],
        currentPosition: { x: 3, y: 6 },
        previousPosition: { x: 3, y: 7 },
        previousDirection: 'left',
        outputDirection: 'up'
    },
    {
        shouldBeCorrect: true,
        name: 'Successful down turn',
        map: [
            ['@', '-', '-', 'A', '-', '+', '', ''],
            ['', '', '', '', '', '|', '', ''],
            ['', '', '', '', '', '|', '', ''],
            ['', '', '', '', '', 'B', '-', 'x'],
        ],
        currentPosition: { x: 0, y: 5 },
        previousPosition: { x: 0, y: 4 },
        previousDirection: 'right',
        outputDirection: 'down'
    },
    {
        shouldBeCorrect: true,
        name: 'Successful right turn',
        map: [
            ['@', '', '+', 'B', '-', '+', '', ''],
            ['|', '', '|', '', '', '|', '', ''],
            ['+', '-', 'A', '', '', '|', '', ''],
            ['', '', '', '', '', 'C', '-', 'x'],
        ],
        currentPosition: { x: 2, y: 0 },
        previousPosition: { x: 1, y: 0 },
        previousDirection: 'down',
        outputDirection: 'right'
    },
    {
        shouldBeCorrect: true,
        name: 'Successful left turn',
        map: [
            ['@', '+', '', '+', '-', '-', '+', ''],
            ['', '|', '', '|', '', '', '|', ''],
            ['', '|', '', '|', '', '', '|', ''],
            ['', '+', '-', 'A', '', 'x', 'B', ''],
        ],
        currentPosition: { x: 3, y: 6 },
        previousPosition: { x: 2, y: 6 },
        previousDirection: 'down',
        outputDirection: 'left'
    },
];
