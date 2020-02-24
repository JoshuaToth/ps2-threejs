import { Dispatch } from 'react';
import { TReducers, TReducerAction } from './index';

export type TInitGame = {
	type: 'GAME_INIT'
	dispatch: Dispatch<TReducerAction>
}

export type TGameReducerActions =
TInitGame

type TGameReducers = TReducers<TGameReducerActions>

const reducers: TGameReducers = action  => ({
	GAME_INIT: state => {
		return {
			worldBoxes: [
				{ id: 1, position: [1, 0, 1] },
				{ id: 2, position: [2, 1, 5] },
				{ id: 3, position: [0, 0, 6] },
				{ id: 4, position: [0, 0, 6] },
				{ id: 5, position: [-1, 1, 8] },
			  ],
			playerBoxes: []
		}
	}
})

export default reducers