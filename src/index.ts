import fs from 'fs';
import {lex} from './lexer';

function main(args: string[]){
    const src = fs.readFileSync(args[2], {encoding: 'utf-8'});
    const tokens = lex(src);
    console.log(tokens);
    
}

main(process.argv);