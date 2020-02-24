import { Dispatch } from 'react';
import { TReducers, TReducerAction } from './index';
import { intialState } from '../init';
import { IGameState } from '../game-state';

import * as CANNON from 'cannon'

export type TInitGame = {
	type: 'GAME_RESET'
	dispatch: Dispatch<TReducerAction>
}

export type TSetPlayerBody = {
	type: 'GAME_SET_PLAYER'
	body: CANNON.Body
}

export type TGameReducerActions =
TInitGame
| TSetPlayerBody

type TGameReducers = TReducers<TGameReducerActions>

const reducers: TGameReducers = action  => ({
	GAME_RESET: state => {
		return intialState()
	},
	GAME_SET_PLAYER: (state: IGameState) => {
		const {body} = action as TSetPlayerBody
		return {
			...state,
			playerBody: body
		}
	}
})

export default reducers