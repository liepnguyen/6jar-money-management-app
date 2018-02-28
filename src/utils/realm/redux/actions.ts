import { createAction } from 'redux-actions';

const NAMESPACE = '@REALM'

export const COLLECTION_CHANGED = `${NAMESPACE}/COLLECTION_CHANGED`;
export const INIT = `${NAMESPACE}/INIT`;

export const collectionChangedAction = createAction(COLLECTION_CHANGED, (payload: any) => {
	return payload;
});

export const initAction = createAction(INIT);
