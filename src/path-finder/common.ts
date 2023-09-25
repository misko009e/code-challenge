import { ILettersMap } from './path-finder.model';

export const START_CHARACTER: string = '@';

export const END_CHARACTER: string = 'x';

export const INTERSECTION_CHARACTER: string = '+';

export const HORIZONTAL_MOVEMENT_CHARACTER: string  = '-';

export const VERTICAL_MOVEMENT_CHARACTER: string  = '|';

export const EMPTY_SPACE_CHARACTER: string = '';

export const LETTER_CHARACTERS: ILettersMap = {
    'A': true,
    'B': true,
    'C': true,
    'D': true,
    'E': true,
    'F': true,
    'G': true,
    'H': true,
    'I': true,
    'J': true,
    'K': true,
    'L': true,
    'M': true,
    'N': true,
    'O': true,
    'P': true,
    'Q': true,
    'R': true,
    'S': true,
    'T': true,
    'U': true,
    'V': true,
    'W': true,
    'X': true,
    'Y': true,
    'Z': true,
}

export const VALID_CHARACTERS: ILettersMap = {
    ...LETTER_CHARACTERS,
    [START_CHARACTER]: true,
    [END_CHARACTER]: true,
    [INTERSECTION_CHARACTER]: true,
    [HORIZONTAL_MOVEMENT_CHARACTER]: true,
    [VERTICAL_MOVEMENT_CHARACTER]: true
};

export type Direction = 'up' | 'down' | 'left' | 'right' | null;

export type Error =
    'Missing start character'
    | 'Multiple starts'
    | 'Missing end character'
    | 'Multiple starting paths'
    | 'Invalid character found'
    | 'Broken path'
    | 'Fake turn'
    | 'Fork in path'
    | null;
