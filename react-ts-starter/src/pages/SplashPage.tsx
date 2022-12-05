import {FC} from 'react'
import { Link} from 'react-router-dom';
import { getLocalStorage } from '../utils/helper';

const SplashPage:FC = () => {
  const isSaved = getLocalStorage('saved') ?? false;
  return (
    <div className='splash-bg'>
        <Link className='splash-btn' to='/home'>{isSaved ? 'Resume' : 'Let\'s Start!'}</Link>
    </div>
  )
}

export default SplashPage;