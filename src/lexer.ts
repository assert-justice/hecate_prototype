import { Token, match } from "./token";

export function lex(src: string): Token[]{
    const tokens: Token[] = [];
    let current = 0;
    // current += match(src, current, tokens);
    // current += match(src, current, tokens);
    while(current < src.length){
        current += match(src, current, tokens);
    }
    return tokens;
}