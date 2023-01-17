import fs from 'fs';

const names = new Map([
    ['`', 'BACKTICK'],
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
    ['=', 'EQUAL'],
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
'==,<=,>=,!=,::,=>,:?,:=,&&,||'.split(',').forEach(op => {
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

let keywords = new Map(
    'none,if,elif,else,return'.split(',').map(k=>[k,k.toUpperCase()])
);

let types = [...ops.values()];
types = types.concat('NUMBER,IDENTIFIER,STRING,DOCSTRING,BOOLEAN'.split(','));
types = types.concat([...keywords.values()]);

// 'true,false'.split(',').forEach(k => keywords.set(k, k.toUpperCase()));

function entryToString([key, value]: [string, string]){
    if(['\'', '\\'].includes(key)) key = '\\' + key;
    return `['${key}', '${value}']`;
}

const txt = `
export type TokenType = ${types.map(t => `'${t}'`).join(' | ')};
export const ops = new Map([${[...ops.entries()].map(entryToString)}]);
export const keywords = new Map([${[...keywords.entries()].map(entryToString)}]);
`;

fs.writeFileSync('./src/token_types.ts', txt);
console.log('Code gen completed successfully!');
