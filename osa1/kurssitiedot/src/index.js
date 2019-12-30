import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>
                {props.title}
            </h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part['name']} {props.part['exercises']}
            </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]}/>
            <Part part={props.parts[2]}/>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>
                Number of exercises {props.num1 + props.num2 + props.num3}
            </p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
      }
      const part2 = {
        name: 'Using props to pass data',
        exercises: 7
      }
      const part3 = {
        name: 'State of a component',
        exercises: 14
      }
    

  return (
    <div>
      <Header title={course}/>
      <Content parts={[part1, part2, part3]}/>
      <Total num1={part1['exercises']} num2={part2['exercises']} num3={part3['exercises']} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
