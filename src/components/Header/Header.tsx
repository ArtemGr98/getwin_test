import React, {ChangeEvent, FC, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {getPokemonsAsync, getPokemonsTypesAsync, getSearchPokemonsAsync, resetError} from '../../redux/pokemonsSlice'
import styled from 'styled-components'
import homeImg from './home-page-161.svg'

const HeaderContainer = styled.header`
  position: fixed;
  background: deepskyblue;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    padding: 20px;
  }
  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const {pokemonsTypes, error} = useAppSelector(state => state.pokemons)

    useEffect(() => {
        dispatch(getPokemonsTypesAsync())
    }, [dispatch])

    const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getPokemonsAsync(e.target.value))
    }

    const handleSearch = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const search = e.target.search.value
        if (search.length) {
            dispatch(getSearchPokemonsAsync(search))
            e.target.search.value = ''
        }
    }

    const goHome = () => {
        if (error) {
            dispatch(resetError())
        }
        else {
            dispatch(getPokemonsAsync('pokemon'))
        }
    }

    return (
        <HeaderContainer>
            <button onClick={goHome}>
                <img src={homeImg} alt="homeImg"/>
            </button>

            <div>
                <label htmlFor="">select type </label>
                <select name="" id="" onChange={handleChangeType}>
                    <option value="pokemon">all</option>
                    {pokemonsTypes.map(type => <option key={type.name} value={type.url}>{type.name}</option>)}
                </select>
            </div>
            <div>
                <form onSubmit={handleSearch}>
                    <input name="search" type="search" placeholder="name or id"/>
                    <button type="submit">search</button>
                </form>
            </div>
        </HeaderContainer>
    )
}

export default Header