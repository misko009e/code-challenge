import { ICharacterMetadata, IPathFinderInputData, IPathFinderOutputData, PathFinder } from '../../../src/path-finder';

export class PathFinderTests extends PathFinder {
    constructor(protected inputData: IPathFinderInputData) {
        super(inputData);
    }

    public testVerifyEdgeCasesAndFindStartingPosition(): ICharacterMetadata {
        return this.verifyEdgeCasesAndFindStartingPosition();
    }

    public testTraversePath(): IPathFinderOutputData {
        return this.traversePath();
    }
}
