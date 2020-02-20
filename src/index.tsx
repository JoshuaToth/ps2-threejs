import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { Canvas } from 'react-three-fiber'
import { Box } from './actors/box/box'
import { Camera } from './actors/camera/camera'
import './styles.css'
import { Player } from './actors/player/player'
import { Plane } from './actors/plane/plane'
import { Provider } from './useCannon'

ReactDOM.render(
  <Canvas camera={{ position: [0, 0, 15] }}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Provider>
      <Plane position={[0, 0, -10]} />
      <Box position={[1, 0, 1]} />
      <Box position={[2, 1, 5]} />
      <Box position={[0, 0, 6]} />
      <Box position={[-1, 1, 8]} />
      <Box position={[-2, 2, 13]} />
      <Box position={[2, -1, 13]} />
      <Player position={[0, 0, 13]} />
    </Provider>
    <Camera />
  </Canvas>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
