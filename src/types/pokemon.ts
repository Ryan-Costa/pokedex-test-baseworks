export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  name: string;
  id: number;
  flavorText: string;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
    [key: string]: string | { dream_world: { front_default: string } };
  };
  stats: Array<{
    base_stat: number;
    effort: string;
    stat: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
};

export type PokemonTypeColors =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "normal"
  | "grass"
  | "ground"
  | "ice"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";
