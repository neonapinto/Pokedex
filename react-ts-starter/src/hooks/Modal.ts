import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigate } from "../utils/helper";

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);
    const navigator = useNavigate();

    function toggle() {
      setIsShowing(!isShowing);
    }

    const returnToScreen = () =>{
        navigate(navigator, '/', "1");
    }
  
    return {
      isShowing,
      toggle,
      returnToScreen
    }
};

export default useModal;