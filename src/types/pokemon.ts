export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    [key: string]: string;
  };
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
};
