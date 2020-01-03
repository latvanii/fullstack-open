import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => {
    return (
      props.counter
    )
  }
  
const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )  

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }


  const [value, setValue] = useState(10)
  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => increaseGood()} text="good" />
      <Button handleClick={() => increaseNeutral()} text="neutral" />
      <Button handleClick={() => increaseBad()} text="bad" />
      <h1>statistics</h1>
      <div>good: <Display counter={good}/></div>
      <div>neutral: <Display counter={neutral}/></div>
      <div>bad: <Display counter={bad}/></div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
