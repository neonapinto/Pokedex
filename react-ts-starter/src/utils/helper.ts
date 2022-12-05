/**
 * handles navigation to the given path
 * saves the current flow in the local storage
 * @param navigator useNavigate from react router
 * @param path path to navigate
 * @param value value to be set in Local storage
 */
export const navigate = (navigator: any, path:string, value: string) =>{
    navigator(path);
    saveData('step', value);
}

/**
 * handles saving the data to the local storage
 * @param key 
 * @param value 
 */
export const saveData = (key:string, value: string) =>{
    localStorage.setItem(key, value);
}

/**
 * gets the value from local storage
 * @param key 
 * @returns the value for given key in local storage
 */
export const getLocalStorage = (key:string) =>{
    return localStorage.getItem(key);
}

/**
 * clears the local storage
 */
export const clearStorage = () =>{
    localStorage.clear();
}

/**
 * props for the auto select dropdown menu
 */
export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};