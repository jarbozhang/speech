const globalData = {};

export function set(key: String, val: any) {
  globalData[key as keyof typeof val] = val;
}

export function get(key: String) {
  return globalData[key as any];
}
