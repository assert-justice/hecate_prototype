import { Token, TokenType } from "./token";
import { badChar, badToken } from "./error_display";

export class Lexer{
    tokens: Token[] = [];
    current: number = 0;
    start: number = 0;
    errorText: string | null = null;
    src: string = '';
    ops: Map<string,string>;
    constructor(){
        const names = new Map([
            ['~', 'TILDE'],
            ['!', 'BANG'],
            ['%', 'PERCENT'],
            ['^', 'CARROT'],
            ['&', 'AMPERSAND'],
            ['*', 'ASTERISK'],
            ['(', 'LEFT-PAREN'],
            [')', 'RIGHT-PAREN'],
            ['-', 'NEGATIVE'],
            ['_', 'UNDERSCORE'],
            ['=', 'EQUALS'],
            ['+', 'PLUS'],
            ['[', 'LEFT-BRACKET'],
            [']', 'RIGHT-BRACKET'],
            ['{', 'LEFT-BRACE'],
            ['}', 'RIGHT-BRACE'],
            ['\\', 'BACKSLASH'],
            ['|', 'PIPE'],
            [';', 'SEMICOLON'],
            [':', 'COLON'],
            ['\'', 'A'],
            ['"', 'QUOTE'],
            [',', 'COMMA'],
            ['.', 'PERIOD'],
            ['<', 'LESS'],
            ['>', 'GREATER'],
            ['/', 'SLASH'],
            ['?', 'QUESTION'],
        ]);
        const ops = new Map(names.entries());
        '==,<=,>=,!=,::,=>,:?,:='.split(',').forEach(op => {
            const name = op.split('').map(c => {
                const n = names.get(c);
                if(!n) throw 'something really wrong happened';
                return n;
            }).join('_');
            ops.set(op, name);
        });
        ops.set('=>', 'ARROW');
        ops.set(':?', 'ELVIS');
        ops.set(':=', 'WALRUS');
        
        this.ops = ops;
    }
    // Utilities
    reset(){
        this.tokens = [];
        this.current = 0;
        this.start = 0;
        this.errorText = null;
    }
    peek(): string{
        return this.src[this.current];
    }
    advance(): string{
        this.current++;
        return this.src[this.current - 1];
    }
    atEof(): boolean{
        return this.current === this.src.length;
    }
    isNumeric(c: string): boolean{
        return '1234567890'.includes(c);
    }
    isAlpha(c: string): boolean{
        return 'abcdefghijklmnopqrstuvwxyz'.includes(c.toLowerCase());
    }
    isIdentChar(c: string): boolean{
        return this.isNumeric(c) || this.isAlpha(c) || c === '_';
    }
    isWhitespace(c: string){
        return ' \t\r\n'.includes(c);
    }
    match(regex: RegExp): string | null{
        const arr = regex.exec(this.src.slice(this.current));
        if(arr === null) return null;
        const res = arr[0];
        if(arr.index !== 0) return null;
        this.current += res.length;
        return res;
    }
    addToken(type: TokenType, literal: string, value: string | null = null): void{
        if(value === null) value = literal;
        this.tokens.push({
            type,
            literal,
            value,
            start: this.start,
        });
    }
    getLiteral(): string{
        return this.src.slice(this.start, this.current);
    }
    reportError(errorText: string, idx:number = -1){
        if(idx === -1) idx = this.current;
        console.log(badChar(errorText, this.src, idx));
        throw 'Parse failed';
    }
    // Patterns
    whitespace(): boolean{
        return this.match(/[\s\n]+/) !== null;
    }
    identifier(): boolean{
        if(!this.isAlpha(this.peek())) return false;
        this.advance();
        this.match(/\w+/);
        this.addToken('IDENTIFIER', this.getLiteral());
        return true;
    }
    number(): boolean{
        const prefix = this.match(/0x|0b|0o/) ?? '';
        if(!this.match(/\d(\d|_)+/)) {
            if(prefix === '') return false;
            this.reportError('Unexpected end of number literal');
        }
        if(this.match(/[.]/)){
            const res = this.match(/(\d|_)+/);
            if(!res) this.reportError('Unexpected end of number literal');
        }
        if(this.peek() === '.') this.reportError('Unexpected decimal point after number literal');
        this.addToken('NUMBER', this.getLiteral());
        return true;
    }
    operator(): boolean{
        // let match: string | undefined = undefined;
        // let pat = this.src.slice(this.start, this.start+2);
        // if(this.ops.has(pat)) match = this.ops.get(pat);
        // else if()
        // if(!match)
        let longest = '';
        let name = ''
        for (const [op, opName] of this.ops) {
            if(op.length > longest.length && this.src.indexOf(op, this.start) === this.start){
                longest = op;
                name = opName;
            }
        }
        if(longest === '') return false;
        this.current += longest.length;
        const lit = this.getLiteral();
        this.addToken(name, lit);
        return true;
    }
    parse(src: string): Token[]{
        this.reset();
        this.src = src;
        const patterns = [
            ()=>this.whitespace(), 
            ()=>this.operator(),
            ()=>this.identifier(),
            ()=>this.number(),
        ];
        while(!this.errorText && !this.atEof()){
            this.start = this.current;
            let broken = false;
            for (const pattern of patterns) {
                if(pattern()) {broken = true; break;}
            }
            if(!broken) this.reportError('Unexpected character');
        }
        return this.tokens;
    }
}