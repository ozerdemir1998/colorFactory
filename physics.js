import Matter from "matter-js";
import { Dimensions } from 'react-native';
import { useState } from 'react'


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const color = [
    'red',
    'blue',
    'green',
    'yellow'
]

const randomBoxColor = () => {
    index = getRandom(0, 3)
    return color[index]
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const Physics = (entities, {touches, time, dispatch}) => {

    let engine = entities.physics.engine
    

    touches.filter(t => t.type === 'press')
    .forEach(t => {
        if(entities.Floor.color == 'red'){
            Matter.Body.set(entities.Floor, "color", 'blue')
        }else if(entities.Floor.color == 'blue'){
            Matter.Body.set(entities.Floor, "color", 'green')
        }else if(entities.Floor.color == 'green'){
            Matter.Body.set(entities.Floor, "color", 'yellow')
        }else if(entities.Floor.color == 'yellow'){
            Matter.Body.set(entities.Floor, "color", 'red')
        }
    })

    if(entities.Box.body.bounds.max.y >= 439 && entities.Floor.color != entities.Box.color){
        Matter.Body.set(entities.Box, "color", randomBoxColor())
        Matter.Body.setPosition(entities.Box.body, {x: 180, y: 0})
        entities.Box.score = true
        dispatch({ type: 'new_point' })
    }else if(entities.Box.body.bounds.max.y >= 439 && entities.Floor.color == entities.Box.color){
        dispatch({ type: 'game_over' })
        console.log("game over")
    }

    
    
    Matter.Engine.update(engine, time.delta)
    return entities
}
export default Physics;
