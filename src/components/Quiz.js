import React from "react";
import Question from "./Question";
import {nanoid} from "nanoid";

export default function Quiz () {

    const [questions, setQuestions] = React.useState(() => [])
    const [selected, setSelected] = React.useState(() => [false, false, false, false, false])
    const [options, setOptions] = React.useState(() => [])
    const [held, setHeld] = React.useState(() => [-1,-1,-1,-1,-1])
    const [check, setCheck] = React.useState(() => false)
    // console.log(canCheck)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setOptions(data.results.map(data =>optionsArr(data)))
            })
    }, [])

    function toggleSelected(index) {
        setSelected(prevArr => prevArr.map(
            (item, i) => i===index ? !item : item
            )
        )
    }

    function toggleHeld(index, value) {
        setHeld(prevArr => prevArr.map(
            (item, i) => i===index ? value : item
            )
        )
    }

    function toggleCheck() {
        setCheck(true)
    }

    function optionsArr(data) {
        const options = []
        // console.log(data.incorrect_answers)
        options.push(data.correct_answer, ...data.incorrect_answers)
        options.sort(() => Math.random() - 0.5)
        // console.log("RAN")
        return options
    }

    const dataElements = questions.map((data, index) => 
        <Question
            key={nanoid()}
            question={data.question} 
            options={options[index]}
            correctAns={data.correct_answer}
            toggle={() => toggleSelected(index)}
            selected={selected[index]}
            held={held[index]}
            holdOption={toggleHeld}
            quesIndex={index}
        />
    )
    
    return (
        <div>
            {questions.length === 0 && options.length === 0?
                <></>:
                <div className="quiz">
                    {dataElements}
                    <button 
                        className="check-btn"
                        onClick={!selected.every(i => i === true) ? undefined : toggleCheck}
                    >
                        Check answers
                    </button>
                </div>
            }
        </div>
    )
}