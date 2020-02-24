import { IGameState } from './game-state'

export const intialState = (): IGameState => ({
  worldBoxes: [
    { id: 1, position: [1, 0, 1] },
    { id: 2, position: [2, 1, 5] },
    { id: 3, position: [0, 0, 6] },
    { id: 4, position: [0, 0, 6] },
    { id: 5, position: [-1, 1, 8] },
  ],
  playerBoxes: [],
})
