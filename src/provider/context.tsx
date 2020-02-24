import React, { useReducer, Dispatch, createContext, useContext } from 'react'
import { IGameState } from './store/game-state';
import { TReducerAction, reducers } from './store/reducers'
import { intialState } from './store/init'

export type TGameDispatch = Dispatch<TReducerAction>

export interface IGameContextProvider {
	initState?: IGameState
}

export const GameContext = createContext<{
  state: IGameState
  dispatch: TGameDispatch
}>({ state: intialState(), dispatch: () => undefined })

export const GameContextProvider: React.FC<IGameContextProvider> = ({
  children,
  initState = intialState(),
}) => {
  const [state, dispatch] = useReducer(reducers, initState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)