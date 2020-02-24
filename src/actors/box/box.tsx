import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { useCannon } from '../../useCannon'
import * as CANNON from 'cannon'

export const Box = ({ position, id }: any) => {
  // This reference will give us direct access to the mesh
  const ref = useCannon({ mass: 100 }, (body: any) => {
    const box = new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    body.addShape(box)

    body.addEventListener('collide', function(e: any) {
      console.log('I just got bumped!', id, position)
      console.log('Collided with body:', e.body)
      console.log('Contact between bodies:', e.contact)
    })
    body.position.set(...position)
  })

  return (
    <mesh ref={ref.ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
    </mesh>
  )
}
