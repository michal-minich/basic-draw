

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

ctx.beginPath();       // Start a new path
ctx.moveTo(30, 50);    // Move the pen to (30, 50)
ctx.lineTo(150, 100);  // Draw a line to (150, 100)
ctx.stroke();          // Render the path

console.log("A");