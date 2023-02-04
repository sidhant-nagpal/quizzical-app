import React from "react";
import { BallTriangle } from 'react-loading-icons'
import Question from "./Question";
import {nanoid} from "nanoid";

export default function Quiz () {

    const [questions, setQuestions] = React.useState(() => [])
    const [options, setOptions] = React.useState(() => [])
    const [held, setHeld] = React.useState(() => ["","","","",""])
    const [check, setCheck] = React.useState(() => false)
    const [score, setScore] = React.useState(() => 0)
    const [playAgain, setPlayAgain] = React.useState(() => false)
    const [showAlert, setShowAlert] = React.useState(() => false)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setOptions(data.results.map(data => optionsArr(data)))
            })
    }, [playAgain])

    React.useEffect(() => {
        setScore(() => {
            let count = 0
            questions.map((data, index) => {
                if(data.correct_answer === held[index]) {
                    count++
                }
            })
            return count
        })
    }, [check])

    function toggleHeld(index, value) {
        setHeld(prevArr => prevArr.map(
            (item, i) => i===index ? value : item
            )
        )
    }

    function optionsArr(data) {
        const options = []
        options.push(data.correct_answer, ...data.incorrect_answers)
        options.sort(() => Math.random() - 0.5)
        return options
    }

    function checkHeld() {
        return held.every(i => i !== "")
    }

    function togglePlayAgain() {
        setQuestions([])
        setOptions([])
        setHeld(["","","","",""])
        setCheck(false)
        setScore(0)
        setPlayAgain(!playAgain)
    }

    const dataElements = questions.map((data, index) => 
        <Question
            key={nanoid()}
            question={data.question} 
            options={options[index]}
            correctAns={data.correct_answer}
            selected={held[index]}
            held={held[index]}
            holdOption={toggleHeld}
            quesIndex={index}
            check={check}
        />
    )

    return (
        <div>
            {questions.length === 0 && options.length === 0 ?
                <BallTriangle className="loading" stroke="#4D5B9E" fill="#4D5B9E" />:
                <div className="quiz">
                    {dataElements}
                    {check?
                    <div className="results">
                        <p className="score">You scored {score}/5 correct answers</p>
                        <button 
                            className="play-again-btn"
                            onClick={() => togglePlayAgain()}
                        >
                            Play again
                        </button>
                    </div>
                    :
                    <div className={`check ${!showAlert?"no-alert":""}`}>
                        {showAlert? <p className="alert">You need to attempt all the questions</p>:undefined}
                        <button 
                            className={`check-btn ${checkHeld()?"":"disable-check-btn"}`}
                            onClick={checkHeld() ? () => setCheck(true) : () => setShowAlert(true)}
                        >
                            Check answers
                        </button>
                    </div>
                    }
                </div>
            }
        </div>
    )
}