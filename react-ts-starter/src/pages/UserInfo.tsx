import {FC, useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import Form from '../components/Form/Form';
import { getLocalStorage, navigate, saveData } from '../utils/helper';
import { IErrorProps, IUserProps } from '../utils/Interfaces';
import { UserContext } from './Home';

const UserInfo:FC = () => {

  const navigator = useNavigate();
  const {step, setStep} = useContext(UserContext); //context for the current step

  /**
   * form data state
   */
  const [formData, setFormData] = useState<IUserProps>({
      "firstName": "",
      "lastName": "",
      "phone": "",
      "address": ""
    });

  /**
   * state to handle form validation
   */
  const [errors, setErrors] = useState<IErrorProps>({
    firstName: false,
    lastName: false,
    phone: false,
    address: false
  });

  const [error, setError] = useState<boolean>(true); //state to check if all fields are validated

  useEffect(()=>{
    //load data from local storage if already filled by usrr
    const formData = getLocalStorage('userinfo'); 
    if(formData){
      setFormData(JSON.parse(formData));
    }
  }, []);

  useEffect(() =>{
    handleValidation();
  },[formData])

    /**
     * function to handle user input
     * @param e event handler
     */
    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const updatedUser = {...formData, [e.target.name]: e.target.value};
      setFormData(updatedUser);
      saveData('userinfo', JSON.stringify(updatedUser));
    }

    /**
     * 
     * @returns form validation
     */
    const handleValidation = () =>{
        let {firstName, lastName, phone, address} = formData;
        let errorsObj = errors;
        !firstName || firstName.trim() === '' ? errorsObj.firstName = true : errorsObj.firstName = false;
        !lastName || lastName.trim() === '' ? errorsObj.lastName = true : errorsObj.lastName = false;
        !phone || phone.trim() === '' ? errorsObj.phone = true : errorsObj.phone = false;
        !address || address.trim() === '' ? errorsObj.address = true : errorsObj.address = false;

        if(errorsObj.firstName || errorsObj.lastName || errorsObj.phone || errorsObj.address){
          setError(true)
          return true;
        }
        else{
          setError(false)
          return false;
        }
    }
    
    /**
     * save data to local storage
     */
    const handleSave = () =>{
        navigate(navigator, '/', step);
        saveData('saved', JSON.stringify(true));
    }

    /**
     * navigate to next page if form is validated
     */
    const handleNext = () =>{
      if(!handleValidation()){
        const updatedStep = step + 1;
        setStep(updatedStep);
        navigate(navigator, '/home/pokedex', updatedStep);
      }
    }

  return (
    <>
        <div className='container user-form-container'>
          <h4>Enter your details</h4>
          <Form formData={formData} handleFormData={(e) =>handleFormData(e)} errors={errors} handleValidate={handleValidation}/>
          </div>
          <div className='buttons-container'>
            <PrimaryButton name="Next" className={`primary-btn ${error ? 'btn-disabled' : ''} `} handleClick={handleNext}/>
            <PrimaryButton name="Save and Quit" className='primary-btn' handleClick={handleSave} />
        </div>
    </>
  )
}

export default UserInfo