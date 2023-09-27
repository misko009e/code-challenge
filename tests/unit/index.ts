import { PathFinderHelperTests } from './path-finder-helper';
import {
    IPathFinderDirectionUnitTestCase,
    pathFinderDirectionTestCases,
    PathFinderDirectionTests
} from './path-finder-direction';

// TODO: Move the PathFinderHelper unit tests to a data config file
const pathFinderHelperTests: PathFinderHelperTests = new PathFinderHelperTests();
pathFinderHelperTests.runAllTests();

let successfulTestsCounter: number = 0;
pathFinderDirectionTestCases.forEach((testCase: IPathFinderDirectionUnitTestCase, index: number) => {
    console.log('*********************************************************************');
    console.log(`Testing PathFinderDirection [testDetermineNextDirection]: #${index+1}: ${testCase.name}`);
    const pathFinderDirectionTests: PathFinderDirectionTests =
        new PathFinderDirectionTests(testCase.map, testCase.currentPosition, testCase.previousPosition, testCase.previousDirection);
    pathFinderDirectionTests.testDetermineNextDirection();
    if (testCase.shouldBeCorrect) {
        const isDirectionOutputCorrect: boolean = testCase.outputDirection === pathFinderDirectionTests.nextDirection;
        console.log(`Direction comparison (expected === actual): "${testCase.outputDirection}" === "${pathFinderDirectionTests.nextDirection}"`);
        console.log(`Direction output: ${ isDirectionOutputCorrect ? 'Correct' : 'Incorrect' }`);
        if (isDirectionOutputCorrect) {
            successfulTestsCounter++;
        }
    } else {
        const isThrownErrorCorrect: boolean = testCase.error === pathFinderDirectionTests.error;
        console.log(`Error comparison (expected === actual): "${testCase.error}" === "${pathFinderDirectionTests.error}"`);
        console.log(`Error output: ${ isThrownErrorCorrect ? 'Correct' : 'Incorrect' }`);
        if (isThrownErrorCorrect) {
            successfulTestsCounter++;
        }
    }
});
console.log(`[PathFinderDirection] Successfully ran ${successfulTestsCounter}/${pathFinderDirectionTestCases.length}`);
console.log('*********************************************************************');
