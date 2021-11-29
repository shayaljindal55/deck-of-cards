import React, { useState, useEffect } from 'react'
import { suits, values, redSuits } from '../shared/Constants';
import Cards from './Cards';
import '../styles/style.css';

export default function Shuffle() {
    const [deck, setDeck] = useState({ deckToShuffle: [], drawn: [] });
    const [forceUpdate, setForceUpdate] = useState(Date.now());
    // create a deck of cards
    const createDeckOfCards = () => {
        try {
            const tempDeck = [];
            let counter = 0;
            for (let i = 0; i < suits.length; i++) {
                for (let x = 0; x < values.length; x++) {
                    let card = {
                        Id: counter++,
                        Value: values[x],
                        Suit: suits[i],
                        Color: redSuits.indexOf(suits[i]) !== -1 ? 'red' : 'black'
                    };
                    tempDeck.push(card);
                }
            }
            setDeck({ deckToShuffle: tempDeck, drawn: [] });
            setForceUpdate(new Date());
        } catch (e) {
            alert(e);
        }
    }
    // shuffle the cards
    const shuffleDeckOfCards = (array) => {
        try {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * i);
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            setDeck({ ...deck, deckToShuffle: array });
            setForceUpdate(new Date());
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        createDeckOfCards();
    }, []);

    return (
        <div className="w-100">
            <div className="card-container">
                {deck.deckToShuffle && deck.deckToShuffle.map((card, i) => {
                    return (
                        <div className="animated slideInDown"
                            key={card.Id}>
                            <Cards suit={card.Suit} value={card.Value} color={card.Color} id={card.Id} />
                        </div>
                    );
                })}
            </div>
            <button onClick={() => shuffleDeckOfCards(deck.deckToShuffle)}>Shuffle</button>
        </div>
    )
}
