import { Dispatch } from 'react'
import { TReducers, TReducerAction } from './index'
import { intialState } from '../init'
import { IGameState, stealableProps } from '../game-state'

import * as CANNON from 'cannon'

export type TCollidedWithPlayer = {
  type: 'PLAYER_COLLIDED'
  target: stealableProps
}

export type TPlayerReducerActions = TCollidedWithPlayer

type TPlayerReducers = TReducers<TPlayerReducerActions>

const reducers: TPlayerReducers = action => ({
  PLAYER_COLLIDED: (state: IGameState) => {
    const { target } = action as TCollidedWithPlayer
    if (target.size < state.player.mass) {
      const playerBoxes =
        state.playerBoxes.indexOf(target) >= 0
          ? state.playerBoxes
		  : state.playerBoxes.concat(target)

      return {
        ...state,
        worldBoxes: state.worldBoxes.filter(x => x.id !== target.id),
		playerBoxes,
		player: {
			...state.player,
			mass: playerBoxes.length + 1
		}
      }
    }
    return state
  },
})

export default reducers
