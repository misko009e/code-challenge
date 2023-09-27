import { IPathFinderUnitTestCase } from './path-finder.model';

export const pathFinderTestCases: IPathFinderUnitTestCase[] = [
    {
        shouldBeCorrect: false,
        name: 'verifyEdgeCasesAndFindStartingPosition - No data',
        inputData: {
            nodes: []
        },
        isTestingEdgeCases: true,
        error: 'No data'
    },
    {
        shouldBeCorrect: false,
        name: 'verifyEdgeCasesAndFindStartingPosition - No data #2',
        inputData: {
            nodes: [
                []
            ]
        },
        isTestingEdgeCases: true,
        error: 'No data'
    },
    {
        shouldBeCorrect: false,
        name: 'verifyEdgeCasesAndFindStartingPosition - Invalid data matrix format',
        inputData: {
            nodes: [
                ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
                ['|'],
                ['x', '-', 'B', '-', '+', '', '', '', 'C'],
                ['|', '', '', '', '|'],
                ['+', '-', '-', '-', '+']
            ]
        },
        isTestingEdgeCases: true,
        error: 'Invalid data matrix format'
    },
    {
        shouldBeCorrect: false,
        name: 'verifyEdgeCasesAndFindStartingPosition - Missing start character',
        inputData: {
            nodes: [
                ['A', '-', '+'],
                ['C', 'B', '+'],
            ]
        },
        isTestingEdgeCases: true,
        error: 'Missing start character'
    },
    {
        shouldBeCorrect: false,
        name: 'verifyEdgeCasesAndFindStartingPosition - Multiple starts',
        inputData: {
            nodes: [
                ['@', '-', '+'],
                ['@', 'B', '+'],
            ]
        },
        isTestingEdgeCases: true,
        error: 'Multiple starts'
    },
    {
        shouldBeCorrect: false,
        name: 'verifyEdgeCasesAndFindStartingPosition - Missing end character',
        inputData: {
            nodes: [
                ['@', 'A', '+'],
                ['C', 'B', '+'],
            ]
        },
        isTestingEdgeCases: true,
        error: 'Missing end character'
    },
    {
        shouldBeCorrect: false,
        name: 'traversePath - Fork in path',
        inputData: {
            nodes: [
                ['', '', '', '', '', 'C', '-', 'B'],
                ['', '', '', '', '', '', '', '|'],
                ['@', '-', '-', 'A', '-', '-', '-', '+'],
                ['', '', '', '', '', '', '', '|'],
                ['', '', '', 'x', '+', '', '', 'C'],
                ['', '', '', '', '|', '', '', '|'],
                ['', '', '', '', '-', '-', '-', '+'],
            ]
        },
        isTestingEdgeCases: false,
        error: 'Fork in path'
    },
    {
        shouldBeCorrect: false,
        name: 'traversePath - Invalid character found',
        inputData: {
            nodes: [
                ['@', '-', '-', 'A', '-', '+', '', ''],
                ['', '', '', '', '', '|', '', ''],
                ['', '', '', '', '', '1', '', ''],
                ['', '', '', '', '', 'B', '-', 'x'],
            ]
        },
        isTestingEdgeCases: false,
        error: 'Invalid character found'
    },
    {
        shouldBeCorrect: true,
        name: 'traversePath - Successful run',
        inputData: {
            nodes: [
                ['@', '-', '-', 'A', '-', '+', '', ''],
                ['', '', '', '', '', '|', '', ''],
                ['', '', '', '', '', 'C', '', ''],
                ['', '', '', '', '', '|', '', ''],
                ['', '', '', '', '', 'B', '-', 'x'],
            ]
        },
        isTestingEdgeCases: false,
        outputData: {
            letters: 'ACB',
            path: '@--A-+|C|B-x'
        }
    },
];
