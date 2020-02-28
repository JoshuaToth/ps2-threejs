import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useCannon, useGameContext } from '../../useCannon'
import { stealableProps } from '../../provider/store/game-state'

import { Text } from '../text/text'
import { Vec3 } from 'cannon'

export const Texts: React.FC<{phrase:string, position: Vec3}> = props => {

  return useMemo(() => {
    return (
      <>
        {props.phrase.split(' ').map((word: string, index: number) => (
          <Text size={1} text={word} id={index} key={word + index} position={new Vec3(props.position.x + word.length, props.position.y, props.position.z)} />
        ))}
      </>
    )
  }, [])
}
