import React,{FC} from 'react'
import { IAbility, IStatProps, IPokemonInfo } from '../../utils/Interfaces'
import Avatar from '../Avatar/Avatar';
import Chips from './Chips'
import Stats from './Stats'

const Card:FC<IPokemonInfo> = ({height, weight, abilities, stats, sprites}) => {
  return (
    <div className='card'>
      <div className='card-images'>
          <Avatar {...sprites}/> 
      </div>
      <div className='card-content'>
          <div className='card-specs'>
            {height ? <span>Height : {height}</span> : null}
            {weight ? <span>Weight : {weight}</span> : null}
            <div className='chip-container'>
              {abilities && abilities.map((ability: IAbility, key:number) =>{
                  return <Chips key={key} ability={ability.ability} className='chip'/>
              })}
            </div>
          </div>
          <div className='card-stats'>
              {stats && stats.map((stat: IStatProps, key:number) =>{
                  return <Stats key={key} stats={stat}/>
              })}
          </div>
      </div>
    </div>
  )
}

export default Card