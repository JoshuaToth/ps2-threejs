import { IGameState } from '../game-state';
import { TGameReducerActions } from './game';
import { intialState } from '../init';
import gameReducers from '../reducers/game'

export type TReducers<T extends {type: string}> = (
	action: TReducerAction
) => Record<T['type'], (state: IGameState) => IGameState>

export type TReducerAction = 
TGameReducerActions

export const reducers = (
	state = intialState(),
	action: TReducerAction
): IGameState => {
	const actions = {
		...gameReducers(action)
	}
	console.log('called')
	if (!(action.type in actions)) return state

	return actions[action.type](state)
}