export const START_CHARACTER = '@';

export const END_CHARACTER = 'x';

export const INTERSECTION_CHARACTER = '+';

export const HORIZONTAL_MOVEMENT_CHARACTER  = '-';

export const VERTICAL_MOVEMENT_CHARACTER  = '|';

export const EMPTY_SPACE_CHARACTER = '';

export const VALID_CHARACTERS = {
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

export type Direction = 'up' | 'down' | 'left' | 'right';

export type Error = 'Missing start character' | 'Broken path';
