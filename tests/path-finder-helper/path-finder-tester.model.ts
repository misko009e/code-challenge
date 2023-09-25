import { Error } from '../../src/path-finder/common';

export interface IPathFinderTestCase {
    shouldBeCorrect: boolean;
    name: string;
    inputData: string[][];
    lettersOutput?: string;
    pathOutput?: string;
    error?: Error;
}
