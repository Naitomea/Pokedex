/* Works in worklet */

export const rgbaStrToRgb = (color: string) => {
  'worklet';

  const rgba = color.slice(5, -1).split(',');

  return {
    r: parseInt(rgba[0], 10),
    g: parseInt(rgba[1], 10),
    b: parseInt(rgba[2], 10),
  };
};

export const hexToRgb = (color: string) => {
  'worklet';

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return {
    r,
    g,
    b,
  };
};

export const rgbToHex = (r: number, g: number, b: number) => {
  'worklet';

  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error('Invalid RGB value');
  }

  let rHex = r.toString(16).padStart(2, '0');
  let gHex = g.toString(16).padStart(2, '0');
  let bHex = b.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
};

export const darker = (color: string, amount: number) => {
  'worklet';

  const rgbColor = color.startsWith('#')
    ? hexToRgb(color)
    : rgbaStrToRgb(color);
  amount = 1 - Math.max(0, Math.min(1, amount));

  return rgbToHex(
    Math.round(rgbColor.r * amount),
    Math.round(rgbColor.g * amount),
    Math.round(rgbColor.b * amount),
  );
};
