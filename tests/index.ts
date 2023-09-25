import { PathFinderTester } from './path-finder-tester.class';
import { testCases } from './path-finder-tester.data';

const pathFinderTester: PathFinderTester = new PathFinderTester(testCases);
pathFinderTester.runTests();
