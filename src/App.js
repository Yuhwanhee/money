import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './page/Homepage';
import Roulette from './page/Roulette';
import Post from './page/Post';
import Board from './page/Board';


function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/rulet' element={<Roulette />} />
        <Route path='/post/:type' element={<Post />} />
        <Route path='/board/:id' element={<Board/>} />
      </Routes>
    </div>
  );
}

export default App;
