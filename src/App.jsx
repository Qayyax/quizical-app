import React from 'react'
import { useState, useEffect } from 'react'
import Main from "./components/Main"
import Quiz from "./components/Quiz"
import { decode } from 'html-entities'

export default function App() {
  const[question, setQuestion] = useState([])
  const [score, setScore] = useState([false, false, false, false, false])
  const [checkScore, setCheckScore] = useState(()=> temp)
  const [isStartQuiz, setStartQuiz] = useState(false)

  function temp(){
    console.log("happy new year")
  }

  useEffect(()=>{
    if(isStartQuiz) {
    
      fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => {
          let results = data.results

          let questions = results.map(result => {
            let answer = result.incorrect_answers
            let correctAnswer = result.correct_answer
            let random = Math.ceil(Math.random() * answer.length)
            answer.splice(random, 0, correctAnswer)

            return {
              question : decode(result.question),
              options: answer,
              correctOption: correctAnswer
            }
          })
          setQuestion(questions)
        })
        // If response is 404
        .catch(err => console.log("No result found"))
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
    />
  )

      // <div className="blub-yellow"></div>
      // <div className="blub-blue"></div>
  return (
  <div className="app-container">
      {!isStartQuiz && <Main start={setStartQuiz}/>}

      {isStartQuiz && 
        
        <div className="quiz-container">
          {quizes}
          <button onClick={()=>checkScore()}>Check answer</button>
        </div>
      }
  </div>
  )
}

