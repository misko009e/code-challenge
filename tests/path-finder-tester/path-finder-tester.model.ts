import { Error } from '../../src/path-finder';

export interface IPathFinderTestCase {
    shouldBeCorrect: boolean;
    name: string;
    inputData: string[][];
    lettersOutput?: string;
    pathOutput?: string;
    error?: Error;
}
