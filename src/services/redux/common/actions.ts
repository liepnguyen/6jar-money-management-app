import { createAction } from '../../../utils/redux';

const NAMESPACE = 'COMMON';

export const enterIncome = createAction(NAMESPACE, 'ENTER_INCOME');
export const enterExpense = createAction(NAMESPACE, 'ENTER_EXPENSE');