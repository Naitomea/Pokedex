export const metersToString = (m: number) => `${Math.round(m * 10) / 10} m`;

export const feetAndInchesToString = ({
  feet,
  inches,
}: {
  feet: number;
  inches: number;
}) => `${Math.round(feet * 10) / 10}'${Math.round(inches * 10) / 10}"`;

export const kilogramsToString = (kg: number) =>
  `${Math.round(kg * 10) / 10} kg`;

export const poundsToString = (pounds: number) =>
  `${Math.round(pounds * 10) / 10} lbs`;
