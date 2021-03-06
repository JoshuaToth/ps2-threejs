import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { useCannon, useGameContext } from '../../useCannon'
import * as CANNON from 'cannon'
import { IStealableProps } from '../../provider/store/game-state'

export const Box: React.FC<IStealableProps & {size: number}> = props => {
  const {
    state: { playerBody },
    dispatch,
  } = useGameContext()

  const reportPlayer = (e: any) => {
    dispatch({ type: 'PLAYER_COLLIDED', target: props, relativePos: {...e.body.quaternion} })
  }
  // This reference will give us direct access to the mesh
  const ref = useCannon({ mass: 1 }, (body: CANNON.Body) => {
    const box = new CANNON.Box(new CANNON.Vec3(props.size, props.size, props.size))
    body.addShape(box)

    body.position.set(props.position.x, props.position.y, props.position.z)
  })

  useEffect(() => {
    playerBody &&
      ref.body.addEventListener('collide', (e: any) => {
        playerBody &&
          setTimeout(function() {
            playerBody.id === e.body.id && reportPlayer(e)
          }, 0)
      })
  }, [playerBody])

  return useMemo(() => {
    return (
      <mesh ref={ref.ref} castShadow receiveShadow>
        <boxGeometry attach="geometry" args={[2, 2, 2]} />
        <meshStandardMaterial
          attach="material"
          roughness={0.5}
          color="#575757"
        />
      </mesh>
    )
  }, [])
}
