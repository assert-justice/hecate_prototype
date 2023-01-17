import { describe, test, expect } from "@jest/globals";
import { Lexer } from "../lexer";

describe('Lexer does stuff', ()=>{
    test(('it does stuff'), ()=>{
        const lex = new Lexer();
        const tokens = lex.parse('1234 5678');
        expect(tokens.every(token => token.type === 'NUMBER')).toBe(true);
    });
});