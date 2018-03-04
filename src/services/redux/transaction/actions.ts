import { createAsyncAction } from '../../../utils/redux';

const NAMESPACE = 'TRANSACTION';

export const saveTransaction = createAsyncAction(NAMESPACE, 'SAVE_TRANSACTION');
export const deleteTransaction = createAsyncAction(NAMESPACE, 'DELETE_TRANSACTION');
