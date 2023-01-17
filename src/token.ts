export type TokenType = 'NUMBER' | 'IDENTIFIER' | 'DOCSTRING' | string;

export type Token = {
    type: TokenType,
    literal: string,
    value: string,
    start: number,
}