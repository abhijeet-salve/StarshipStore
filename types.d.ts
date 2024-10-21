interface IGetStarShipResponse {
  count: number; // Count is wrong from API for some reason :/
  next: string | null;
  previous: string | null;
  results: Starship[];
}

interface CartItem extends Starship {
  name: string;
  price: number;
  quantity: number;
}

type CartState = {
  items: CartItem[];
};

type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};
