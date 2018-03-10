import { createAction } from '../../utils/redux';

const NAMESPACE = 'VIEW_TRANSACTIONS';

export const changeFilter = createAction(NAMESPACE, 'CHANGE_FILTER');
export const loadTransactionToViewOrEdit = createAction(NAMESPACE, 'LOAD_TRANSACTION_TO_VIEW_EDIT');