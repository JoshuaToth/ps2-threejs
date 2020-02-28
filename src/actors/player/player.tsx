import React, { useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { useCannon, useGameContext } from '../../useCannon'
import { Vec3, Sphere } from 'cannon'
import { BoxGhost } from '../box/boxGhost'
import { IStealableProps } from '../../provider/store/game-state'

export const Player: React.FC<{ position: number[] }> = (props: any) => {
  const {
    state: { playerBoxes, player, playerObjects },
    dispatch,
  } = useGameContext()

  const [controlDirections, setControlDirections] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  })

  document.addEventListener('keydown', event => {
    const directions = controlDirections
    switch (event.key) {
      case 'w':
        directions.up = true
        return
      case 's':
        directions.down = true
        return
      case 'a':
        directions.left = true
        return
      case 'd':
        directions.right = true
        return
      case 'space':
        directions.right = true
        return
    }
    setControlDirections(directions)
  })

  document.addEventListener('keyup', event => {
    const directions = controlDirections
    switch (event.key) {
      case 'w':
        directions.up = false
        break
      case 's':
        directions.down = false
        break
      case 'a':
        directions.left = false
        break
      case 'd':
        directions.right = false
        break
    }
    setControlDirections(directions)
  })

  const { camera } = useThree()

  const ref = useCannon({ mass: 10 }, (body: CANNON.Body) => {
    body.addShape(new Sphere(1))
    body.position.set(0, 0, 0)
    body.linearDamping = body.angularDamping = 0.8

    dispatch({ type: 'GAME_SET_PLAYER', body })
  })

  useEffect(() => {
    ;(ref.body.shapes[0] as Sphere).radius = 1 + player.mass / 8
    ;(ref.body.shapes[0] as Sphere).boundingSphereRadius = 1 + player.mass / 8
    ref.body.updateBoundingRadius()
    ref.body.updateMassProperties()
  }, [player.mass])

  useEffect(() => {
    console.log(playerObjects)
  }, [playerObjects])

  useFrame(() => {
    let x = 0
    let y = 0

    x = controlDirections.left ? x - 1 : x
    x = controlDirections.right ? x + 1 : x

    y = controlDirections.up ? y + 1 : y
    y = controlDirections.down ? y - 1 : y

    ref.body.applyImpulse(
      new Vec3(x, y, 0),
      new Vec3(0, 0, 10)
    )
    camera.position.set(
      ref.body.position.x,
      ref.body.position.y - 25,
      20 + player.mass / 4
    )

    camera.lookAt(ref.body.position.x, ref.body.position.y, ref.body.position.z)
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
        <sphereBufferGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          roughness={0.9}
          attach="material"
          color={'hotpink'}
        />
        {playerBoxes.map((box: IStealableProps) => (
          <BoxGhost key={box.id} position={box.position} />
        ))}
      </mesh>
    ),
    [playerBoxes, playerObjects]
  )
}
