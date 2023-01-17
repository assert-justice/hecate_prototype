import fs from 'fs';
import {Lexer} from './lexer';

function main(args: string[]){
    if(args.length < 3) throw 'Not enough arguments.';
    const src = fs.readFileSync(args[2], {encoding: 'utf-8'});
    const lex = new Lexer();
    const tokens = lex.parse(src);
    console.log(tokens);
    
}

main(process.argv);