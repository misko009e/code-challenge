import { PathFinderTester } from './path-finder-tester';
import { testCases } from './path-finder-tester';

const pathFinderTester: PathFinderTester = new PathFinderTester(testCases);
pathFinderTester.runTests();
