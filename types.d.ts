interface IGetStarShipResponse {
  count: number; // total count across pagination
  next: string | null;
  previous: string | null;
  results: Starship[];
}

interface starShipsState {
  starShips: Starship[];
  nextUrl: string | null;
  loading: boolean;
  error: boolean;
}

interface CartItem {
  id: number;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface Starship {
  id: number;
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
