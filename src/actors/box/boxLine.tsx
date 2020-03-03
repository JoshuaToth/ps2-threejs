import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useCannon, useGameContext } from '../../useCannon'
import { IStealableProps } from '../../provider/store/game-state'
import { Box } from './box'

export const Boxes: React.FC = () => {
  const {
    state: { worldBoxes },
  } = useGameContext()

  const lineLength = 20

  return useMemo(() => {
    let start = 0
    const kiddos: JSX.Element[] = []
    while (start < lineLength) {
      kiddos.concat(
        
      )
    }

    return (
      <>
        {worldBoxes.map((box: IStealableProps) => (
          <Box key={box.id + 'box'} {...box} size={0.2} />
        ))}
      </>
    )
  }, [worldBoxes])
}
