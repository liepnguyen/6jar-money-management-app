import { merge } from 'lodash';
import { Transaction, State } from './types';
import { SAVE_TRANSACTION } from './actions';

const initialState: State = {
	rows: <Transaction[]>[],
	deleted: <string[]>[]
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SAVE_TRANSACTION: {
			const { payload: { transaction } } = action;
			return merge({}, state, { rows: [...state.rows, transaction] });
		}
		default:
			return state;
	}
}
