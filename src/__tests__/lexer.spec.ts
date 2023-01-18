import { describe, test, expect } from "@jest/globals";
import fc from "fast-check";
import { Lexer } from "../lexer";

describe('Lexer does stuff', ()=>{
    test('it parses numbers', ()=>fc.assert(
        fc.property(
            fc.array(fc.nat()),
            arr => {
                const src = arr.join(' ');
                const lex = new Lexer();
                const tokens = lex.parse(src);
                return tokens.every(token => ['NUMBER_LIT', 'NEGATIVE'].includes(token.type));
            }
        )
    ));
    test('it parses identifiers', () => fc.assert(
        fc.property(
            fc.lorem(),
            text => {
                const lex = new Lexer();
                return lex.parse(text).every(token => token.type = 'IDENTIFIER');
            }
        )
    ));
});