
import { createAsyncAction, createAction } from '../../utils/redux';

const NAMESPACE = 'TRANSACTION';

export const SETUP_NEW_TRANSACTION = `${NAMESPACE}/SETUP_NEW_TRANSACTION`;
export const CHANGE_FORM_VALUE = `${NAMESPACE}/CHANGE_FORM_VALUE`;

export const setupNewTransaction = createAction(NAMESPACE, 'SETUP_NEW_TRANSACTION');
export const changeFormValue = createAction(NAMESPACE, 'CHANGE_FORM_VALUE');
export const saveTransaction = createAsyncAction(NAMESPACE, 'SAVE_TRANSACTION');
export const deleteTransactionAsync = createAsyncAction(NAMESPACE, 'DELETE_TRANSACTION');
export const loadTransactionAsync = createAction(NAMESPACE, 'LOAD_TRANSACTION_TO_STATE');