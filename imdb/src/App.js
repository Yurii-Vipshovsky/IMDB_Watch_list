import './App.css';
import Header from './components/header/Header';
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  
  return (
    <div className="App">
      <Header/>
      {location.pathname === '/' ? 
        <div className='greating-text'>
          <div>Welcome!</div>
          <div>Lets Find some Movies!</div>
        </div>
      :
        <Outlet />
      }
    </div>
  );
}

export default App;
