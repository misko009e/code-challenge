import { IPathFinderTestCase } from './path-finder-tester.model';
import { IPathFinderInputData, IPathFinderOutputData, PathFinder } from '../../src/path-finder';

export class PathFinderTester {
    constructor(private testCases: IPathFinderTestCase[]) {}

    public runTests(): void {
        let successfulTestsCounter: number = 0;
        this.testCases.forEach((testCase: IPathFinderTestCase, index: number) => {
            console.log('*********************************************************************');
            console.log(`Running test case #${index+1}: ${testCase.name}`);
            const INPUT_DATA: IPathFinderInputData = {
                nodes: testCase.inputData
            } as IPathFinderInputData;
            const pathFinder: PathFinder = new PathFinder(INPUT_DATA);
            const solution: IPathFinderOutputData = pathFinder.traversePath();
            if (testCase.shouldBeCorrect) {
                const isLettersOutputCorrect: boolean = testCase.lettersOutput === solution.letters;
                const isPathOutputCorrect: boolean = testCase.pathOutput === solution.path;
                console.log(`Letters comparison (expected === actual): "${testCase.lettersOutput}" === "${solution.letters}"`);
                console.log(`Letters output: ${ isLettersOutputCorrect ? 'Correct' : 'Incorrect' }`);
                console.log(`Path comparison (expected === actual): "${testCase.pathOutput}" === "${solution.path}"`);
                console.log(`Path output: ${ isPathOutputCorrect ? 'Correct' : 'Incorrect' }`);
                if (isLettersOutputCorrect && isPathOutputCorrect) {
                    successfulTestsCounter++
                }
            } else if (!testCase.shouldBeCorrect) {
                const isThrownErrorCorrect: boolean = testCase.error === solution.error;
                console.log(`Error comparison (expected === actual): "${testCase.error}" === "${solution.error}"`);
                console.log(`Error output: ${ isThrownErrorCorrect ? 'Correct' : 'Incorrect' }`);
                if (isThrownErrorCorrect) {
                    successfulTestsCounter++
                }
            }
        });
        console.log(`Successfully ran ${successfulTestsCounter}/${this.testCases.length}`);
        console.log('*********************************************************************');
    }
}
