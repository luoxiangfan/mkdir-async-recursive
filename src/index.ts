import { existsSync, mkdirSync } from 'node:fs';
import { sep, resolve } from 'node:path';
import { parseFileMode } from './util.js';
import type { MakeDirectoryOptions } from 'node:fs';

type MakeDirectoryRecursiveOptions = Omit<MakeDirectoryOptions, 'recursive'>;

async function mkdirRecursive(
  path: string,
  options?: string | number | MakeDirectoryRecursiveOptions
) {
  let mode = 0o777;
  if (typeof options === 'number' || typeof options === 'string') {
    mode = parseFileMode(options, 'mode');
  } else if (options) {
    if (options.mode !== undefined) {
      mode = parseFileMode(options.mode, 'options.mode');
    }
  }
  const _sep = path.includes('/') ? '/' : sep;
  const dirs = path.split(_sep);
  let dirPath = '';
  const result: string[] = [];
  for (const dir of dirs) {
    dirPath += `${dir}${_sep}`;
    mkdir(dirPath, mode);
  }
  function mkdir(path: string, mode: MakeDirectoryOptions['mode']) {
    if (!existsSync(dirPath)) {
      try {
        mkdirSync(path, mode);
        result.push(path);
      } catch (error) {
        console.error(error);
      }
    }
  }
  return result.length ? resolve(result[0]) : undefined;
}

export { mkdirRecursive as default };
