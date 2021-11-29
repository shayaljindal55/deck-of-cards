import bg_img from './card-games.svg';
import './App.css';
import Shuffle from '../src/components/Shuffle';
function App() {
  return (
    <div className="App">
      <header className="App-header">
          iX Card Test
          {/* <img src={bg_img} className="Bg-img" alt="logo" /> */}
          <Shuffle />
      </header>
    </div>
  );
}

export default App;
