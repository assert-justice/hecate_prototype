import { Token } from "./token";
import { TokenType } from "./token_types";
import { badChar } from "./error_display";
import { ops, keywords } from "./token_types";
import { string } from "fast-check";

export class Lexer{
    tokens: Token[] = [];
    current: number = 0;
    start: number = 0;
    errorText: string | null = null;
    src: string = '';
    // Utilities
    reset(){
        this.tokens = [];
        this.current = 0;
        this.start = 0;
        this.errorText = null;
    }
    peek(): string{
        if(this.atEof()) return '\0';
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
    match(pattern: RegExp | string): string | null{
        if(typeof pattern === 'string'){
            const res = this.src.indexOf(pattern, this.current) === this.current;
            if(res) {
                this.current += pattern.length;
                return pattern;
            }
            return null;
        }
        const arr = pattern.exec(this.src.slice(this.current));
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
    comment(): boolean{
        if(this.src.indexOf('//', this.start) !== this.start) return false;
        const newline = this.src.indexOf('\n');
        if(newline === -1) this.current = this.src.length;
        else this.current = newline + 1;
        return true;
    }
    docstring(): boolean{
        if(!this.match('/*')) return false;
        let depth = 1;
        while(!this.atEof()){
            if(this.match('/*')) depth++;
            else if(this.match('*/')) depth--;
            if(depth === 0) break;
            this.advance();
        }
        if(depth !== 0) this.reportError('Unexpected eof, unterminated docstring')
        const lit = this.getLiteral();
        this.addToken('DOCSTRING_LIT', lit, lit.slice(2, lit.length - 2));
        return true;
    }
    whitespace(): boolean{
        return this.match(/[\s\n]+/) !== null;
    }
    character():boolean{
        const res = this.match(/'.'/);
        if(!res) return false;
        this.addToken('CHARACTER_LIT', this.getLiteral(), this.src[this.start + 1]);
        return true;
    }
    string():boolean{
        if(!this.match('"')) return false;
        let broken = false;
        while(!this.atEof()){
            if(!this.match('"')) this.advance();
            else{
                broken = true;
                break;
            }
        }
        if(!broken) this.reportError('Unexpected eof, unterminated string');
        const lit = this.getLiteral();
        this.addToken('STRING_LIT', lit, lit.slice(1, lit.length - 1));
        return true;
    }
    identifier(): boolean{
        if(!this.isAlpha(this.peek())) return false;
        this.advance();
        this.match(/\w+/);
        const lit = this.getLiteral();
        if(lit === 'true' || lit === 'false'){
            this.addToken('BOOLEAN_LIT', lit);
        }
        else if(keywords.has(lit)){
            this.addToken(lit.toUpperCase() as TokenType, lit);
        }
        else{
            this.addToken('IDENTIFIER', this.getLiteral());
        }
        return true;
    }
    number(): boolean{
        const prefix = this.match(/0x|0b|0o/) ?? '';
        if(!this.match(/\d(\d|_)*/)) {
            if(prefix === '') return false;
            this.reportError('Unexpected end of number literal');
        }
        if(this.match(/[.]/)){
            const res = this.match(/(\d|_)+/);
            if(!res) this.reportError('Unexpected end of number literal');
        }
        if(this.peek() === '.') this.reportError('Unexpected decimal point after number literal');
        this.addToken('NUMBER_LIT', this.getLiteral());
        return true;
    }
    operator(): boolean{
        let longest = '';
        let name = ''
        for (const [op, opName] of ops) {
            if(op.length > longest.length && this.src.indexOf(op, this.start) === this.start){
                longest = op;
                name = opName;
            }
        }
        if(longest === '') return false;
        this.current += longest.length;
        const lit = this.getLiteral();
        this.addToken(name as TokenType, lit);
        return true;
    }
    parse(src: string): Token[]{
        this.reset();
        this.src = src;
        const patterns = [
            ()=>this.whitespace(),
            ()=>this.docstring(),
            ()=>this.comment(),
            ()=>this.character(), 
            ()=>this.string(),
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