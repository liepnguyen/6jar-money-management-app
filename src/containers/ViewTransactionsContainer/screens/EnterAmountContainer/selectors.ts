import { createSelector } from 'reselect';

export const screenStateSelector = (state) => { return state.screens.enterAmount; }

export const calculatorSelector = createSelector(
  screenStateSelector, (screenState) => {
    return screenState.calculator;
  }
);

export const displayTextSelector = createSelector(
  calculatorSelector, (calculator) => {
    return calculator.displayText;
  }
)