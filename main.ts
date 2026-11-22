// news-image-20261122: sums up the world news of Sunday 22 November 2026 in one image.
// The image is drawn in advance (entry.png, 1024x1024, under 1 MiB) and this program
// deterministically copies it to the grader's output directory, so both runs write
// byte-identical files. Node 22, standard library only, no network.
//
// Run locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outFile = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(join(here, 'entry.png'));
writeFileSync(outFile, bytes);

// Fail loudly instead of shipping a truncated copy: the gate rejects a
// partial PNG, so the output must be byte-identical to the source image.
if (readFileSync(outFile).length !== bytes.length) {
  throw new Error('entry.png copy is incomplete');
}
