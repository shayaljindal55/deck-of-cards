import React from 'react'
import '../styles/style.css';

export default function Cards(props) {
    const { suit, cardValue, color, id } = props;
    return (
        <div className={`outline outline-adjusted shadow rounded ${color}`} key={id}>
            <div className="top"><span>{cardValue}</span><span>{suit}</span></div>
        </div>
    )
}
