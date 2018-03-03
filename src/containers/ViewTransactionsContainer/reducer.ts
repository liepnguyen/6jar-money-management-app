import update from 'immutability-helper';
import { changeFilter } from './actions';

const initialState = {
	filter: {
		timeRange: {
			range: 'month',
			from: null,
			to: null,
		},
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case changeFilter.EXECUTE:
			const { timeRange } = action.payload;
			return update(state, { filter: { timeRange: { $merge: timeRange } } });
		default:
			return state;
	}
}
