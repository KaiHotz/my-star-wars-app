export interface ICommonProps {
  title?: string;
  name?: string;
  id: string;
  films?: string[];
  url: string;
  created: string;
  edited: string;
}

export interface IFilm extends ICommonProps {
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
}

export interface IPerson extends ICommonProps {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}

export interface IPlanet extends ICommonProps {
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
}

export interface ISpecie extends ICommonProps {
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: string[];
}

export interface IStarships extends ICommonProps {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
}

export interface IVehicle extends ICommonProps {
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
}

export interface IResources {
  films: string;
  people: string;
  planets: string;
  species: string;
  starships: string;
  vehicles: string;
}

export type TCategories = keyof IResources;
export type TCategory = IFilm & IPerson & IPlanet & ISpecie & IStarships & IVehicle;

export type TResults = Array<TCategory>;

export interface ICategoryListParams {
  category?: string;
  pageParam: number;
  signal: AbortSignal;
}

export interface ICategoryList {
  count: number;
  next: string;
  previous: string;
  results: TResults;
}

export type TSearch = Record<TCategories, TResults>;
