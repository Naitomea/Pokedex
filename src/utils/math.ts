import {Animated} from 'react-native';

export const remap = (
  value: number,
  fromA: number,
  toA: number,
  fromB: number,
  toB: number,
) => fromB + ((toB - fromB) * (value - fromA)) / (toA - fromA);

export const lerp = (from: number, to: number, t: number) =>
  from + t * (to - from);

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

//#region Animated Helpers

export const abs = (a: Animated.Animated) => {
  const b = Animated.multiply(a, -1);
  const clampedA = Animated.diffClamp(a, 0, Number.MAX_SAFE_INTEGER);
  const clampedB = Animated.diffClamp(b, 0, Number.MAX_SAFE_INTEGER);

  return Animated.add(clampedA, clampedB);
};

export const max = (a: Animated.Animated, b: Animated.Animated) => {
  return Animated.multiply(
    0.5,
    Animated.add(Animated.add(a, b), abs(Animated.subtract(a, b))),
  );
};

export const min = (a: Animated.Animated, b: Animated.Animated) => {
  return Animated.multiply(
    0.5,
    Animated.subtract(Animated.add(a, b), abs(Animated.subtract(a, b))),
  );
};

//#endregion
