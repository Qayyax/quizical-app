import React, { useState } from "react";
import { decode } from 'html-entities'

export default function Quiz(props) {
    const [selectedOption, setSelectedOption] = useState(null)

    function handleOption(index, option) {
        setSelectedOption(prevSelected => index === prevSelected? null : index)
        let temp = selectedOption === null || index !== selectedOption
        const isCorrect = (option === props.correct) && temp
        props.score(prevScore => {
            let currentScore = prevScore
            currentScore[props.index] = isCorrect
            return [...currentScore]
        })

        props.checkScore(() => checkAnswer)
    }

    function checkAnswer() {
        console.log("I am working")
    }

    const option = props.options.map((option, index) => 
        <p 
            key={index}
            onClick={()=> handleOption(index, option)}
            className={`${index=== selectedOption? "selected": ""} answers-text`}
        >
            {decode(option)}
        </p>
    )
    return(
        <div className="questions">
            <h2>{props.test}</h2>
            <div className="answers">
                {option}
            </div>
        </div>
    )
}
