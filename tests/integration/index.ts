import { PathFinderTester } from './path-finder-tester';
import { integrationTestCases } from './path-finder-tester';

const pathFinderTester: PathFinderTester = new PathFinderTester(integrationTestCases);
pathFinderTester.runTests();
