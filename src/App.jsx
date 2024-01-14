import React from 'react'
import { useState, useEffect } from 'react'
import Main from "./components/Main"
import Quiz from "./components/Quiz"
import { decode } from 'html-entities'

export default function App() {
  // setting temporary score 
  const tempScore =[]

  for (let i= 0; i < 5; i++)  {
    tempScore.push({
      isCorrect: false,
      answer: "temp",
      index: i})
  }

  // States
  const[question, setQuestion] = useState([])
  const [score, setScore] = useState(tempScore)
  const [checkScore, setCheckScore] = useState(()=> temp)
  const [isStartQuiz, setStartQuiz] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [apiError, setApiError] = useState(null);

  function temp(){
    alert("You have not started the test")
  }

  useEffect(()=>{
    if(isStartQuiz) {
       const delay = 1000;
      setTimeout(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
          .then(res => {
             if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json()
          })
          .then(data => {
            let results = data.results

            let questions = results.map(result => {
              let answer = result.incorrect_answers
              let correctAnswer = result.correct_answer
              let random = Math.ceil(Math.random() * answer.length)
              answer.splice(random, 0, correctAnswer)

              return {
                question : decode(result.question),
                // options: decode(answer),
                options: answer.map(decode),
                correctOption: decode(correctAnswer)
              }
            })
            setQuestion(questions)
            setApiError(null);
          })
          // If response is 404
          .catch(err => {
            console.error("Error fetching data:", err);
            setApiError("Error fetching data. Please refresh the page.");
          })
      }, delay);
    }
  }, [isStartQuiz])

  const quizes = question.map( (question, index) => 
   <Quiz 
    key = {question.question}
    test = {question.question}
    options = {question.options}
    correct = {question.correctOption}
    score = {setScore}
    checkScore = {setCheckScore}
    index = {index}
    setShowAnswer = {setShowAnswer}
    showAnswer = {showAnswer} 
    setTotalScore = {setTotalScore}
    />
  )

      // <div className="blub-yellow"></div>
      // <div className="blub-blue"></div>
  const resetGame = () => {
    setQuestion([]);
    setScore(tempScore);
    setCheckScore(() => temp);
    setStartQuiz(false);
    setShowAnswer(false);
    setTotalScore(0);
  };
const scoreText = <div className="scoreComp">
    <p className="scoreEl">You scored {totalScore}/5 correct answers</p>
    <button onClick={resetGame}>Play again</button>
  </div>

  // const playButton = !showAnswer ? 
  //   <button onClick={()=>checkScore(score)}>Check answer</button>
  //   : scoreText 

    const playButton = !showAnswer ?
    <button className="start-btn" onClick={() => checkScore(score)}>Check answer</button>
    : apiError ? (
      <div className="error-message">{apiError}</div>
    ) : scoreText;

  return (
  <div className="app-container">
      {!isStartQuiz && <Main start={setStartQuiz}/>}

      {isStartQuiz && 
        
        <div className="quiz-container">
          {quizes}
          {playButton}
        </div>
      }
  </div>
  )
}

