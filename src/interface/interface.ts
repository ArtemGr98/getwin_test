export interface PokemonTypesI {
    slot: number
    type: PokemonI
}

export interface PokemonStatsI {
    base_stat: number
    effort: number
    stat: PokemonI
}

export interface PokemonInfoI {
    name: string
    types: PokemonTypesI[]
    sprites: {
        front_default: string
    }
    stats: PokemonStatsI[]
}

export interface PokemonI {
    name: string
    url: string
}
export interface PokemonsI {
    count: number | null
    results: PokemonI[]
}