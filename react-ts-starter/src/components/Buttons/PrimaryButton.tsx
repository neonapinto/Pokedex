import React, {FC} from 'react'
import { IButtonProps } from '../../utils/Interfaces';

const PrimaryButton:FC<IButtonProps> = ({name, className, handleClick}) => {
  return (
    <button className={className} onClick={handleClick}>{name}</button>
  )
}

export default PrimaryButton