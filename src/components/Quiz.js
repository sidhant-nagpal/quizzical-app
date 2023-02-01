import React from "react";
import Question from "./Question";
import {nanoid} from "nanoid";

export default function Quiz () {

    const [questions, setQuestions] = React.useState([])
    const [selected, setSelected] = React.useState([false, false, false, false, false])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    }, [])

    // console.log(questions)

    function toggleSelected(index) {
        setSelected(prevArr => {
            const newArr = prevArr
            newArr[index] = !newArr[index]
            return newArr
        })
    }

    const dataElements = questions.map((data, index) => 
        <Question
            key={nanoid()}
            question={data.question} 
            options={optionsArr(data)}
            correctAns={data.correct_answer}
            selected={selected[index]}
            toggle={() => toggleSelected(index)}
        />
    )

    function optionsArr(data) {
        const options = data.incorrect_answers
        options.push(data.correct_answer)
        options.sort(() => Math.random() - 0.5)
        return options
    }
    
    return (
        <div>
            {questions.length === 0?
                <></>:
                <div className="quiz">
                    {dataElements}
                    <button className="check-btn">
                        Check answers
                    </button>
                </div>
            }
        </div>
    )
}
