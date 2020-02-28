import { Dispatch } from 'react'
import { TReducers, TReducerAction } from './index'
import { intialState } from '../init'
import { IGameState, stealableProps } from '../game-state'

import { Vec3 } from 'cannon'

export type TCollidedWithPlayer = {
  type: 'PLAYER_COLLIDED'
  target: stealableProps
  relativePos: Vec3
}

export type TPlayerReducerActions = TCollidedWithPlayer

type TPlayerReducers = TReducers<TPlayerReducerActions>

const reducers: TPlayerReducers = action => ({
  PLAYER_COLLIDED: (state: IGameState) => {
    const { target, relativePos } = action as TCollidedWithPlayer
    const relativeSize = 1 + state.player.mass / 5
    if (target.size < state.player.mass) {
      const playerBoxes =
        state.playerBoxes.indexOf(target) >= 0
          ? state.playerBoxes
          : state.playerBoxes.concat({
              ...target,
              position: new Vec3(
                - relativePos.x * relativeSize,
                - relativePos.y * relativeSize,
                - relativePos.z * relativeSize
              ),
            })

      return {
        ...state,
        worldBoxes: state.worldBoxes.filter(x => x.id !== target.id),
        playerBoxes,
        player: {
          ...state.player,
          mass: playerBoxes.length + 1,
        },
      }
    }
    return state
  },
})

export default reducers
