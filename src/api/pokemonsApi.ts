import {instance} from './instance'

export const pokemonsApi = {
    getPokemons: (url: string) => instance.get(url),
    getPokemonInfo: (url: string) => instance.get(url),
    getPokemonsTypes: () => instance.get('type'),
    getSearchPokemon: (search: string) => instance.get(`pokemon/${search}`)
}