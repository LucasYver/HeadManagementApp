export function numberWithSpaces(value: number): string {
  const _value = value.toFixed(2);
  const parts = _value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}
