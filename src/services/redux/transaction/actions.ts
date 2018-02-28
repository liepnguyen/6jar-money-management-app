import { createAsyncAction } from '../../../utils/redux';

const NAMESPACE = 'TRANSACTION';

export const saveTransaction = createAsyncAction(NAMESPACE, 'SAVE_TRANSACTION');
