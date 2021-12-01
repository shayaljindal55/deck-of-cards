import React, { useState, useEffect } from 'react'
import {
    suits, values,
    redSuits, noDrawnCardSort, noCardsInDeck, noCardsInDrwanDeck,
    only52allowed, numberOfCardsToDraw
} from '../shared/Constants';
import Cards from './Cards';
import '../styles/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sortCards } from '../shared/Utilities';
import ReactTooltip from 'react-tooltip';

export default function DeckOfCards() {
    const [deck, setDeck] = useState({ deckToShuffle: [], drawn: [] });
    ;
    /*  create a deck of cards */
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
                        suitIndex: i, /* will have values in the range [0-3] */
                        rankIndex: x, /* will have values in the range [0-12] */
                    };
                    tempDeck.push(card);
                }
            }
            localStorage.setItem('currentState',
                JSON.stringify({ deckToShuffle: tempDeck }));
            /*  default to a randomly shuffled deck */
            const currentState = localStorage.getItem('currentState');
            const currentDeck = currentState && JSON.parse(currentState).deckToShuffle;
            shuffleDeckOfCards(currentDeck, true);
            window.localStorage.removeItem('currentState');
        } catch (e) {
            showErrorToast(e);
        }
    }

    /* shuffle the cards */
    const shuffleDeckOfCards = async (array, onLoad = false, e = null) => {
        e && e.preventDefault();
        try {
            if (onLoad || deck.deckToShuffle.length > 0) {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * i);
                    let temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
                if (onLoad) {
                    await setDeck(prevDeck => ({ deckToShuffle: array, drawn: [] }));
                } else {
                    await setDeck(prevDeck => ({ ...deck, deckToShuffle: array }));
                }
            } else {
                showErrorToast(noCardsInDeck);
            }
        } catch (e) {
            showErrorToast(e);
        }
    }

    /* show error toast message */
    const showErrorToast = (e) => {
        toast.error(e, {
            toastId: 'customId', /* any random constant id to avoid duplicate toasts */
            theme: "colored",
            autoClose: 9000
        });
    }

    /* draw a random card */
    const drawACard = async (e) => {
        try {
            e.preventDefault();
            const count = document.getElementById("draw-card").value;
            const numbersOfCards = parseInt(count);
            if (numbersOfCards) {
                if (0 < numbersOfCards && numbersOfCards < 53
                    && numbersOfCards < deck.deckToShuffle.length) {
                    if (deck.deckToShuffle.length > 0) {
                        let newCardsArray = [];
                        let cardsPickedArray = [];
                        let cardsArray = deck.deckToShuffle;
                        for (let i = 0; i < numbersOfCards; i++) {
                            let randomCard = cardsArray[Math.floor(Math.random() * cardsArray.length)];
                            if (deck.drawn.findIndex(x => x.id === randomCard.id) !== -1) {
                                randomCard = cardsArray[Math.floor(Math.random() * cardsArray.length)];
                            }
                            cardsPickedArray = deck.drawn;
                            cardsPickedArray.length < 52 &&
                                cardsPickedArray.push(randomCard);
                        }
                        newCardsArray = cardsArray.filter(function (obj) { return cardsPickedArray.indexOf(obj) === -1; });

                        await setDeck(prevDeck => ({
                            deckToShuffle: newCardsArray,
                            drawn: cardsPickedArray
                        }));
                    }
                    else {
                        showErrorToast(noCardsInDeck);
                    }
                } else { showErrorToast(only52allowed); }
            } else { showErrorToast(numberOfCardsToDraw); }
        } catch (e) {
            showErrorToast(e);
        }
    };

    /* place all the cards back in the deck in default state and clear localstorage  */
    const resetDrawnCards = async (e) => {
        e.preventDefault();
        createDeckOfCards();
        window.localStorage.removeItem('deck');
    }

    /* sort the given deck */
    const sortDeck = async (drawnCards, e) => {
        e && e.preventDefault();
        try {
            if (drawnCards.length > 0) {
                deck.drawn = sortCards(drawnCards);
                await setDeck(prevDeck => ({ ...deck, drawn: deck.drawn }));
            } else { showErrorToast(noDrawnCardSort); }
        } catch (e) {
            showErrorToast(e);
        }
    }

    /* to preserve the current state store it in localstorage */
    const saveState = (e) => {
        e.preventDefault();
        window.localStorage.setItem('deck', JSON.stringify(deck));
    }

    /* render deck of cards on initial load */
    useEffect(async () => {
        const prevState = window.localStorage.getItem('deck');
        const parsedState = JSON.parse(prevState);
        if (parsedState) {
            await setDeck(prevDeck => (parsedState));
        } else {
            createDeckOfCards();
        }
    }, []);

    useEffect(() => {
        if (deck.deckToShuffle.length > 0 || deck.drawn.length > 0) {
            setDeck(deck);
        }
    }, [deck]);

    return (
        <div className="w-100">
            <ToastContainer />
            <div>
                <ReactTooltip id="shuffle" place="top" effect="solid">
                    Shuffle the deck!
                </ReactTooltip>
                <button data-tip data-for="shuffle" id="shuffle-btn"
                    onClick={(event) => shuffleDeckOfCards(deck.deckToShuffle, false, event)}>Shuffle</button>
                <ReactTooltip id="draw" place="top" effect="solid">
                    Draw a random card!
                </ReactTooltip>
                <button data-tip data-for="draw" id="draw-btn"
                    onClick={(event) => drawACard(event)}>Draw</button>
                <div>
                    <label htmlFor="draw-card" className="draw-count">How many card you want to draw?</label>
                    <input type="number"
                        alt="How many card you want to draw?"
                        id="draw-card" />
                </div>
            </div>
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
            <div>
                <ReactTooltip id="save" place="top" effect="solid">
                    Save the game!
                </ReactTooltip>
                <button data-tip data-for="save" id="save-btn"
                    onClick={(event) => saveState(event)}>Save</button>
                <ReactTooltip id="reset" place="top" effect="solid">
                    Reset the game!
                </ReactTooltip>
                <button data-tip data-for="reset" id="reset-btn"
                    onClick={(event) => resetDrawnCards(event)}>Reset</button>
                <ReactTooltip id="sort" place="top" effect="solid">
                    Sort the drawn cards!
                </ReactTooltip>
                <button data-tip data-for="sort" id="sort-btn"
                    onClick={(event) => sortDeck(deck.drawn, event)}
                    data-testid="sort-btn">Sort</button>
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
