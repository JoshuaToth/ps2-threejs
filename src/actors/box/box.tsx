import React, { useRef, useState, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import { useCannon } from '../../useCannon'
import * as CANNON from 'cannon'
import { useGameContext } from '../../provider/context'

interface IBoxProps {
  position: CANNON.Vec3
  id: number
}

export const Box = ({ position, id }: IBoxProps) => {
  const {
    state: { playerBody },
  } = useGameContext()

  const reportPlayer = (e: any) => {
    console.log('Collided with body:', e)
    console.log('Contact between bodies:', e.contact)
  }
  // This reference will give us direct access to the mesh
  const ref = useCannon({ mass: 100 }, (body: CANNON.Body) => {
    const box = new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    body.addShape(box)

    body.position.set(position.x, position.y, position.z)

    body.addEventListener('collide', function(e: any) {
      // console.log('I just got bumped!', id, position)
      // console.log(playerBody?.id, e.target.id)
      playerBody && playerBody.id === e.target.id && reportPlayer(e)
    })
  })

  return useMemo(() => {
    console.log('booody',playerBody)
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
  }, [playerBody])
}
