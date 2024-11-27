export function getStartMounth(mounth: number | undefined) {
  return new Date(new Date().getFullYear(), (mounth || 1) - 1, 1);
}

export function getEndMounth(mounth: number | undefined) {
  return new Date(new Date().getFullYear(), mounth || 12, 0, 23, 59, 59, 999);
}
