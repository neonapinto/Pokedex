import React, {FC} from 'react'
import {IStatProps } from '../../utils/Interfaces'

interface IProps{
    stats: IStatProps
}

const Stats:FC<IProps> = ({stats}) => {
  let stat = stats.base_stat;
  stat = stat > 100 ? 100 : stat;
  return (
    <div className='progress-container'>
        <p>{stats.stat.name}</p>
        <div className='progress-bar'>
            <div className='progress-bar-percentage' style={{width: stat + '%'}}></div>
        </div>
    </div>
)
}

export default Stats