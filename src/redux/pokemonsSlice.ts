import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {pokemonsApi} from '../api/pokemonsApi'
import {PokemonI, PokemonInfoI, PokemonsI} from '../interface/interface'

interface InitialStateI {
    loading: boolean
    error: string | undefined
    pokemons: PokemonsI
    pokemonsInfo: PokemonInfoI[]
    pokemonsTypes : PokemonI[]
    offset: number
    limit: number
    currentPage: number
}

const initialState: InitialStateI = {
    loading: false,
    error: undefined,
    pokemons: {
        count: null,
        results: []
    },
    pokemonsInfo: [],
    pokemonsTypes: [],
    offset: 0,
    limit: 20,
    currentPage: 1
}

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        changeCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
            state.offset = state.currentPage * state.limit
        },
        resetError: (state) => {
            state.error = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPokemonsAsync.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(getPokemonsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.pokemons.results = action.payload.results
                state.pokemons.count = action.payload.count
            })
            .addCase(getPokemonsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(getPokemonInfoAsync.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.pokemonsInfo.push(action.payload)
            })


            .addCase(getPokemonsTypesAsync.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.pokemonsTypes = action.payload
            })


            .addCase(getSearchPokemonsAsync.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(getSearchPokemonsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.pokemons.results = [{
                    name: action.payload.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${action.payload.name}`
                }]
                state.pokemonsInfo.push(action.payload)
                state.pokemons.count = null
            })
            .addCase(getSearchPokemonsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    },
})

export const {changeCurrentPage, resetError} = pokemonsSlice.actions

export default pokemonsSlice.reducer

export const getPokemonsAsync = createAsyncThunk<PokemonsI, string, {rejectValue: string}>(
    'pokemons/getPokemonsAsync',
    async (url, {rejectWithValue}) => {
        try {
            const response = await pokemonsApi.getPokemons(url)
            if (response.data.pokemon) {
                const results = response.data.pokemon.map((item: {pokemon: PokemonI}) => item.pokemon)
                return {results, count: null}
            } else return response.data
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const getPokemonInfoAsync = createAsyncThunk<PokemonInfoI, string, {rejectValue: string}>(
    'pokemons/getPokemonInfoAsync',
    async (url, {rejectWithValue}) => {
        try {
            const response = await pokemonsApi.getPokemonInfo(url)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const getPokemonsTypesAsync = createAsyncThunk<PokemonI[], void, {rejectValue: string}>(
    'pokemons/getPokemonsTypesAsync',
    async (_, {rejectWithValue}) => {
        try {
            const response = await pokemonsApi.getPokemonsTypes()
            return response.data.results
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const getSearchPokemonsAsync = createAsyncThunk<PokemonInfoI, string, {rejectValue: string}>(
    'pokemons/getSearchPokemonsAsync',
    async (search, {rejectWithValue}) => {
        try {
            const response = await pokemonsApi.getSearchPokemon(search)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)
