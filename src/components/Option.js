import React from "react";

export default function Option(props) {

    const [option, setOption] = React.useState({
        value: props.value,
        isHeld: false
    })

    const styles = {
        backgroundColor: option.isHeld? "#D6DBF5": "",
        borderColor: option.isHeld ? "transparent": ""
    }

    function select() {
        setOption(prevVal => ({
            ...prevVal,
            isHeld: !prevVal.isHeld
        }))
        props.toggle()
    }

    return (
        <p 
        className="option"
        onClick={select}
        style={styles}
        >
            {option.value}
        </p>
    )
}