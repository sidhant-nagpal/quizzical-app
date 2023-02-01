import React from "react";
import {nanoid} from "nanoid"

export default function Questions() {

    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    }, [])

    console.log(questions)

    const dataElements = questions.map(data => 
        <div className="qna" key={nanoid()}>
            <p className="questions">
                {decode(data.question)}
            </p>
            <div className="options">
                {optionsArr(data).map(
                    opt => <p key={nanoid()} className="option">{decode(opt)}</p>
                )}
            </div>
        </div>
    )

    function optionsArr(data) {
        const options = data.incorrect_answers
        options.push(data.correct_answer)
        options.sort(() => Math.random() - 0.5)
        return options
    }

    function decode(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // {if(questions.length != 0) console.log(questions.map(data => decode(data.question)))}
    
    return (
        <div>
            {questions.length === 0 ?
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