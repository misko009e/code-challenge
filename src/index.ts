import { IPathFinderInputData, PathFinder } from './path-finder';

const NODES: string[][] = [
    ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
    ['', '', '', '', '', '', '', '', '|'],
    ['x', '-', 'B', '-', '+', '', '', '', 'C'],
    ['', '', '', '', '|', '', '', '', '|'],
    ['', '', '', '', '+', '-', '-', '-', '+']
];

const INPUT_DATA = {
    nodes: NODES
} as IPathFinderInputData;

const pathFinder = new PathFinder(INPUT_DATA);
const solution = pathFinder.traversePath();
console.log(solution);
