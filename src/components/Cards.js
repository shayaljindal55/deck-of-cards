import React from 'react'
import '../styles/style.css';

export default function Cards(props) {
    const { suit, cardValue, color, id } = props;
    return (
        <div className={`outline outline-adjusted shadow rounded ${color}`}
            key={id}
            data-testid={id}>
            <div className="top">
                <span data-testid={`cardValue ${id}`}>{cardValue}</span>
                <span data-testid={`suit ${id}`}>{suit}</span>
            </div>
        </div>
    )
}
