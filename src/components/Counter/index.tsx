import React from "react"

import { CounterContainer } from "./styles"

import digit0 from "~/assets/digit0.png"
import digit1 from "~/assets/digit1.png"
import digit2 from "~/assets/digit2.png"
import digit3 from "~/assets/digit3.png"
import digit4 from "~/assets/digit4.png"
import digit5 from "~/assets/digit5.png"
import digit6 from "~/assets/digit6.png"
import digit7 from "~/assets/digit7.png"
import digit8 from "~/assets/digit8.png"
import digit9 from "~/assets/digit9.png"
import digitMinus from "~/assets/digit-.png"

export interface Props {
    number: number;
}

const DIGITS = [
    digit0,
    digit1,
    digit2,
    digit3,
    digit4,
    digit5,
    digit6,
    digit7,
    digit8,
    digit9,
]

const getDigits = (number: number): string[] => {
    if (number > 999) {
        return [digit9, digit9, digit9]
    }
    if (number < -99) {
        return [digitMinus, digit9, digit9]
    }
    if (number < 0) {
        number *= -1
        return [digitMinus, ...number.toString().padStart(2, "0").split("").map(n => DIGITS[Number(n)])]
    }
    return number.toString().padStart(3, "0").split("").map(n => DIGITS[Number(n)])
}

const Counter: React.FC<Props> = ({
    number,
}) => {
    const digits = getDigits(number)

    return (
        <CounterContainer>
            <img src={digits[0]} />
            <img src={digits[1]} />
            <img src={digits[2]} />
        </CounterContainer>
    )
}

export default Counter
