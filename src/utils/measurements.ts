export const cmToM = (cm: number) => cm / 100;

export const cmToFeetAndInches = (cm: number) => {
  const fullInches = cm / 2.54;
  return {
    feet: Math.floor(fullInches / 12),
    inches: fullInches % 12,
  };
};

export const kgToPounds = (kg: number) => kg * 2.20462;
