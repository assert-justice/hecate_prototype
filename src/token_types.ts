
export type TokenType = 'BACKTICK' | 'TILDE' | 'BANG' | 'PERCENT' | 'CARROT' | 'AMPERSAND' | 'ASTERISK' | 'LEFT-PAREN' | 'RIGHT-PAREN' | 'NEGATIVE' | 'UNDERSCORE' | 'EQUALS' | 'PLUS' | 'LEFT-BRACKET' | 'RIGHT-BRACKET' | 'LEFT-BRACE' | 'RIGHT-BRACE' | 'BACKSLASH' | 'PIPE' | 'SEMICOLON' | 'COLON' | 'A' | 'QUOTE' | 'COMMA' | 'PERIOD' | 'LESS' | 'GREATER' | 'SLASH' | 'QUESTION' | 'EQUALS_EQUALS' | 'LESS_EQUALS' | 'GREATER_EQUALS' | 'BANG_EQUALS' | 'COLON_COLON' | 'ARROW' | 'ELVIS' | 'WALRUS' | 'AMPERSAND_AMPERSAND' | 'PIPE_PIPE' | 'NUMBER' | 'IDENTIFIER' | 'STRING' | 'DOCSTRING' | 'BOOLEAN' | 'NONE' | 'IF' | 'ELIF' | 'ELSE' | 'RETURN';
export const ops = new Map([['`', 'BACKTICK'],['~', 'TILDE'],['!', 'BANG'],['%', 'PERCENT'],['^', 'CARROT'],['&', 'AMPERSAND'],['*', 'ASTERISK'],['(', 'LEFT-PAREN'],[')', 'RIGHT-PAREN'],['-', 'NEGATIVE'],['_', 'UNDERSCORE'],['=', 'EQUALS'],['+', 'PLUS'],['[', 'LEFT-BRACKET'],[']', 'RIGHT-BRACKET'],['{', 'LEFT-BRACE'],['}', 'RIGHT-BRACE'],['\\', 'BACKSLASH'],['|', 'PIPE'],[';', 'SEMICOLON'],[':', 'COLON'],['\'', 'A'],['"', 'QUOTE'],[',', 'COMMA'],['.', 'PERIOD'],['<', 'LESS'],['>', 'GREATER'],['/', 'SLASH'],['?', 'QUESTION'],['==', 'EQUALS_EQUALS'],['<=', 'LESS_EQUALS'],['>=', 'GREATER_EQUALS'],['!=', 'BANG_EQUALS'],['::', 'COLON_COLON'],['=>', 'ARROW'],[':?', 'ELVIS'],[':=', 'WALRUS'],['&&', 'AMPERSAND_AMPERSAND'],['||', 'PIPE_PIPE']]);
export const keywords = new Map([['none', 'NONE'],['if', 'IF'],['elif', 'ELIF'],['else', 'ELSE'],['return', 'RETURN']]);
