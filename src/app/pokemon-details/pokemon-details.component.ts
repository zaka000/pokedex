import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {

  pokemon: Pokemon = {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    height: 0.7,
    weight: 6.9,
    stats: [
      { name: 'HP', value: 45 },
      { name: 'ATK', value: 49 },
      { name: 'DEF', value: 49 },
      { name: 'SpA', value: 65 },
      { name: 'SpD', value: 65 },
      { name: 'SPD', value: 45 },
    ],
    abilities: ['Overgrow', 'Chlorophyll'],
    evolution: [
      { name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
      { name: 'Ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
      { name: 'Venusaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' }
    ]
  };
type: any;
 

}

interface Stat {
  name: string;
  value: number;
}

interface Evolution {
  name: string;
  image: string;
}

interface Pokemon {
  id: number;
  name: string;
  image: string;
  description: string;
  height: number;
  weight: number;
  stats: Stat[];
  abilities: string[];
  evolution: Evolution[];
}