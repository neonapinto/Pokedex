import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { UserContext } from './Home';
import {ITypeDetails, IPokemonType, IPokemonInfo, INameUrl} from './../utils/Interfaces';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import { getLocalStorage, MenuProps, navigate, saveData } from '../utils/helper';
import Card from '../components/Card/Card';


const Pokedex = () => {
  const [pokemonTypeList, setPokemonTypeList] = useState([]);
  const [typeDetails, setTypeDetails] = useState<ITypeDetails[]>([]);
  const [pokemonList, setPokemonList] = useState<IPokemonType[]>([]);
  const [pokemonType, setPokemonType] = useState<string[]>([]);
  const [pokemon, setPokemon] = React.useState<string | null>(null);
  const [pokemonInput, setPokemonInput] = React.useState('');
  const [pokemonInfo, setPokemonInfo] = useState<IPokemonInfo>({});

  const {step, setStep, setPokemonId} = useContext(UserContext);
  const navigator = useNavigate();

  useEffect(()=>{
    const pokemon  = getLocalStorage("pokemonID") ?? null;
    const pokemonTypes = getLocalStorage("pokemonType") ?? null;

      /**
       * Loading all the types of pokemon to load all the list of pokemons
       * 
       */
      (async () =>{
        const typesNames = await axios('https://pokeapi.co/api/v2/type');
        setPokemonTypeList(typesNames.data.results);
        pokemonDetails(typesNames.data.results);
      })();

      if(pokemonTypes){
        setPokemonType(JSON.parse(pokemonTypes));
      }
      if(pokemon){
        setPokemon(pokemon);
        getPokemonDetails(pokemon);
      }
  },[]);

  /**
   * setting the pokemon list from types of pokemon API for each type.
   * https://pokeapi.co/api/v2/type/1
   * @param typesNames list of pokemon types
   */
  const pokemonDetails = async (typesNames: INameUrl[])  =>{
    let pokemons:IPokemonType[] = [];
    const fetchValues = ()  =>{
       const items =  typesNames.map (async (item) =>{
            return await axios(`${item.url}`);
          })
        return items;
    }
    const pokemonTypeDetails:ITypeDetails[] = await Promise.all(fetchValues());
    setTypeDetails(pokemonTypeDetails);

    //creating a unique list of pokemons
    const obj:any = {};
    let len = 0;
    pokemonTypeDetails.forEach((item:any) =>{
      len = item.data.pokemon.length;
      for (let i = 0; i < len; i++) {
        obj[item.data.pokemon[i].pokemon.name] = item.data.pokemon[i].pokemon.name;
      }
    })

    //pushing into an array to set the list
    for (const key in obj) { 
      pokemons.push(obj[key]);
    }
    setPokemonList(pokemons);
  };

  /**
   * setting list of pokemon based on selection of pokemon dropdown
   * @param event 
   */
  const handleChange = (event: SelectChangeEvent<typeof pokemonType>) => {
    const {target: { value }, } = event;
    setPokemonType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    saveData("pokemonType", JSON.stringify(value));

    //on choosing type update pokemons list
    const updatedPokemons = displayUpdatedPokemons(value);
    const pokemonList = updatedPokemons.map((item:any) =>{
        return item;
    })
    //if the type is not selected, load the entire list
    pokemonList.length > 0 ? setPokemonList(pokemonList) : pokemonDetails(pokemonTypeList);
    setPokemon(null); //reset the pokemon dropdown
    setPokemonInfo({});
  };

  /**
   * Utility function to display updated pokemon list
   * @param value list of pokemon types
   * @returns 
   */
  const displayUpdatedPokemons = (value: string | string[]) =>{
      const pokemons = [];
      const updatedPokemons =  typeDetails.filter((type)=>{
          return value.includes(type.data.name);
        }).reduce((arr: IPokemonType[][], item)=>{
          return [...arr, ...item.data.pokemon];
      },[]);

      //create unique list of pokemons from the pokemon types api
      const obj:any = {};
      const t = updatedPokemons.map((item:any) =>{
          obj[item.pokemon.name] = item.pokemon.name;
      })
      for (const key in obj) { 
        pokemons.push(obj[key]);
      }
      return pokemons;
  }

  /**
   * on selecting a pokemon load information for that pokemon
   * e.g: https://pokeapi.co/api/v2/pokemon/ditto
   * @param pokemon selected pokemon
   * 
   */
  const getPokemonDetails = (pokemon: string | null) =>{
      (async () =>{
        if(pokemon){
          const pokemonDetails = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.trim()}`);
          setPokemonInfo(pokemonDetails.data)
        }
      })();
  }


    /**
     * save and quit 
     * navigate to splash page
     */
    const handleSave = () =>{
        navigate(navigator,'/', step);
        saveData('saved', JSON.stringify(true));
    }

    /**
     * handle naviagtion to next page only if pokemon is selected
     * 
     */
    const handleNext = () =>{
      //cant go next without choosing a pokemon
      if(pokemon){
        const updatedStep = step + 1;
        setStep(updatedStep);
        navigate(navigator, '/home/review', updatedStep);
        setPokemonId(pokemon);
      }
      else{
        //no next button
      } 
    }

    /**
     * handle back navigation
     */
    const handleBack = () =>{
      const updatedStep = step - 1;
      setStep(updatedStep);
      navigate(navigator, '/home/userinfo', JSON.stringify(updatedStep));
    }



  return (
    <div className='container'>
      <div className='pokedex-search-row'>
          <FormControl sx={{  width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Types</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={pokemonType}
              style={{ backgroundColor: "transparent", outline: "none", color: "#ffffff" }}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip style={{color: "#ffffff", backgroundColor: "grey", height: "22px"}} className={value} key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {pokemonTypeList.map((type: INameUrl, key) => (
                <MenuItem
                  key={key}
                  value={type.name}
                >
                  {type.name}
                </MenuItem>
              ))
              }
            </Select>
          </FormControl>

          <Autocomplete
            value={pokemon}
            onChange={(event: any, newValue : string | null) => {
              !newValue? setPokemonInfo({}):getPokemonDetails(newValue);
              setPokemon(newValue);
              newValue ? saveData("pokemonID", newValue) : saveData("pokemonID", '');
            }}
            style={{ backgroundColor: "transparent", outline: "none", color: "#ffffff" }}
            getOptionLabel={(option) => option}
            inputValue={pokemonInput}
            onInputChange={(event, newInputValue) => {
              setPokemonInput(newInputValue);
            }}
            id="controllable-states-demo"
            options={pokemonList.map((option, key) => `${option}`)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} placeholder="Pokemons" label="Pokemons" style={{color:"#ffffff"}} />}
          />

      </div>
      {Object.keys(pokemonInfo).length > 0 ? <Card {...pokemonInfo}/> : <p className='pokedex-banner'>Pick your pokemon from the dropdown.</p>}

      <div className='buttons-container'>
          <PrimaryButton name="Back" className='primary-btn' handleClick={handleBack}/>
          <PrimaryButton name="Next" className={`primary-btn${pokemon ? '' : ' btn-disabled'}`} handleClick={handleNext}/>
          <PrimaryButton name="Save and Quit" className='primary-btn' handleClick={handleSave}/>
      </div>

    </div>
   
  )
}

export default Pokedex
