import React, { useRef, useState } from 'react'
import { Vec3 } from 'cannon';
export const BoxGhost = ({ position }: {position: Vec3}) => {
  // This reference will give us direct access to the mesh
  const ref = useRef()

  return (
    <mesh ref={ref} castShadow receiveShadow position={[position.x, position.y, position.z]}>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
    </mesh>
  )
}
