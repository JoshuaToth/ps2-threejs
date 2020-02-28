import { Dispatch } from 'react'
import { TReducers, TReducerAction } from './index'
import { intialState } from '../init'
import { IGameState, IStealableProps, IStolenObject } from '../game-state';

import { Vec3 } from 'cannon'
import { Geometry, BufferGeometry } from 'three'

export type TCollidedWithPlayer = {
  type: 'PLAYER_COLLIDED'
  target: IStealableProps
  relativePos: Vec3
}

export type TAddPlayerGeometry = {
  type: 'PLAYER_ADD_GEO'
  target: BufferGeometry
  relativePos: Vec3
}

export type TPlayerReducerActions = TCollidedWithPlayer | TAddPlayerGeometry

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
                -relativePos.x * relativeSize,
                -relativePos.y * relativeSize,
                -relativePos.z * relativeSize
              ),
            })

      return {
        ...state,
        worldBoxes: state.worldBoxes.filter(x => x.id !== target.id),
        playerBoxes,
        player: {
          ...state.player,
          mass: playerBoxes.length + 2,
        },
      }
    }
    return state
  },
  PLAYER_ADD_GEO: (state: IGameState) => {
    const { target, relativePos } = action as TAddPlayerGeometry
    const relativeSize = 1 + state.player.mass / 5
    
    const playerObjects =
      state.playerObjects.indexOf({obj: target, position: relativePos}) >= 0
        ? state.playerObjects
        : state.playerObjects.concat({
            obj: target,
            position: new Vec3(
              -relativePos.x * relativeSize,
              -relativePos.y * relativeSize,
              -relativePos.z * relativeSize
            ),
          })

    return {
      ...state,
      worldBoxes: state.worldBoxes.filter(x => x.id !== target.id),
      playerObjects,
      player: {
        ...state.player,
        mass: playerObjects.length + 2,
      },
    }
  },
})

export default reducers
