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
    }
];
