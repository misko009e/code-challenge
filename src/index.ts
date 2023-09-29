import { IPathFinderInputData, IPathFinderOutputData, PathFinder } from './path-finder';

// A basic example
const MAP_NODES: string[][] = [
    ['', '+', '-', 'L', '-', '+', '', ''],
    ['', '|', '', '', '+', 'A', '-', '+'],
    ['@', 'B', '+', '', '+', '+', '', 'H'],
    ['', '+', '+', '', '', '', '', 'x'],
];

const INPUT_DATA: IPathFinderInputData = {
    nodes: MAP_NODES
};

const pathFinder: PathFinder = new PathFinder(INPUT_DATA);
const solution: IPathFinderOutputData = pathFinder.traversePath();
console.log(solution);
