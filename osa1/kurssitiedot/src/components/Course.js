import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>
                {props.title}
            </h2>
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

const Total = ({parts}) => {
    const sum_values = (accumulator, currentValue) => accumulator + currentValue;

    const sum_total = () => parts.map(part => part['exercises']).reduce(sum_values)

    return (
        <div>
            <p>
                <b>Number of exercises {sum_total()}</b>
            </p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header title={course['name']}/>
            <Content parts={course['parts']}/>
            <Total parts={course['parts']}/>
        </div>
    )
}

export default Course