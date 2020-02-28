import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { useCannon, useGameContext } from '../../useCannon'
import * as CANNON from 'cannon'
import { stealableProps } from '../../provider/store/game-state'
import { TextGeometryParameters, FontLoader, Font } from 'three'

export const Text: React.FC<stealableProps & { text: string }> = props => {
  const {
    state: { playerBody },
    dispatch,
  } = useGameContext()

  const reportPlayer = (e: any) => {
    console.log(e)
    dispatch({
      type: 'PLAYER_COLLIDED',
      target: props,
      relativePos: { ...e.body.quaternion },
    })
  }
  // This reference will give us direct access to the mesh
  const ref = useCannon({ mass: 100 }, (body: CANNON.Body) => {
    body
    const box = new CANNON.Box(new CANNON.Vec3(props.text.length, 1, 1))
    body.addShape(box)

    body.position.set(props.position.x, props.position.y, props.position.z)
  })

  // useEffect(() => {
  //   playerBody &&
  //     ref.body.addEventListener('collide', (e: any) => {
  //       playerBody &&
  //         setTimeout(function() {
  //           playerBody.id === e.body.id && reportPlayer(e)
  //         }, 0)
  //     })
  // }, [playerBody])
  
  const roboto = require('../../assets/roboto.json')
  const font: any = new Font(roboto)
  const config = useMemo(
    () => { 
      return({ font, size: props.text.length, height: 0.5 })},
    [font]
  )
  return useMemo(() => {
    return (
      <mesh ref={ref.ref} castShadow receiveShadow>
        <textGeometry
          attach="geometry"
          args={[
            props.text,
            config
          ]}
        />
        <meshStandardMaterial
          attach="material"
          roughness={0.5}
          color="#575757"
        />
      </mesh>
    )
  }, [])
}
