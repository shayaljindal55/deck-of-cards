import React, { useState, useEffect } from 'react'
import { suits, values, redSuits, noDrawnCardSort, noCardsInDeck } from '../shared/Constants';
import Cards from './Cards';
import '../styles/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeckOfCards() {
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
                        id: counter++,
                        cardValue: values[x],
                        suit: suits[i],
                        color: redSuits.indexOf(suits[i]) !== -1 ? 'red' : 'black',
                        suitIndex: i, // will have values in the range [0-3]
                        rankIndex: x, // will have values in the range [0-12]
                    };
                    tempDeck.push(card);
                }
            }
            setDeck({ deckToShuffle: tempDeck, drawn: [] });
            setForceUpdate(new Date());
        } catch (e) {
            showErrorToast(e);
        }
    }
    // shuffle the cards
    const shuffleDeckOfCards = (array, e) => {
        e.preventDefault();
        try {
            if (deck.deckToShuffle.length > 0) {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * i);
                    let temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
                setDeck({ ...deck, deckToShuffle: array });
                setForceUpdate(new Date());
            } else { showErrorToast(noCardsInDeck); }
        } catch (e) {
            showErrorToast(e);
        }
    }

    const showErrorToast = (e) => {
        toast.error(e, {
            toastId: 'customId', // any random constant id to avoid duplicate toasts
            theme: "colored",
            autoClose: 9000
        });
    }

    // draw a random card
    const drawACard = (e) => {
        try {
            e.preventDefault();
            if (deck.deckToShuffle.length > 0) {
                let cardsArray = deck.deckToShuffle;
                const randomCard = cardsArray[Math.floor(Math.random() * cardsArray.length)];
                const newCardsArray = cardsArray.filter(e => e.id !== randomCard.id)
                let cardsPickedArray = deck.drawn;
                cardsPickedArray.length < 52 &&
                    cardsPickedArray.push(randomCard);
                setDeck({ deckToShuffle: newCardsArray, drawn: cardsPickedArray });
                setForceUpdate(new Date());
            } else { showErrorToast(noCardsInDeck); }
        } catch (e) {
            showErrorToast(e);
        }
    };

    const resetDrawnCards = (e) => {
        e.preventDefault();
        createDeckOfCards();
        window.localStorage.removeItem('deck');
    }

    // sort the given deck
    const sortDeck = (e) => {
        try {
            e.preventDefault();
            if (deck.drawn.length > 0) {
                deck.drawn.sort(function (a, b) {
                    if (a.suitIndex < b.suitIndex ||
                        (a.suitIndex === b.suitIndex && a.rankIndex < b.rankIndex)) {
                        return -1;
                    }
                    return 1;
                });
                setForceUpdate(new Date());
            } else { showErrorToast(noDrawnCardSort); }
        } catch (e) {
            showErrorToast(e);
        }
    }

    const saveState = (e) => {
        e.preventDefault();
        window.localStorage.setItem('deck', JSON.stringify(deck));
    }

    useEffect(() => {
        const prevState = window.localStorage.getItem('deck');
        const parsedState = JSON.parse(prevState);
        if (parsedState) {
            setDeck(parsedState);
            setForceUpdate(new Date());
        } else {
            createDeckOfCards();
        }
    }, []);

    return (
        <div className="w-100">
            <ToastContainer />
            <button onClick={(event) => shuffleDeckOfCards(deck.deckToShuffle, event)}>Shuffle</button>
            <button onClick={(event) => drawACard(event)}>Draw</button>
            <button onClick={(event) => saveState(event)}>Save</button>
            <button onClick={(event) => resetDrawnCards(event)}>Reset</button>
            <button onClick={(event) => sortDeck(event)}>Sort</button>
            <div className="card-container">
                {deck.deckToShuffle && deck.deckToShuffle.map((card, i) => {
                    return (
                        <div
                            key={card.id} className="cards">
                            <Cards suit={card.suit} cardValue={card.cardValue} color={card.color} id={card.id} />
                        </div>
                    );
                })}
            </div>
            <div className="card-container">
                {deck.drawn && deck.drawn.map((card, i) => {
                    return (
                        <div key={card.id} className="cards">
                            <Cards suit={card.suit} cardValue={card.cardValue} color={card.color} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
