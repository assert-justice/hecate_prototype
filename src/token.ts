import { TokenType } from "./token_types"

export type Token = {
    type: TokenType,
    literal: string,
    value: string,
    start: number,
}