import {IPathFinderHelperTestsResult, PathFinderHelperTests} from './path-finder-helper';
import {
    IPathFinderDirectionUnitTestCase,
    pathFinderDirectionTestCases,
    PathFinderDirectionTests
} from './path-finder-direction';
import {
    IPathFinderPositionUnitTestCase,
    pathFinderPositionTestCases,
    PathFinderPositionTests
} from "./path-finder-position";

// TODO: Move the PathFinderHelper unit tests to a data config file as well
const pathFinderHelperTests: PathFinderHelperTests = new PathFinderHelperTests();
let pathFinderHelperTestResults: IPathFinderHelperTestsResult = pathFinderHelperTests.runAllTests();
console.log(`[PathFinderHelper] Successfully ran ${pathFinderHelperTestResults.successfulTestsCount}/${pathFinderHelperTestResults.totalTestsCount}`);

let successfulTestsCounter: number = 0;
pathFinderDirectionTestCases.forEach((testCase: IPathFinderDirectionUnitTestCase, index: number) => {
    console.log('*********************************************************************');
    console.log(`Testing PathFinderDirection [testDetermineNextDirection]: #${index+1}: ${testCase.name}`);
    const pathFinderDirectionTests: PathFinderDirectionTests =
        new PathFinderDirectionTests(testCase.map, testCase.currentPosition, testCase.previousDirection);
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

successfulTestsCounter = 0;
pathFinderPositionTestCases.forEach((testCase: IPathFinderPositionUnitTestCase, index: number) => {
    console.log('*********************************************************************');
    console.log(`Testing PathFinderPosition [testDetermineNextDirection]: #${index+1}: ${testCase.name}`);
    const pathFinderPositionTests: PathFinderPositionTests =
        new PathFinderPositionTests(testCase.map, testCase.currentPosition, testCase.currentDirection);
    pathFinderPositionTests.testDetermineNextPosition();
    if (testCase.shouldBeCorrect) {
        const isDirectionOutputCorrect: boolean =
            testCase.outputPosition?.x === pathFinderPositionTests.nextPosition.x
            && testCase.outputPosition?.y === pathFinderPositionTests.nextPosition.y;
        console.log(`Direction comparison (expected === actual): "${JSON.stringify(testCase.outputPosition)}" === "${JSON.stringify(pathFinderPositionTests.nextPosition)}"`);
        console.log(`Direction output: ${ isDirectionOutputCorrect ? 'Correct' : 'Incorrect' }`);
        if (isDirectionOutputCorrect) {
            successfulTestsCounter++;
        }
    } else {
        const isThrownErrorCorrect: boolean = testCase.error === pathFinderPositionTests.error;
        console.log(`Error comparison (expected === actual): "${testCase.error}" === "${pathFinderPositionTests.error}"`);
        console.log(`Error output: ${ isThrownErrorCorrect ? 'Correct' : 'Incorrect' }`);
        if (isThrownErrorCorrect) {
            successfulTestsCounter++;
        }
    }
});
console.log(`[pathFinderPosition] Successfully ran ${successfulTestsCounter}/${pathFinderPositionTestCases.length}`);
console.log('*********************************************************************');
