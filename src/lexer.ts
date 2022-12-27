import { Token, match } from "./token";

export function lex(src: string, current: number = 0, tokens: Token[] = []): Token[]{
    if(current < src.length){
        const len = match(src, current, tokens);
        if(len === null) return [];
        return lex(src, current + len, tokens);
    }
    return tokens;
}