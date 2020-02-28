import { IGameState } from './game-state'
import * as CANNON from 'cannon'

export const intialState = (): IGameState => ({
  worldBoxes: [
    { id: 1, position: new CANNON.Vec3(5, 0, 1), size: 1 },
    { id: 2, position: new CANNON.Vec3(2, -5, 5), size: 1 },
    { id: 3, position: new CANNON.Vec3(3, 5, 6), size: 1 },
    { id: 4, position: new CANNON.Vec3(4, 0, 6), size: 1 },
    { id: 5, position: new CANNON.Vec3(-5, 1, 8), size: 1 },
    { id: 6, position: new CANNON.Vec3(-8, 1, 8), size: 1 },
    { id: 7, position: new CANNON.Vec3(-12, 1, 8), size: 1 },
    { id: 8, position: new CANNON.Vec3(-5, 11, 8), size: 1 },
    { id: 9, position: new CANNON.Vec3(-5, 17, 8), size: 1 },
    { id: 10, position: new CANNON.Vec3(-5, 25, 8), size: 1 },
    { id: 11, position: new CANNON.Vec3(20, 40, 8), size: 1 },
    { id: 12, position: new CANNON.Vec3(-5, 35, 8), size: 1 },
  ],
  playerBoxes: [],
  player: {
	  mass: 4
  },
  playerObjects: []
})
