import React from "react";
import {nanoid} from "nanoid"
import Option from "./Option.js"

export default function Question(props) {

    function decode(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <div className="qna">
            <p 
            className="question" 
            >
                {decode(props.question)}
            </p>
            <div className="options">
                {props.options.map((opt, index) => 
                    <Option 
                        key={nanoid()}
                        value={decode(opt)}
                        optionIndex={index}
                        held={props.held}
                        selected={props.selected}
                        holdOption={props.holdOption}
                        quesIndex={props.quesIndex}
                        check={props.check}
                        correctAns={props.correctAns}
                    />
                )}
            </div>
        </div>
    )
}
