import React  from "react"
import Start from "./Start.js"
import Quiz from "./Quiz.js"

export default function App() {

    const [started, setStarted] = React.useState(false)
    
    function start() {
        setStarted(prevVal => !prevVal)
    }

    return (
        <main>
            {started?
            <Start start={start} />:
            <Quiz/>}
        </main>
    )
}