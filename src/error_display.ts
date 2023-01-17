import { Token } from "./token";

function getLine(src: string, idx: number): [string, number, number]{
    let lineNumber = 1;
    let last = 0;
    let i = 0;
    for(; i < idx; i++){
        if(src[i] === '\n') {
            last = i+1;
            lineNumber++;
        }
    }
    let nextNewline = src.indexOf('\n', i);
    if(nextNewline === -1) nextNewline = src.length;
    return [src.slice(last, nextNewline), lineNumber, idx - last];
}

export function badChar(errorText: string, src: string, idx: number): string{
    const [line, lineNumber, offset] = getLine(src, idx);
    const underline = line.split('').map(_=>'.');
    underline[offset] = '^';
    return `Syntax error: ${errorText} on line ${lineNumber}
${line}
${underline.join('')}`;
}

export function badToken(errorText: string, src: string, token: Token): string{
    return ''
}