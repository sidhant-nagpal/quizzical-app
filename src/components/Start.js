import React  from "react"

export default function Start(props) {
    
    return (
        <div className="start">
            <div className="top-blob"></div>
            <h1>Quizzical</h1>
            <p className="description">Click the below button to start the quiz and test your knowledge 💡</p>
            <button className="start-btn" onClick={props.start}>
                Start quiz
            </button>
        </div>
    )
}