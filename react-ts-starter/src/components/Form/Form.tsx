import React, {FC} from 'react';
import { IFormProps } from '../../utils/Interfaces';
import 'react-phone-number-input/style.css'

const Form:FC<IFormProps> = ({formData, handleFormData, errors, handleValidate}) => {

  return (
    <form className='user-form'>
        <label>First Name</label>
        <input 
          type="text" 
          value={formData.firstName} 
          name="firstName" id="firstName" 
          onChange={(e) => handleFormData(e)} placeholder="Enter your first name"
          onFocus={handleValidate} 
          onBlur={handleValidate}
          />
        <label>Last Name</label>
        <input 
            type="text" 
            value={formData.lastName} 
            name="lastName" id="lastName" 
            onChange={(e) => handleFormData(e)} 
            placeholder="Enter the last name"
            onBlur={handleValidate}
            onFocus={handleValidate} 
        />
        <label>Phone Number</label>
        <input 
            type="text" 
            value={formData.phone} 
            name="phone" id="phone" 
            onChange={(e) => handleFormData(e)} 
            onBlur={handleValidate}
            onFocus={handleValidate} 
            placeholder="Enter the phone number"
          />
        <label>Address</label>
        <input 
          type="text" 
          value={formData.address} 
          name="address" id="address" 
          onChange={(e) => handleFormData(e)} 
          placeholder="Enter the address"
          onBlur={handleValidate}
          onFocus={handleValidate} 
        />
    </form>
  )
}

export default Form;