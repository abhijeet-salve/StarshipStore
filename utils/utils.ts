export const transformApiResponse = (ships: Starship[]) =>
  ships.filter((ship) => ship.cost_in_credits !== "unknown");
