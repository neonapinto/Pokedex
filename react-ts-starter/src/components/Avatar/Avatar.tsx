import React, {FC} from 'react'
import { IAvatarProps } from '../../utils/Interfaces';

const Avatar:FC<IAvatarProps> = (props) => {
  return (
    <>
      <img src={props?.front_default} className='pokemon-sprite' alt='pokemon' />
      <img src={props?.back_default} className='pokemon-sprite' alt='pokemon' />
      <img src={props?.front_shiny} className='pokemon-sprite' alt='pokemon' />
      <img src={props?.back_shiny} className='pokemon-sprite' alt='pokemon' />
    </>
  )
}

export default Avatar