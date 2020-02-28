import React, { useState, useMemo } from 'react'
import { Plane } from '../actors/plane/plane'
import { Box } from '../actors/box/box'
import { Player } from '../actors/player/player'
import { Provider, useGameContext } from '../useCannon'
import { stealableProps } from './store/game-state'
import { Boxes } from '../actors/box/boxes'

export const ProviderContainer: React.FC = () => {
  const {
    state: { worldBoxes },
  } = useGameContext()

  return useMemo(
    () => (
      <Provider>
        <Plane position={[0, 0, 0]} />
        <Player position={[0, 0, 13]}/>
        <Boxes />
      </Provider>
    ),
    []
  )
}
