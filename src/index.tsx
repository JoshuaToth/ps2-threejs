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
import { ProviderContainer } from './provider/provider'
import { GameContextProvider } from './provider/context'

ReactDOM.render(
  <GameContextProvider>
    <Canvas camera={{ position: [0, 0, 25] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ProviderContainer />
      <Camera />
    </Canvas>
  </GameContextProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
