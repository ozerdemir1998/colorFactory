import Matter, { Engine } from "matter-js"
import Box from "../components/Box";
import { Dimensions } from "react-native";
import Floor from "../components/Floor";


export default restart => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const boxSize = Math.trunc(Math.max(windowWidth, windowHeight) * 0.075);
    

    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    let variableY = 0.2

    world.gravity.y = variableY;

    console.log(variableY)


    return{
        physics: {engine, world},
        Box: Box(world, 'red', {x : windowWidth/2, y: 0}, {height: boxSize, width: boxSize}),
        Floor: Floor(world, 'red', {x : windowWidth/2, y: windowHeight-boxSize*2}, {height: boxSize*3, width: boxSize*3})
    }
}