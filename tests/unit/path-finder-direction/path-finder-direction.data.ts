import { IPathFinderDirectionUnitTestCase } from './path-finder-direction.model';

export const pathFinderDirectionTestCases: IPathFinderDirectionUnitTestCase[] = [
    {
        shouldBeCorrect: false,
        name: 'Multiple starting paths',
        map: [
            ['x', '-', 'B', '-', '@', '-', 'A', '-', 'x'],
        ],
        currentPosition: { x: 0, y: 4 },
        visitedPathPositions: {},
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
        visitedPathPositions: {
            '2,0': true,
            '2,1': true,
            '2,2': true,
            '2,3': true,
            '2,4': true,
            '2,5': true,
            '2,6': true,
            '2,7': true,
        },
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
        visitedPathPositions: {
            '0,0': true,
            '0,1': true,
            '0,2': true,
            '0,3': true,
            '0,4': true,
        },
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
        visitedPathPositions: {
            '0,0': true,
            '0,1': true,
            '0,2': true,
            '0,3': true,
            '0,4': true,
            '0,5': true,
            '1,5': true,
        },
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
        visitedPathPositions: {
            '0,0': true,
            '0,1': true,
            '0,2': true,
            '0,3': true,
            '0,4': true,
            '0,5': true,
        },
        previousDirection: 'right',
        error: 'Invalid character found'
    },
    {
        shouldBeCorrect: false,
        name: 'Invalid character found #2',
        map: [
            ['@', '-', '+', '', ''],
            ['', '', '3', '', ''],
            ['', '', '5', '', ''],
            ['', '', '1', '', ''],
            ['', '', '7', '2', 'x'],
        ],
        currentPosition: { x: 0, y: 2 },
        visitedPathPositions: {
            '0,0': true,
            '0,1': true,
            '0,2': true,
        },
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
        visitedPathPositions: {
            '3,0': true,
            '3,1': true,
            '3,2': true,
            '3,3': true,
            '3,4': true,
            '3,5': true,
        },
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
        currentPosition: { x: 3, y: 5 },
        visitedPathPositions: {
            '0,0': true,
            '0,1': true,
            '1,1': true,
            '2,1': true,
            '3,1': true,
            '3,2': true,
            '3,3': true,
            '3,4': true,
            '3,5': true,
        },
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
        visitedPathPositions: {
            '0,0': true,
            '0,1': true,
            '0,2': true,
            '0,3': true,
            '0,4': true,
            '0,5': true,
        },
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
        visitedPathPositions: {
            '0,0': true,
            '1,0': true,
            '2,0': true,
        },
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
        visitedPathPositions: {
            '0,0': true,
            '0,1': true,
            '1,1': true,
            '2,1': true,
            '3,1': true,
            '3,2': true,
            '3,3': true,
            '2,3': true,
            '1,3': true,
            '0,3': true,
            '0,4': true,
            '0,5': true,
            '0,6': true,
            '1,6': true,
            '2,6': true,
            '3,6': true,
        },
        previousDirection: 'down',
        outputDirection: 'left'
    },
];
