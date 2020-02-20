import React, { useRef, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'

export const Camera = () => {
  // This reference will give us direct access to the mesh

  const directions = {
    up: false,
    down: false,
    left: false,
    right: false,
  }

  document.addEventListener('keydown', event => {
    switch (event.key) {
      // case 'w':
      //   directions.up = true
      //   return;
      // case 's':
      //   directions.down = true
      //   return;
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
      // case 'w':
      //   directions.up = false
      //   break;
      // case 's':
      //   directions.down = false
      //   break;
      case 'a':
        directions.left = false
        break;
      case 'd':
        directions.right = false
        break;
    }
  })
  
  const { camera } = useThree()

  useFrame(() => {
    let x = camera.position.x
    let y = camera.position.y

    x = directions.left ? x - 0.13 : x
    x = directions.right ? x + 0.13 : x

    y = directions.up ? y + 0.1 : y
    y = directions.down ? y - 0.1 : y

    camera.position.set(x, y + 0.02, 20)
  
  })
  return <></>
}
