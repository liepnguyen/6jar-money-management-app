import { createSelector } from 'reselect';
import { last, includes } from 'lodash';
import { formatNumber } from '../../locales/i18n';
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
      } else if (includes(part, '.')) {
        const integer = part.slice(0, part.indexOf('.'));
        const decimal = part.slice(part.indexOf('.') + 1);
        return `${formatNumber(integer)}.${decimal}`;
      } else {
        return formatNumber(part);
      }
    }).join('');
  }
)

export const finalResultSelector = createSelector(
  calculatorSelector, (calculator) => {
    return calculator.hasFinalResult ? eval(
      calculator.expressionParts
        .map((p) => { return OP_KEY[p] ? p : `${+p}` })
        .join('')
    ) : 0;
  }
)

export const hasFinalResultSelector = createSelector(
  calculatorSelector, (calculator) => {
    return calculator.hasFinalResult;
  }
)