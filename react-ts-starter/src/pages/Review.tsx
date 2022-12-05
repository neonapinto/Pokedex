import {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import { getLocalStorage, navigate, saveData, clearStorage } from '../utils/helper';
import { IPokemonInfo } from '../utils/Interfaces';
import { UserContext } from './Home';
import axios from 'axios';
import Card from '../components/Card/Card';
import useModal from '../hooks/Modal';
import Modal from '../components/Modal/Modal';
import Chips from '../components/Card/Chips';


const Review = () => {
  const {step, setStep, pokemonId} = useContext(UserContext); //stroing the step in context
  const [pokemonInfo, setPokemonInfo] = useState<IPokemonInfo>(); //state for pokemon info
  const navigator = useNavigate(); 
  const {isShowing, toggle, returnToScreen} = useModal(); //modal hook to toggle

  useEffect(() =>{
    const pokemon = pokemonId || getLocalStorage('pokemonID'); //load the pokemon from context if not from local storage
    (async () =>{
      /**
       * load all the information of the selected pokemon on component mounting
       */
      if(pokemon){
        const pokemonDetails = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.trim()}`);
        setPokemonInfo(pokemonDetails.data);
      }
    })();
  }, [])


    /**
     * function to save and quit
     * navigates to splash page
     * saves data to local storage
     */
    const handleSave = () =>{
        navigate(navigator, '/', step);
        saveData("saved", JSON.stringify(true));
    }

    /**
     * function to navigate to previous page
     */
    const handleBack = () =>{
      const updatedStep = step - 1;
      setStep(updatedStep);
      navigate(navigator, '/home/pokedex', JSON.stringify(updatedStep));
    }

    /**
     * function to show that the submission was either successful or not.
     */
    const handleFinish = () =>{
      toggle();
      clearStorage();
    }

  return (
    <div className='container'>
        <div className='review-information'>
            <Chips ability={pokemonInfo} className='review-name'/>
            {pokemonInfo?.types?.map((item, key) =>{
                return <Chips key={key} ability={item.type} className={`review-name ${item.type.name}`}/>
            })}
        </div>
        <Card {...pokemonInfo}/>
        <div className='buttons-container'>
          <PrimaryButton name="Back" className='primary-btn' handleClick={handleBack}/>
          <PrimaryButton name="Save and Quit" className='primary-btn' handleClick={handleSave}/>
          <PrimaryButton name="Finish" className='primary-btn' handleClick={handleFinish}/>
        </div>
        <Modal isShowing={isShowing} hide={returnToScreen} />
    </div>
  )
}

export default Review;