import React from "react";

export default function Option(props) {

    // const option = {
    //     value: props.value,
    //     isHeld: false
    // }

    const styles = {
        backgroundColor: props.optionIndex === props.held ? "#D6DBF5": "",
        borderColor: props.optionIndex === props.held ? "transparent": "",
    }

    function select() {
        // option.isHeld = !option.isHeld
        props.holdOption(props.quesIndex, 
            props.held === -1 ? props.optionIndex : -1
        )
        props.toggle()
    }

    return (
        <p 
        className="option"
        onClick={props.optionIndex === props.held || !props.selected ? select : undefined}
        style={styles}
        >
            {props.value}
        </p>
    )
}