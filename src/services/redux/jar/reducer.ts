import { findIndex } from 'lodash';
import { ENTER_INCOME, ENTER_EXPENSE } from '../common/actions';
import update from 'immutability-helper';


const rows = [
  {
    "id": "5a8d201c347997c3ebe82664",
    "name": "necessity_account",
    "incomePercentage": 55,
    "available": 0
  },
  {
    "id": "5a8d201cf1ab7df523df80b5",
    "name": "play_account",
    "incomePercentage": 10,
    "available": 0
  },
  {
    "id": "5a8d201c8b0d49764567cbcf",
    "name": "financial_freedom_account",
    "incomePercentage": 10,
    "available": 0
  },
  {
    "id": "5a8d201cdd8d254bae4671f4",
    "name": "education_account",
    "incomePercentage": 10,
    "available": 0
  },
  {
    "id": "5a8d201c670b4bb707e2b714",
    "name": "longterm_saving_for_spending_account",
    "incomePercentage": 10,
    "available": 0
  },
  {
    "id": "5a8d201ce6a3761dff8a1f94",
    "name": "give_account",
    "incomePercentage": 5,
    "available": 0
  }
];

const initialState = {
	rows: rows,
	deleted: []
};

export default function(state = initialState, action) {
	switch (action.type) {
    case ENTER_INCOME: {
      const { payload: { income: { amount } } } = action;
      const rows = state.rows.map((r) => {
        const available = r.available + (amount * r.incomePercentage / 100);
        return {...r, available };
      });
      return update(state, { rows: { $set: rows } });
    }
    case ENTER_EXPENSE: {
      const { payload: { expense: { jarId, amount } } } = action;
      const index = findIndex(state.rows, (r) => { return r.id === jarId });
      if (index >= 0) {
        const jar = state.rows[index];
        const available = jar.available - amount;
        return update(state, { rows: { [index]: { available: { $set: available } } } });
      }
      return state;
    }
		default:
			return state;
	}
}
