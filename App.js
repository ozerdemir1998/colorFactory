import { View, TouchableOpacity, StyleSheet, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, {useState, useEffect} from 'react';
import { GameEngine } from "react-native-game-engine";
import Matter, { World } from "matter-js";
import { StatusBar } from 'expo-status-bar';
import entities from './entities';
import Physics from './physics';
import index from './entities/index'

const windowHeight = Dimensions.get('window').height


export default function App(){
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [boxGravity, setBoxGravity] = useState(0.2)
  useEffect(() => {
    setRunning(true)

  }, [])
    return (
      <View style={{ flex: 1 }}>
        
        <GameEngine
          variable={boxGravity}
          ref={(ref) => { setGameEngine(ref) }}
          systems={[Physics]}
          entities={entities()}
          running={running}
          style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0}}
          onEvent={(e) => {
            switch (e.type) {
              case 'game_over':
                gameEngine.stop()
                setRunning(false)
                break;
              case 'new_point':
                setScore(score + 1)
                if(score > 5){
                  setBoxGravity(0.5)
                  entities().physics.world.gravity.y = boxGravity
                  console.log(entities().physics.world.gravity.y)
                }
                else if(score > 10){
                  setBoxGravity(0.7)
                  entities().physics.world.gravity.y = boxGravity
                  console.log(entities().physics.world.gravity.y)
                }
                break;
            }
          }}
        >

        </GameEngine>

        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
          { !running ?
            <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10, marginTop: 5,  }}
              onPress={() => {
                setScore(0)
                setRunning(true)
                gameEngine.swap(entities())
              }}>
              <View>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
                  START GAME
                </Text>
              </View>
            </TouchableOpacity> : null
          }
          <Text style={{ textAlign: 'center', fontSize: 100, margin: 20, color: 'black' }}>{score}</Text>
          
        </View>

      </View>
    );
}
