import React, {useState} from "react";

import "../css/style.css";

/**
 * GUI for card drawing and sorting.
 * @returns the app with a nice GUI.
 */
export default function App() {

    const backUrl = "http://localhost:8081/cards";

    // The current hand is stocked here.
    const [hand, setHand] = useState(null);

    /**
     * Fetches a new hand and stocks it in the previous hook.
     */
    function fetchNewHand() {
        fetch(backUrl + "/draw")
        .then(response => response.json())
        .then(json => setHand(json))
    }

    /** 
     * Sorts the current hand.
     */
    function sortHand() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hand)
        };
        fetch(backUrl + "/sort", requestOptions)
            .then(response => response.json())
            .then(json => setHand(json));
    }

    /**
     * Displays current hand.
     * If there is no hand, displays 10 flipped cards.
     */
    function displayHand() {
        let cardDisplay = [];
        if(hand) {
            for(let i=0; i<10;i++) {
                let imgUrl = "/img/" + hand.cards[i].priority + ".png";
                cardDisplay.push(<img class="card" src={imgUrl}></img>)
            }
        } else {
            for(let i=0; i<10;i++) {
                cardDisplay.push(<img class="card" src="/img/0.png"></img>)
            }
        }
        
        return cardDisplay;
    }

    return(
        <div>
            <div class="cards">
                {displayHand()}
            </div>
            <div class="cards">
                <button onClick={() => fetchNewHand()} type="button">
                    Tirer 10 cartes
                </button>
                <button onClick={() => sortHand()} type="button">
                    Trier
                </button>
            </div>
        </div>
    );

}