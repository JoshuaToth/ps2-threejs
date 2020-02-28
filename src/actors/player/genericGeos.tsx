import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { useCannon, useGameContext } from '../../useCannon'
import * as CANNON from 'cannon'
import { IStealableProps, IStolenObject } from '../../provider/store/game-state'
import { TextGeometryParameters, FontLoader, Font, TextGeometry, Vector3, TextBufferGeometry, Geometry, BufferGeometry } from 'three';

export const GenericGeos: React.FC<IStolenObject> = props => {
  const {
    state: { playerBody, player: {mass} },
    dispatch,
  } = useGameContext()

  const ref = useRef()

  return useMemo(() => {
    return (
      <mesh ref={ref} args={[props.obj]} castShadow receiveShadow>
        <meshStandardMaterial
          attach="material"
          roughness={0.5}
          color="#575757"
        />
      </mesh>
    )
  }, [])
}
