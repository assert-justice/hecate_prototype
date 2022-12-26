export enum TokenType {
    INT
}

export type Token = {
    type: TokenType,
    literal: string,
    start: number,
}

// type matchFn = (src: string) => [string, Token | null] | null;

// export function match(pattern: string): matchFn{
//     const rx = RegExp(pattern);
//     return (src: string): [string, Token | null] | null => {
//         rx.exec()
//     }
// }