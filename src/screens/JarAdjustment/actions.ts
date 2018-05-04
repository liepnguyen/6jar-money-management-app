import { createAsyncAction } from '../../utils/redux';

const NAMESPACE = 'JAR_ADJUSTMENT';

export const CHANGE_INCOME_PERCENTAGE = `${NAMESPACE}/CHANGE_INCOME_PERCENTAGE`;

export const changeIncomePercentage = createAsyncAction(NAMESPACE, CHANGE_INCOME_PERCENTAGE);