import React, { useRef, useState, useMemo, useEffect } from 'react'

import { Text } from '../text/text'
import { Vec3 } from 'cannon'

const wordsToPrint = [
  'Joshua Toth',
  'Fullstack software developer',
  'Employee of the month',
  'Journeying to the ends of the earth to make cool tech',
]

export const Texts: React.FC<{ phrase: string; position: Vec3 }> = props => {
  return useMemo(() => {
    return (
      <>
        {wordsToPrint.map((phrase, index) => (
          <Text
            key={index + 'intro'}
            size={1}
            text={phrase}
            id={1}
            position={
              new Vec3(
                props.position.x,
                props.position.y + index * 5,
                props.position.z
              )
            }
          />
        ))}

        {/* {props.phrase.split(' ').map((word: string, index: number) => (
          <Text
            offset={index > 0 ? props.phrase[index - 1].length * 8 : 0}
            size={1}
            text={word}
            id={index}
            key={word + index}
            position={
              new Vec3(
                props.position.x + word.length,
                props.position.y,
                props.position.z
              )
            }
          />
        ))} */}
      </>
    )
  }, [])
}
