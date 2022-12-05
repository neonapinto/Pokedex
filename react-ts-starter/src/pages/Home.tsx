import React, { useState, useEffect, createContext } from "react";
import {Outlet, useNavigate } from "react-router-dom";
import ProgressDivider from "../components/ProgressBar/ProgressDivider";
import ProgressNumber from "../components/ProgressBar/ProgressNumber";
import { getLocalStorage } from "../utils/helper";


export const UserContext = createContext<any>({}); //context to handle the user flow

export const Home = () => {
  const [step, setStep] = useState<number>(1);
  const [pokemonId, setPokemonId] = useState<string>(""); 
  const navigator = useNavigate();

  useEffect(() =>{
    //check the current step and load the page
      const stepNumber = getLocalStorage('step') ?? 1;
      setStep(+stepNumber);
      if(+stepNumber === 1){
        navigator('/home/userinfo');
      }
      else if(+stepNumber === 2){
        navigator('/home/pokedex');
      }
      else{
        navigator('/home/review');
      }
  }, []);

  return (
    <UserContext.Provider value={{step, setStep, pokemonId, setPokemonId}}>
      <div className="home-container">
        <div className="home-header">
          <ProgressNumber/>
          <ProgressDivider className={`home-header-divider ${step === 2 ? 'home-header-animation' : (step === 3 ? 'home-header-animation': 'home-header-divider-disabled')} `}/>
          <ProgressNumber/>
          <ProgressDivider className={`home-header-divider ${step === 2 ? 'home-header-divider-disabled' : (step === 3 ? 'home-header-animation': 'home-header-divider-disabled')} `}/>
          <ProgressNumber/>
        </div>
        <div className="home-body">
          <Outlet/>
        </div>
      </div>
    </UserContext.Provider>
  )
}

