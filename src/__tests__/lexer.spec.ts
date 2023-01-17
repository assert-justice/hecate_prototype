import { describe, test, expect } from "@jest/globals";
import fc from "fast-check";
import { Lexer } from "../lexer";

describe('Lexer does stuff', ()=>{
    test('it does stuff', ()=>{
        const lex = new Lexer();
        const tokens = lex.parse('1234 5678');
        expect(tokens.every(token => token.type === 'NUMBER')).toBe(true);
    });
    test('it implements fast check', ()=>fc.assert(
        fc.property(
            fc.array(fc.integer()),
            arr => {
                const src = arr.map(Math.abs).join(' ');
                const lex = new Lexer();
                const tokens = lex.parse(src);
                return tokens.every(token => token.type === 'NUMBER');
            }
        )
    ));
});