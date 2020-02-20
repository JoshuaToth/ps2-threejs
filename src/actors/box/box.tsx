import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { useCannon } from '../../useCannon'
import * as CANNON from 'cannon'

export const Box = ({ position }: any) => {
  // This reference will give us direct access to the mesh
  const ref = useCannon({ mass: 100 }, (body: any) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
    body.position.set(...position)
  })
  
  return (
    <mesh ref={ref.ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
    </mesh>
  )
}
