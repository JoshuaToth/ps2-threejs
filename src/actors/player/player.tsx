import React, { useRef, useState, useMemo } from 'react'
import { useFrame, useThree, ReactThreeFiber } from 'react-three-fiber'
import { Mesh, Vector3 } from 'three'

export const Player = (props: any) => {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef()

  // Set up state for the hovered and active state
  const [position, setPosition] = useState({ x: 0, y: 0, z: -2 })

  const { camera } = useThree()
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() =>
    setPosition({ x: camera.position.x, y: camera.position.y, z: -2 })
  )

  return useMemo(() => {
    console.log(position)
    return (
      <mesh {...props} position={new Vector3( position.x, position.y, position.z )} ref={mesh}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={'hotpink'} />
      </mesh>
    )
  }, [position])
}
