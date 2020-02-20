
import * as THREE from 'three'
import * as CANNON from 'cannon'
import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { useCannon, Provider } from '../../useCannon'

export const Plane = ({ position }: any) => {
	// Register plane as a physics body with zero mass
	const ref = useCannon({ mass: 0 }, (body: any) => {
	  body.addShape(new CANNON.Plane())
	  body.position.set(...position)
	})
	return (
	  <mesh ref={ref.ref} receiveShadow>
		<planeBufferGeometry attach="geometry" args={[1000, 1000]} />
		<meshStandardMaterial attach="material" color="#171717" />
	  </mesh>
	)
  }