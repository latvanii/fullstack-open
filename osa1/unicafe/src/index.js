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

const Statistic = ({text, value}) => {
    return (<div>{text}: <Display counter={value}/></div>)
}

const Statistics = ({bad, good, neutral}) => {
    const total = bad + neutral + good
    if (total === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <div>
            <Statistic text="good" value = {good} />
            <Statistic text="neutral" value = {neutral} />
            <Statistic text="bad" value = {bad} />
            <Statistic text="all" value = {total} />
            <Statistic text="average" value = {(good-bad) / total} />
            <Statistic text="positive" value = {good/ total} />
        </div>
    )

}

const App = () => {
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

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => increaseGood()} text="good" />
      <Button handleClick={() => increaseNeutral()} text="neutral" />
      <Button handleClick={() => increaseBad()} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
