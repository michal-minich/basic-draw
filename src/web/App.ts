
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;


export function move(x: number, y: number): void {
    ctx.beginPath();
    ctx.moveTo(x, y);
}


export function line(x: number, y: number): void {

    ctx.lineTo(x, y);
    ctx.stroke();
}
