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
            <p className="question">
                {decode(props.question)}
            </p>
            <div className="options">
                {props.options.map(opt => 
                    // <p 
                    // key ={nanoid()}
                    // className="option"
                    // onClick={props.toggle}
                    // // isHeld={false}
                    // >
                    //     {decode(opt)}
                    // </p>
                    <Option 
                        key={nanoid()}
                        value={decode(opt)}
                        toggle={props.toggle}
                    />
                )}
            </div>
        </div>
    )
}