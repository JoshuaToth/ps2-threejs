import React, { useRef, useState, useMemo } from 'react'
import { useFrame, useThree, ReactThreeFiber } from 'react-three-fiber'
import { Mesh, Vector3 } from 'three'
import { useCannon } from '../../useCannon'
import { Box, Vec3 } from 'cannon';

export const Player = (props: any) => {
  // This reference will give us direct access to the mesh
  // const mesh: any = useRef()

  // Set up state for the hovered and active state
  const [position, setPosition] = useState({ x: 0, y: 0, z: -2 })

  const { camera } = useThree()

  const ref = useCannon({ mass: 1000 }, (body: any) => {
	  body.addShape(new Box(new Vec3(1, 1, 1)))
	  body.position.set(...camera.position.toArray())
	})

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() =>
    ref.body.position = new Vec3(camera.position.x, camera.position.y, ref.body.position.z)
    // setPosition()
  )

  return useMemo(() => {
    return (
      <mesh ref={ref.ref} {...props} position={props.position} castShadow receiveShadow>
      {/* <mesh ref={ref} {...props} position={new Vector3( position.x, position.y, position.z )} castShadow receiveShadow> */}
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={'hotpink'} />
      </mesh>
    )
  }, [position])
}
