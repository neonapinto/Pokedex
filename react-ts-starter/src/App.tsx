import {FC} from 'react';
import './App.css';
import AppRouter from './routes/AppRouter';


const App:FC = () => {
  return (
    <div className="body-container">
      {AppRouter()}
    </div>
  );
}

export default App;
