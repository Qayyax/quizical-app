import React from "react";

export default function Main(props) {
    function startGame() {
        props.start(true)
    }

    return (
        <div className="main-container">
            <h1>Quizzical</h1>
            <p className="description-main">
                This is a trivia app with medium level difficulty
            </p>
            <button onClick={startGame} className="start-btn">Start quiz</button>
        </div>
    )
}
