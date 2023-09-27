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
import {IPathFinderUnitTestCase, pathFinderTestCases, PathFinderTests} from "./path-finder";
import {ICharacterMetadata, IPathFinderOutputData} from "../../src/path-finder";

/* PATH FINDER HELPER UNIT TESTS */
// TODO: Move the PathFinderHelper unit tests to a data config file as well
const pathFinderHelperTests: PathFinderHelperTests = new PathFinderHelperTests();
let pathFinderHelperTestResults: IPathFinderHelperTestsResult = pathFinderHelperTests.runAllTests();
console.log(`[PathFinderHelper] Successfully ran ${pathFinderHelperTestResults.successfulTestsCount}/${pathFinderHelperTestResults.totalTestsCount}`);

/* PATH FINDER DIRECTION UNIT TESTS */
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

/* PATH FINDER POSITION UNIT TESTS */
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

/* PATH FINDER UNIT TESTS */
successfulTestsCounter = 0;
pathFinderTestCases.forEach((testCase: IPathFinderUnitTestCase, index: number) => {
    console.log('*********************************************************************');
    const pathFinderTests: PathFinderTests = new PathFinderTests(testCase.inputData);
    const characterMetadata: ICharacterMetadata = pathFinderTests.testVerifyEdgeCasesAndFindStartingPosition();
    const outputData: IPathFinderOutputData = pathFinderTests.testTraversePath();
    if (testCase.shouldBeCorrect) {
        if (testCase.isTestingEdgeCases) {
            console.log(`Testing PathFinder [verifyEdgeCasesAndFindStartingPosition]: #${index+1}: ${testCase.name}`);
            const isOutputCorrect: boolean =
                testCase.outputCharacterMetadata?.x === characterMetadata.x
                && testCase.outputCharacterMetadata?.y === characterMetadata.y
                && testCase.outputCharacterMetadata?.occurrencesNo === characterMetadata.occurrencesNo;
            console.log(`Character metadata comparison (expected === actual): "${JSON.stringify(testCase.outputCharacterMetadata)}" === "${JSON.stringify(characterMetadata)}"`);
            console.log(`Character metadata output: ${ isOutputCorrect ? 'Correct' : 'Incorrect' }`);
            if (isOutputCorrect) {
                successfulTestsCounter++;
            }
        } else {
            console.log(`Testing PathFinder [traversePath]: #${index+1}: ${testCase.name}`);
            const isLettersOutputCorrect: boolean = testCase.outputData?.letters === outputData?.letters;
            const isPathOutputCorrect: boolean = testCase.outputData?.path === outputData?.path;
            const isOutputCorrect: boolean = testCase.outputData?.letters === outputData?.letters && testCase.outputData?.path === outputData?.path;
            console.log(`Letters comparison (expected === actual): "${testCase.outputData?.letters}" === "${outputData?.letters}"`);
            console.log(`Letters output: ${ isLettersOutputCorrect ? 'Correct' : 'Incorrect' }`);
            console.log(`Path comparison (expected === actual): "${testCase.outputData?.path}" === "${outputData?.path}"`);
            console.log(`Path output: ${ isPathOutputCorrect ? 'Correct' : 'Incorrect' }`);
            if (isOutputCorrect) {
                successfulTestsCounter++;
            }
        }
    } else {
        const isThrownErrorCorrect: boolean = testCase.error === outputData?.error;
        console.log(`Error comparison (expected === actual): "${testCase.error}" === "${outputData?.error}"`);
        console.log(`Error output: ${ isThrownErrorCorrect ? 'Correct' : 'Incorrect' }`);
        if (isThrownErrorCorrect) {
            successfulTestsCounter++;
        }
    }
});
console.log(`[pathFinder] Successfully ran ${successfulTestsCounter}/${pathFinderTestCases.length}`);
console.log('*********************************************************************');
