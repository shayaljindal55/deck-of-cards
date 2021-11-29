import React from 'react'
import '../styles/style.css';

export default function Cards(props) {
    const { suit, value, color, id } = props;
    return (
        <div className={`outline outline-adjusted shadow rounded ${color}`} key={id}>
            <div className="top"><span>{value}</span><span>{suit}</span></div>
            <h1>{id}</h1>
            <div className="bottom"><span>{suit}</span><span>{value}</span></div>
        </div>
    )
}
