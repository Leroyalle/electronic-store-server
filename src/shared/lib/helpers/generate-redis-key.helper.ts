export function generateRedisKey(...args: (string | number)[]) {
  return args.join(':');
}
