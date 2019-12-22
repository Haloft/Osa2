import React from 'react'


const Course = (props) => {
    return (
        <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total total={props.course.parts} />
        </div>
      ) 
}
const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}
const Part = (props) => {
    return (
        <div>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </div>
      )
}
const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} part={part} />)}
        </div>    
    )
}

const Total = ({ total }) => {
    const exercises = total.reduce(
        (acc, cur) => { 
    return (
        acc + cur.exercises)
    }, 0)
    return(
        <p>Total number of exercises: {exercises}</p>
    )
}

export default Course