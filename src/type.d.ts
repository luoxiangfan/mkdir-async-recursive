import type { MakeDirectoryOptions } from 'node:fs';

export type { MakeDirectoryOptions } from 'node:fs';

export type MakeDirectoryRecursiveOptions = Omit<
  MakeDirectoryOptions,
  'recursive'
>;
