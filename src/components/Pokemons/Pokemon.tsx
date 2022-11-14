import {FC, useState} from 'react'
import {getPokemonInfoAsync,} from '../../redux/pokemonsSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {PokemonI} from '../../interface/interface'
import styled from 'styled-components'

const PokemonCard = styled.div`
  width: 18%;
  height: fit-content;
  padding: 2%;
  margin: 1.4%;
  background: whitesmoke;
  border-radius: 8px;
  border: 1px solid honeydew;
  cursor: pointer;
`

const Pokemon: FC<PokemonI> = ({name, url}) => {
    const [isOpenInfo, setOpenInfo] = useState(false)
    const dispatch = useAppDispatch()

    const pokemonsInfo = useAppSelector(state => state.pokemons.pokemonsInfo)
    const pokemonInfo = pokemonsInfo.find(info => info.name === name)

    const getInfo = () => {
        if (!pokemonInfo) {
            dispatch(getPokemonInfoAsync(url))
        }
        setOpenInfo(!isOpenInfo)
    }
    return (
        <PokemonCard onClick={getInfo}>
            <div>{name}</div>
            {isOpenInfo && <div>
                <img src={pokemonInfo?.sprites.front_default} alt="pokemon img"/>
                {pokemonInfo?.types.map(type => <div
                    key={type.type.name} style={{color: 'red'}}>{type.type.name}
                </div>)}
                <div>
                    {pokemonInfo?.stats.map(pokemonStat => <div key={pokemonStat.stat.url}>
                        <span>{pokemonStat.stat.name} </span>
                        -
                        <span> {pokemonStat.base_stat}</span>
                    </div>)}
                </div>
            </div>}
        </PokemonCard>
    )
}

export default Pokemon