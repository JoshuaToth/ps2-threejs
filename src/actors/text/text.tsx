import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { useCannon, useGameContext } from '../../useCannon'
import * as CANNON from 'cannon'
import { IStealableProps } from '../../provider/store/game-state'
import { TextGeometryParameters, FontLoader, Font, TextGeometry, Vector3, TextBufferGeometry, Geometry, BufferGeometry } from 'three';

export const Text: React.FC<IStealableProps & { text: string}> = props => {
  const {
    state: { playerBody, player: {mass} },
    dispatch,
    world
  } = useGameContext()

  const [destroyed, setDestroyed] = useState(false)
  
  const roboto = require('../../assets/roboto.json')
  const font: any = new Font(roboto)
  const config = useMemo(
    () => { 
      return({ font, size: 1, height: 0.5 })},
    [font]
  )
  
  const textGeo = new TextBufferGeometry(props.text, config)
  textGeo.computeBoundingBox()

  const ref = useCannon({ mass: 1 }, (body: CANNON.Body) => {
    const size = textGeo.boundingBox.getSize(new Vector3())
    const box = new CANNON.Box(new CANNON.Vec3(size.x, size.y, size.z).scale(0.5))
    const offsets = [size.x * 0.5, size.y * 0.5, size.z * 0.5]
    body.addShape(box)

    textGeo.translate(-offsets[0], -offsets[1], -offsets[2])
    body.position.set(props.position.x, props.position.y, props.position.z)
  })

  const reportPlayer = (e: any, geo: BufferGeometry) => {
    dispatch({
      type: 'PLAYER_ADD_GEO',
      target: geo,
      relativePos: { ...e.body.quaternion },
    })
    setDestroyed(true)
    world?.remove(ref.body)
  }

  useEffect(() => {
    playerBody &&
      ref.body.addEventListener('collide', (e: any) => {
        playerBody &&
          setTimeout(function() {
            playerBody.id === e.body.id && mass > props.text.split(' ').length && reportPlayer(e, textGeo)
          }, 0)
      })
  }, [playerBody, mass])

  return useMemo(() => {
    return (
      destroyed ? null :
      <mesh ref={ref.ref} args={[textGeo]} castShadow receiveShadow>
        <meshStandardMaterial
          attach="material"
          roughness={0.5}
          color="#575757"
        />
      </mesh>
    )
  }, [destroyed])
}
