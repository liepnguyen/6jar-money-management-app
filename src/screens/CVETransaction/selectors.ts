import { createSelector } from 'reselect';
import { categoriesSelector } from '../../shared/redux/selectors/categorySelectors';

export const screenStateSelector = (state) => { return state.screens.cveTransaction; }

export const transactionSelector = createSelector(
  screenStateSelector, categoriesSelector, (screenState) => {
    return screenState.transaction;
  }
);

