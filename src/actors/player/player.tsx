import React, { useRef, useState, useMemo } from 'react'
import {
  useFrame,
  useThree,
  ReactThreeFiber,
  useLoader,
} from 'react-three-fiber'
import { Mesh, Vector3, RepeatWrapping, TextureLoader } from 'three'
import { useCannon } from '../../useCannon'
import { Box, Vec3, Sphere } from 'cannon'
import { BoxGhost } from '../box/boxGhost'
import { stealableProps } from '../../provider/store/game-state'

export const Player = (props: any) => {

  const directions = {
    up: false,
    down: false,
    left: false,
    right: false,
  }

  document.addEventListener('keydown', event => {
    switch (event.key) {
      case 'w':
        directions.up = true
        return;
      case 's':
        directions.down = true
        return;
      case 'a':
        directions.left = true
        return;
      case 'd':
        directions.right = true
        return;
    }
  })

  document.addEventListener('keyup', event => {

    switch (event.key) {
      case 'w':
        directions.up = false
        break;
      case 's':
        directions.down = false
        break;
      case 'a':
        directions.left = false
        break;
      case 'd':
        directions.right = false
        break;
    }
  })

  const { camera } = useThree()

  const ref = useCannon({ mass: 1000 }, (body: CANNON.Body) => {
    body.addShape(new Sphere(1))
    body.position.set(0, 0, 0)
    body.linearDamping = body.angularDamping = 0.5
    body.addEventListener('collide', function(e: any) {
      // console.log('I just got bumped!', id, position)
      console.log('Collided with body:', e)
      console.log('Contact between bodies:', e.contact)
    })
  })

  useFrame(callbackState => {
    let x = 0
    let y = 0

    x = directions.left ? x - 300 : x
    x = directions.right ? x + 300 : x

    y = directions.up ? y + 300 : y
    y = directions.down ? y - 300 : y

    ref.body.applyImpulse(new Vec3(x, y, 0), new Vec3(0,0,1))
    camera.position.set(ref.body.position.x, ref.body.position.y, 20)

  })

  return useMemo(
    () => (
      <mesh
        ref={ref.ref}
        {...props}
        position={props.position}
        castShadow
        receiveShadow
      >
        {/* <mesh ref={ref} {...props} position={new Vector3( position.x, position.y, position.z )} castShadow receiveShadow> */}
        <sphereBufferGeometry attach="geometry" args={[1, 8, 8]} />
        <meshStandardMaterial
          roughness={0.5}
          attach="material"
          color={'hotpink'}
        />
        {props.boxes.map((box: stealableProps) => (
          <BoxGhost key={box.id} position={box.position} />
        ))}
      </mesh>
    ),
    []
  )
}