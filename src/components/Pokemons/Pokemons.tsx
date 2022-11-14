import React, {FC, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {getPokemonsAsync} from '../../redux/pokemonsSlice'
import Pokemon from './Pokemon'
import styled from 'styled-components'
import Pagination from '../Pagination/Pagination'
import Loader from '../Loader/Loader'
import ErrorBlock from '../ErrorBlock/ErrorBlock'

const PokemonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 70px;
`

const Pokemons: FC = () => {
    const dispatch = useAppDispatch()
    const pokemons = useAppSelector(state => state.pokemons.pokemons.results)
    const {offset, limit, loading, error} = useAppSelector(state => state.pokemons)

    useEffect(() => {
        dispatch(getPokemonsAsync(`pokemon?limit=${limit}&offset=${offset}`))
    }, [dispatch, offset, limit])

    if (error) return <ErrorBlock error={error} />

    return <>
        {loading && <Loader />}
        <PokemonsContainer>
            {pokemons.length ?
                pokemons.map(pokemon =>
                    <Pokemon key={pokemon.url} name={pokemon.name} url={pokemon.url}/>) :
                <h2>no results</h2>}
        </PokemonsContainer>
        <Pagination />
    </>
}

export default Pokemons