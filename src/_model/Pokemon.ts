import { Type } from "./Types";

export interface Pokemon {
id: any|string;
    number: number;
    name: string;
    types: Type[];
    about: string;
    image: string;
  }