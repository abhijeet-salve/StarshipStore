export const transformApiResponse = (ships: Starship[]) => {
  return ships
    .filter((ship) => ship.cost_in_credits !== 'unknown') // Filter out ships with unknown cost, ideally BE should not be sending it.
    .map((ship) => ({
      ...ship,
      id: Number(ship.url.split('/').filter(Boolean).pop()), // adding unique id to each item from URL, ideally BE should have it.
    }));
};
