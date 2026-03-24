export const M = {
  soft: { damping: 200 },
  bouncy: { damping: 10 },
  pop: { damping: 12, stiffness: 150 },
  snap: { damping: 20, stiffness: 200 },
} as const;

export const float = (frame: number, i: number, speed = 0.03, amt = 5) =>
  Math.sin((frame + i * 30) * speed) * amt;

export const hexPath = (cx: number, cy: number, r: number) => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  });
  return `M${pts.join("L")}Z`;
};
