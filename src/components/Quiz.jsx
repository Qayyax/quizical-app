import React, { useState } from "react";

export default function Quiz(props) {
    const [selectedOption, setSelectedOption] = useState(null)

    function handleOption(index, option) {
        setSelectedOption(prevSelected => index === prevSelected? null : index)
        let temp = selectedOption === null || index !== selectedOption
        const isCorrect = (option === props.correct) && temp
        props.score(prevScore => {
            let currentScore = prevScore
            currentScore[props.index].isCorrect = isCorrect
            currentScore[props.index].answer = props.correct
            currentScore[props.index].selected = temp ? option : "none"
            return [...currentScore]
        })

        props.checkScore(() => checkAnswer)
    }

    function checkAnswer(score) {
        let totalScoreArray = score.map(score => {
            return score.isCorrect ? 1 : 0
        }) 

        let totalScore = totalScoreArray.reduce((acc, current)=> acc + current,0)

        let answered = score.map(score=> {
            return score.answer === "temp" || score.selected === "none"  
                ? 0 : 1
        })

        let totalAnswered = answered.reduce((acc, current) => acc + current,0)

        props.setTotalScore(totalScore)
        totalAnswered === 5 ? props.setShowAnswer(true) : props.setShowAnswer(false)

    }

    const option = props.options.map((option, index) => 
        <p 
            key={index}
            onClick={()=> handleOption(index, option)}
            className={`${index=== selectedOption? "selected": ""} answers-text 
            ${props.showAnswer && index=== selectedOption ? "red" : ""}
            ${props.showAnswer && option === props.correct ? "green" : ""} 
            `}
        >
            {option}
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
