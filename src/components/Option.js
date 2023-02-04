import React from "react";

export default function Option(props) {

    const styles = {
        backgroundColor: checkHeld() ? "#D6DBF5": "",
        borderColor: checkHeld() ? "transparent": "",
    }

    function select() {
        props.holdOption(props.quesIndex, 
            props.held === "" ? props.value : ""
        )
    }

    function checkHeld() {
        return props.value === props.held
    }

    function answer() {
        if (props.value === props.correctAns) {
            return "correct-ans"
        } else if (checkHeld() && props.value !== props.correctAns) {
            return "wrong-ans"
        } else {
            return "others"
        }
    }

    return (
        <p 
        className={`option ${props.check && answer()}`}
        onClick={checkHeld() || props.held === "" ? select : undefined}
        style={!props.check? styles: undefined}
        >
            {props.value}
        </p>
    )
}