import { createAction } from 'redux-actions';

const NAMESPACE = 'TRANSACTION'

export const SETUP_NEW_TRANSACTION = `${NAMESPACE}/SETUP_NEW_TRANSACTION`;
export const CHANGE_FORM_VALUE = `${NAMESPACE}/CHANGE_FORM_VALUE`;

export const setupNewTransaction = createAction(SETUP_NEW_TRANSACTION);
export const changeFormValue = createAction(CHANGE_FORM_VALUE, (field: string, value: any) => {
	return { field, value };
});