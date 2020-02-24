import { IGameState } from '../game-state';
import { TGameReducerActions } from './game';
import { intialState } from '../init';
import gameReducers from '../reducers/game'
import playerReducers from '../reducers/player'
import { TPlayerReducerActions } from './player';

export type TReducers<T extends {type: string}> = (
	action: TReducerAction
) => Record<T['type'], (state: IGameState) => IGameState>

export type TReducerAction = 
TGameReducerActions
| TPlayerReducerActions

export const reducers = (
	state = intialState(),
	action: TReducerAction
): IGameState => {
	const actions = {
		...gameReducers(action),
		...playerReducers(action)
	}

	if (!(action.type in actions)) return state

	return actions[action.type](state)
}