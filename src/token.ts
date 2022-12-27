export type TokenType = 'NUMBER' | 'IDENTIFIER' | 'NONE';

// export const TokenType = {
//     NUMBER: 'NUMBER'
// }


export type Token = {
    type: TokenType,
    literal: string,
    start: number,
}

function isNumeric(c:string){
    const min = '0'.charCodeAt(0);
    const max = '9'.charCodeAt(0);
    const code = c.charCodeAt(0);
    return min <= code && max >= code;
}

// function number(src: string, start: number): string | null{
//     if(!isNumeric(src[start])) return null;
//     let current = start;
//     // while(current < )
// }

// function matchGen(){
//     // const rxs: [RegExp, TokenType][] = [
//     //     [new RegExp('[0-9]([0-9]|_)*\.?(?=[0-9])([0-9]|_)*', 'y'), 'NUMBER'],
//     //     [new RegExp('( |\t|\r|\n)*', 'y'), 'NONE'],
//     // ];
//     const match = (src: string, current: number, tokens: Token[]):number => {
//         let longest:[string, TokenType] = ['', 'NONE'];
//         for (const [rx, tokenType] of rxs) {
//             rx.lastIndex = current;
//             const arr = rx.exec(src);
//             if(arr === null) continue;
//             // console.log(arr);
//             if(arr[0].length > longest[0].length) longest = [arr[0], tokenType];
//         }
//         // if(longest[0] === '') throw `Unrecognized token at ${src.slice(current, current+10)}`
//         if(longest[1] !== 'NONE'){
//             tokens.push({type: longest[1], literal: longest[0], start: current});
//         }
//         console.log(longest[0].length);
        
//         return longest[0].length;
//     }
//     return match;
// }

// export const match = matchGen();