import * as CANNON from 'cannon'

export interface stealableProps {
  id: number
  position: CANNON.Vec3
  size: number
}

export interface IGameState {
  worldBoxes: stealableProps[]
  playerBoxes: stealableProps[]
}
