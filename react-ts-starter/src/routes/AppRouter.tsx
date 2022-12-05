import { Routes, Route, useOutletContext  } from 'react-router-dom';
import { Home } from '../pages/Home';
import Pokedex from '../pages/Pokedex';
import Review from '../pages/Review';
import SplashPage from '../pages/SplashPage';
import UserInfo from '../pages/UserInfo';
import {FC} from 'react';



const AppRouter = () => {
  return (
        <Routes>
            <Route path="/" element={<SplashPage/>} />
            <Route path="/home" element={<Home/>}>
                <Route path="/home/*" element={<HomeRoutes/>} />
            </Route>
           
        </Routes>
  )
}

const HomeRoutes:FC = () =>{
    return (
        <>
            <Routes>
                <Route path="userinfo" element={<UserInfo/>} />
                <Route path="pokedex" element={<Pokedex/>} />
                <Route path="review" element={<Review/>} />
            </Routes>
        </>

    )
}

export default AppRouter