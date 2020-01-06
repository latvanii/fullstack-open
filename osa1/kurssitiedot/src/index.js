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

const Part = ({part}) => {
    return (
        <li>
            {part['name']} {part['exercises']}
        </li>
    )
}

const Content = ({parts}) => {
    const format_parts = () => parts.map(part =>
        <Part part={part} key={part.id}/>
        )
    return (
        <div>
            {format_parts()}
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>
                Number of exercises {props.parts[0]['exercises'] + props.parts[1]['exercises'] + props.parts[2]['exercises']}
            </p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header title={course['name']}/>
            <Content parts={course['parts']}/>
            {/* <Total parts={course['parts']}/> */}
        </div>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Fourth course',
          exercises: 8,
          id: 4
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'))
