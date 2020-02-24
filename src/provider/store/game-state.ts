export interface boxProps {
  id: number
  position: number[]
}

export interface IGameState {
	worldBoxes: boxProps[]
	playerBoxes: boxProps[]
}
