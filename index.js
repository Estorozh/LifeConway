const world = document.querySelector(".world");
const canvas = document.getElementById("canvas");
canvas.width = world.offsetWidth;
canvas.height = world.offsetHeight;
const ctx = canvas.getContext ? canvas.getContext("2d") : null;
if (ctx) ctx.fillStyle = COLOR_ALIVE;
