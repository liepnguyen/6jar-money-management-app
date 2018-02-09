import { createSelector } from 'reselect';
import { last } from 'lodash';
import { formatNumber } from '../../../../locales/i18n';
import { OP_KEY } from './constants';

export const screenStateSelector = (state) => { return state.screens.enterAmount; }

export const calculatorSelector = createSelector(
  screenStateSelector, (screenState) => {
    return screenState.calculator;
  }
);

export const displayTextSelector = createSelector(
  calculatorSelector, (calculator) => {
    return calculator.expressionParts.map((part) => {
      if (OP_KEY[part]) {
        return part;
      } else if (last(part) === '.') {
        return `${formatNumber(part.slice(0, -1))}.`;
      } else {
        return formatNumber(part);
      }
    }).join('');
  }
)

export const finalResultSelector = createSelector(
  calculatorSelector, (calculator) => {
    return calculator.hasFinalResult ? eval(calculator.expressionParts.join('')) : 0;
  }
)

export const hasFinalResultSelector = createSelector(
  calculatorSelector, (calculator) => {
    return calculator.hasFinalResult;
  }
)