import React, { useRef, useState } from 'react'
export const BoxGhost = ({ position, id }: any) => {
  // This reference will give us direct access to the mesh
  const ref = useRef()

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
    </mesh>
  )
}
