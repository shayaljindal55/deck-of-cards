import bg_img from './card-games.svg';
import './App.css';
import DeckOfCards from '../src/components/DeckOfCards.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
          Deck Of Cards
          {/* <img src={bg_img} className="Bg-img" alt="logo" /> */}
          <DeckOfCards />
      </header>
    </div>
  );
}

export default App;
