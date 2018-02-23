import { createAction } from 'redux-actions';

const NAMESPACE = 'COMMON'

export const ENTER_INCOME = `${NAMESPACE}/ENTER_INCOME`;
export const ENTER_EXPENSE = `${NAMESPACE}/ENTER_EXPENSE`;

export const enterIncomeAction = createAction(ENTER_INCOME, (income: any) => {
	return { income };
});

export const entereExpenseAction = createAction(ENTER_EXPENSE, (expense: any) => {
	return { expense };
});