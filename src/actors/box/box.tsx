import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { useCannon } from '../../useCannon'
import * as CANNON from 'cannon'

interface IBoxProps {
  position: CANNON.Vec3
  id: number
}

export const Box = ({ position, id }: IBoxProps) => {
  // This reference will give us direct access to the mesh
  const ref = useCannon({ mass: 100 }, (body: CANNON.Body) => {
    const box = new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    body.addShape(box)

    body.position.set(position.x, position.y, position.z)
  })

  return (
    <mesh ref={ref.ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
    </mesh>
  )
}
