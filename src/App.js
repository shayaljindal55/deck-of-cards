import './App.css';
import joker from './images/joker-img.png';
import DeckOfCards from '../src/components/DeckOfCards.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="box-header">
          <img src={joker} className="joker" alt="joker-image" />  <span>Deck of Cards</span>
          <img src={joker} className="joker" alt="joker-image" /></div>
        <DeckOfCards />
      </header>
    </div>
  );
}

export default App;
