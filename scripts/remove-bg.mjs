import fs from 'node:fs';
import { removeBackground } from '@imgly/background-removal-node';

const input = new URL('../public/hero-robot.png', import.meta.url);
const output = input;

const source = fs.readFileSync(input);
const blob = new Blob([source], { type: 'image/png' });
const result = await removeBackground(blob);
const buffer = Buffer.from(await result.arrayBuffer());
fs.writeFileSync(output, buffer);
console.log('Background removed:', output.pathname);
