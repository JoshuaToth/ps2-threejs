import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { useCannon, useGameContext } from '../../useCannon'
import * as CANNON from 'cannon'
import { stealableProps } from '../../provider/store/game-state'
import { TextGeometryParameters, FontLoader, Font, TextGeometry, Vector3, TextBufferGeometry } from 'three'

export const Text: React.FC<stealableProps & { text: string}> = props => {
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
  
  const roboto = require('../../assets/roboto.json')
  const font: any = new Font(roboto)
  const config = useMemo(
    () => { 
      return({ font, size: 3, height: 0.5 })},
    [font]
  )
  
  const textGeo = new TextBufferGeometry(props.text, config)
  textGeo.computeBoundingBox()
  // textGeo.computeBoundingSphere()
  // This reference will give us direct access to the mesh
  const ref = useCannon({ mass: 1 }, (body: CANNON.Body) => {
    const size = textGeo.boundingBox.getSize(new Vector3())
    console.log(size)
    const box = new CANNON.Box(new CANNON.Vec3(size.x, size.y, size.z).scale(0.5))
    const offsets = [size.x * 0.5, size.y * 0.5, size.z * 0.5]
    body.addShape(box)

    textGeo.translate(-offsets[0], -offsets[1], -offsets[2])
    // const center = textGeo.boundingSphere.center
    // body.position.set(size.x + props.offset, size.y, size.z)
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
  return useMemo(() => {
    return (
      <mesh ref={ref.ref} args={[textGeo]} castShadow receiveShadow>
        <meshStandardMaterial
          attach="material"
          roughness={0.5}
          color="#575757"
        />
      </mesh>
    )
  }, [])
}
