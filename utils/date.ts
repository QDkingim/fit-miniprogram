export function todayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function weekdayText(dateKey = todayKey()): string {
  const date = new Date(`${dateKey}T00:00:00`);
  const names = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return names[date.getDay()];
}

export function lastNDates(count: number): string[] {
  const result: string[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    result.push(`${year}-${month}-${day}`);
  }
  return result;
}
