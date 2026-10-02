import fs from 'node:fs';
import { PNG } from 'pngjs';

const path = new URL('../public/hero-robot.png', import.meta.url);
const buffer = fs.readFileSync(path);
const png = PNG.sync.read(buffer);
const { width, height, data } = png;

function idx(x, y) {
  return y * width + x;
}

function rgb(x, y) {
  const o = idx(x, y) * 4;
  return [data[o], data[o + 1], data[o + 2]];
}

function alpha(x, y) {
  return data[idx(x, y) * 4 + 3];
}

function setTransparent(x, y) {
  data[idx(x, y) * 4 + 3] = 0;
}

const sampleA = rgb(0, 0);
const sampleB = rgb(1, 0);

function nearChecker(r, g, b) {
  const near = (ref, tolerance) =>
    Math.abs(r - ref[0]) <= tolerance &&
    Math.abs(g - ref[1]) <= tolerance &&
    Math.abs(b - ref[2]) <= tolerance;

  return near(sampleA, 6) || near(sampleB, 6);
}

const queue = [];
const visited = new Uint8Array(width * height);

function enqueue(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = idx(x, y);
  if (visited[i]) return;
  const [r, g, b] = rgb(x, y);
  if (!nearChecker(r, g, b)) return;
  visited[i] = 1;
  queue.push([x, y]);
}

for (let x = 0; x < width; x += 1) {
  enqueue(x, 0);
  enqueue(x, height - 1);
}
for (let y = 0; y < height; y += 1) {
  enqueue(0, y);
  enqueue(width - 1, y);
}

let removed = 0;
while (queue.length) {
  const [x, y] = queue.pop();
  setTransparent(x, y);
  removed += 1;
  enqueue(x + 1, y);
  enqueue(x - 1, y);
  enqueue(x, y + 1);
  enqueue(x, y - 1);
}

fs.writeFileSync(path, PNG.sync.write(png));
console.log(`Checker colors: ${sampleA} / ${sampleB}`);
console.log(`Removed background pixels: ${removed}`);
