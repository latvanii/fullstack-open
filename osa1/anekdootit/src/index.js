import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )  

const MostVoted = ({votes, anecdotes, i}) => {
    if (Math.max(...votes)===0) {
        return (
            <p>No votes given</p>
        )
    }
    return (<p>Most voted: {anecdotes[i]} ({votes[i]} votes)</p>)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const voteThis = () => {
    setVote([
        ...votes.slice(0, selected),
        votes[selected] + 1,
        ...votes.slice(selected+1, votes.length)
    ]);
  }

  const [votes, setVote] = useState(new Uint8Array(props.anecdotes.length))
  const i = votes.indexOf(Math.max(...votes));


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Button handleClick={() => voteThis()} text="vote" />
      <Button handleClick={() => randomAnecdote()} text="next anecdote" />
      <p>Votes: {votes[selected]}</p>
      <MostVoted votes={votes} anecdotes={anecdotes} i={i} />
    </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
