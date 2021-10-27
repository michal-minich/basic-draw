
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
resizeCanvasToDisplaySize(ctx.canvas);


type State = "none" | "begin";


let state: State = "none";


export function move(x: number, y: number): void {
    if (state === "none")
        ctx.beginPath();
    ctx.moveTo(x, y);
}


export function ln(x: number, y: number): void {
    ctx.lineTo(x, y);
    if (state === "none")
        ctx.stroke();
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

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }

    return false;
}