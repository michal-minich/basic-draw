/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unsafe-call */
//@ts-check
import { move, ln, set, begin, end, width, color, draw } from "../scripts/App.js";

begin()

width(1)
color("#ddd");

for (let i = 0; i <= 1000; i += 100) {
    set(i, 0)
    ln(i, 1000)
}

for (let i = 0; i <= 1000; i += 100) {
    set(0, i)
    ln(1000, i)
}

end()


begin()

width(1)

color("red");

move(0, 0)
draw(300, 300)

end()