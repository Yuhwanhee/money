import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './page/Homepage';
import Roulette from './page/Roulette';
import Post from './page/Post';


function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/rulet' element={<Roulette />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
