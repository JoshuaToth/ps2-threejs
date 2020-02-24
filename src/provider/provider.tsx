import React, { useState, useMemo } from 'react'
import { Plane } from '../actors/plane/plane'
import { Box } from '../actors/box/box'
import { Player } from '../actors/player/player'
import { Provider } from '../useCannon'
import { boxProps } from './store/game-state';
import { useGameContext } from './context'

export const ProviderContainer: React.FC = () => {
	const { state: {
		playerBoxes,
		worldBoxes
	} } = useGameContext()
//   const [playerBoxes, setPlayerBoxes] = useState<boxProps[]>([])

//   const addToPlayerBox = (box: boxProps) => {
//     // Make sure to use the current position. not the original

//     setPlayerBoxes(playerBoxes.concat(box))
//     const index = boxes.indexOf(box, 0)
//     if (index > -1) {
//       boxes.splice(index, 1)
//     }
//   }

  return useMemo(
    () => (
      <Provider>
        <Plane position={[0, 0, 0]} />
        <Player
          position={[0, 0, 13]}
          boxes={playerBoxes}
        ></Player>
        {worldBoxes.map((box: boxProps) => (
          <Box key={box.id} position={box.position} />
        ))}
      </Provider>
    ),
    [worldBoxes, playerBoxes]
  )
}
