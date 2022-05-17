import {gql} from "graphql-tag";



export const GET_POKEMONS = gql`
        query getPokemons {
            pokemon_v2_pokemonspecies(offset: 0, limit: 100000, order_by: {id: asc}) {
        id
        name
        is_baby
      
      }
    }`;

export const GET_POKEMON_BY_ID =gql `
      query getPokemon($pokeId:Int) {
  pokemon_v2_pokemon(where: {id: {_eq: $pokeId}}) {
    id
    base_experience
    height
    order
    weight
    name
    pokemon_v2_pokemonspecy {
      evolution_chain_id
    }
  }
}
        `

export const GET_ITEMS = gql`
        query getItems {
         pokemon_v2_item(offset: 10, limit: 10, order_by: {id: asc}) {
    name
    id
  }
 }`

export const GET_ITEM_BY_ID = gql`
       query getItem ($itemId:Int){
          pokemon_v2_item(where: {id: {_eq: $itemId}}) {
            name
            id
            fling_power
            cost
          }
} `

export const GET_EVOLUTION_CHAIN= gql`
        query MyQuery ($id:Int){
          pokemon_v2_evolutionchain(where: {id: {_eq: $id}}) {
            pokemon_v2_pokemonspecies {
              name
              id
            }
          }
        }`

export const  GET_EVOLUTION_ARRAY = gql`
        query  evolutionChain ($id:Int){
          pokemon_v2_evolutionchain(where: {id: {_eq: $id}}) {
            pokemon_v2_pokemonspecies {
              id
            }
          }
        }`


