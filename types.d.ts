interface IGetStarShipResponse {
  count: number; // total count across pagination
  next: string | null;
  previous: string | null;
  results: Starship[];
}

interface CartItem extends Starship {
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface Starship {
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
}

interface ISearchResultsProps {
  loading: boolean;
  isError: boolean;
  searchText: string;
  filteredList: Starship[];
}
