import { Dispatch } from 'react';
import { TReducers, TReducerAction } from './index';
import { intialState } from '../init';

export type TInitGame = {
	type: 'GAME_RESET'
	dispatch: Dispatch<TReducerAction>
}

export type TGameReducerActions =
TInitGame

type TGameReducers = TReducers<TGameReducerActions>

const reducers: TGameReducers = action  => ({
	GAME_RESET: state => {
		return intialState()
	}
})

export default reducers