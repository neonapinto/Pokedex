import React, {FC} from 'react'
import { IAbility } from '../../utils/Interfaces'

const Chips:FC<IAbility> = ({ability, className}) => {
  return (
    <div className={className}>{ability?.name}</div>
  )
}

export default Chips