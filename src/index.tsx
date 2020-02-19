import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { Canvas } from 'react-three-fiber'
import { Box } from './actors/box/box'
import { Camera } from './actors/camera/camera'

ReactDOM.render(
  <Canvas >
    <Box position={[0, 0, -2]} />
    <Box position={[5, 0, -2]} />
    <Box position={[-5, 0, -2]} />
    <Camera />
  </Canvas>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
