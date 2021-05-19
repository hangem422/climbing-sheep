export function bezierCurve(a, b, c, t) {
  return (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t ** 2 * c;
}

export function derivativeOfCurve(a, b, c, t) {
  return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
}
