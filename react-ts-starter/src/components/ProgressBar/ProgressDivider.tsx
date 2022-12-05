import {FC} from 'react'
import { IProgressDivider } from '../../utils/Interfaces'

const ProgressDivider:FC<IProgressDivider> = ({className}) => {
  return (
    <div className={className}></div>
  )
}

export default ProgressDivider