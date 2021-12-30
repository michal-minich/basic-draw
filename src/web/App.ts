
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
resizeCanvasToDisplaySize(ctx.canvas);


type State = "none" | "begin";


let state: State = "none";
let atX = 0;
let atY = 0;

export function set(x: number, y: number): void {

    atX = x;
    atY = y;
    if (state === "none")
        ctx.beginPath();
    ctx.moveTo(x, y);
}


export function ln(x: number, y: number): void {

    atX = x;
    atY = y;
    ctx.lineTo(x, y);
    if (state === "none")
        ctx.stroke();
}


export function move(x: number, y: number): void {

    set(atX + x, atY + y);
}


export function draw(x: number, y: number): void {

    ln(atX + x, atY + y);
}


export function width(value: number): void {

    ctx.lineWidth = value;
}


export function color(value: string): void {

    ctx.strokeStyle = value;
}


export function begin(): void {

    if (state === "begin") {
        err("The 'begin()' was already called, please call 'end()' to finish line.");
    }
    state = "begin";
    ctx.beginPath();
}


export function end(): void {

    if (state === "none") {
        err("There is noting to end. Please call 'begin()' to start line.");
    }
    state = "none";
    ctx.stroke();
}


function err(msg: string): never {
    alert(msg);
    throw new Error(msg);
}


function resizeCanvasToDisplaySize(c: HTMLCanvasElement): void {

    const w = c.clientWidth;
    const h = c.clientHeight;
    if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
    }
}
