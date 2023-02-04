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
            {/* <p>{decode(props.selected)}</p> */}
            <div className="options">
                {props.options.map((opt, index) => 
                    <Option 
                        key={nanoid()}
                        value={decode(opt)}
                        toggle={props.toggle}
                        optionIndex={index}
                        held={props.held}
                        selected={props.selected}
                        holdOption={props.holdOption}
                        quesIndex={props.quesIndex}
                    />
                )}
            </div>
        </div>
    )
}
