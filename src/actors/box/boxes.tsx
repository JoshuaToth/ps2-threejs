import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useCannon, useGameContext } from '../../useCannon'
import { stealableProps } from '../../provider/store/game-state'
import { Box } from './box'

export const Boxes: React.FC = () => {
  const {
    state: { worldBoxes },
  } = useGameContext()

  return useMemo(() => {
    return (
      <>
        {worldBoxes.map((box: stealableProps) => (
          <Box key={box.id} {...box} />
        ))}
      </>
    )
  }, [worldBoxes])
}
