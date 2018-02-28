import update from 'immutability-helper';
import { fromPairs } from 'lodash';
import { COLLECTION_CHANGED, INIT } from './actions';

const initialState = {
	collections: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case INIT:
			const { schemaNames = [] } = action.payload;
			const collections = fromPairs(schemaNames.map((sn) => [sn, { dummyState: {} }]));
			return update(state, { collections: { $set: collections } });
		case COLLECTION_CHANGED:
			const { schemaName, lastChangedTime } = action.payload;
			return update(state, {
				collections: {
					[schemaName]: {
						dummyState: { $set: {} },
						lastChangedTime: { $set: lastChangedTime }
					}
				}
			});
		default:
			return state;
	}
}