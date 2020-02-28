import * as CANNON from 'cannon'
import { Geometry, BufferGeometry } from 'three';

export interface IStealableProps {
  id: number
  position: CANNON.Vec3
  size: number
}

export interface IStolenObject {
  obj: BufferGeometry
  position: CANNON.Vec3
}

export interface IGameState {
  worldBoxes: IStealableProps[]
  playerBoxes: IStealableProps[]
  playerObjects: IStolenObject[]
  playerBody?: CANNON.Body
  player: IPlayer
}

export interface IPlayer {
	mass: number
}