import { Error, ICharacterMetadata, IPathFinderInputData, IPathFinderOutputData } from '../../../src/path-finder';

export interface IPathFinderUnitTestCase  {
    shouldBeCorrect: boolean;
    name: string;
    inputData: IPathFinderInputData;
    isTestingEdgeCases?: boolean;
    outputCharacterMetadata?: ICharacterMetadata;
    outputData?: IPathFinderOutputData;
    error?: Error;
}
