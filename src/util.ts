const validateUint32 = (value: unknown, name: string) => {
  if (typeof value !== 'number') {
    throw new Error(`${name}: ${value} is not number`);
  }
  if (!Number.isInteger(value)) {
    throw new Error(`${name}: ${value} is not an integer`);
  }
  const min = 0;
  // 2 ** 32 === 4294967296
  const max = 4_294_967_295;
  if (value < min || value > max) {
    throw new Error(`${name}: ${value} must >= ${min} && <= ${max}`);
  }
};

export function parseFileMode(value: unknown, name: string, def?: number) {
  value ??= def;
  if (typeof value === 'string') {
    if (!/^[0-7]+$/.test(value)) {
      throw new Error(`${name}: ${value} is invalid`);
    }
    value = Number.parseInt(value, 8);
  }

  validateUint32(value, name);
  return value as number;
}
