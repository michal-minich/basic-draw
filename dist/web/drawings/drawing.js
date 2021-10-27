//@ts-check
import { move, ln, begin, end } from "../scripts/App.js";

begin()

move(0, 0)
ln(0, 100)

move(100, 100)
ln(100, 0)
ln(50, 50)
ln(0, 0)

move(150, 100)
ln(200, 0)
ln(250, 100)

move(150, 50)
ln(250, 50)

move(300, 100)
ln(400, 0)

move(300, 0)
ln(400, 100)
end()