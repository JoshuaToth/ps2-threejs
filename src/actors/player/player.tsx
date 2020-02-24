import React, { useRef, useState, useMemo } from 'react'
import { useFrame, useThree, ReactThreeFiber, useLoader } from 'react-three-fiber'
import { Mesh, Vector3, RepeatWrapping, TextureLoader } from 'three'
import { useCannon } from '../../useCannon'
import { Box, Vec3, Sphere } from 'cannon';
import { BoxGhost } from '../box/boxGhost';
import { boxProps } from '../../provider/store/game-state';

export const Player = (props: any) => {
  // This reference will give us direct access to the mesh
  // const mesh: any = useRef()

  const { camera } = useThree()

  const ref = useCannon({ mass: 1000 }, (body: any) => {
	  body.addShape(new Sphere(1))
	  body.position.set(...camera.position.toArray())
  })

  // const texture = new TextureLoader().load('../../textures/blue.jpg')
  //  if (texture) {
  //     texture.wrapS = texture.wrapT = RepeatWrapping;
  //     texture.repeat.set(1500, 1500);
  //     texture.anisotropy = 16;
  // }

  useFrame(() =>
    ref.body.position = new Vec3(camera.position.x, camera.position.y, ref.body.position.z)
  )

  return (
    <mesh ref={ref.ref} {...props} position={props.position} castShadow receiveShadow>
    {/* <mesh ref={ref} {...props} position={new Vector3( position.x, position.y, position.z )} castShadow receiveShadow> */}
      <sphereBufferGeometry attach="geometry" args={[1, 8, 8]} />
      <meshStandardMaterial roughness={0.5} attach="material" color={'hotpink'} />
      {
        props.boxes.map((box: boxProps) => (
          <BoxGhost key={box.id} position={box.position} />
        ))
      }
    </mesh>
  )
}
