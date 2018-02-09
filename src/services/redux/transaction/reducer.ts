import moment from 'moment';
import update from 'immutability-helper';
import { SAVE_TRANSACTION } from './actions';

const initialState = {
	rows: [],
	deleted: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SAVE_TRANSACTION: {
			const { payload: { transaction } } = action;
			const now = moment().valueOf();
			return update(state, { rows: { $push: [{ ...transaction, createdDateTime: now }] } });
		}
		default:
			return state;
	}
}
