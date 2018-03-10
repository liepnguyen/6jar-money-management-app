import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/Home/reducer";
import cveTransactionReducer from "../screens/CVETransaction/reducer";
import viewTransactionsReducer from "../screens/ViewTransactions/reducer";
import cveCategoryReducer from "../screens/CVECategory/reducer";
import enterAmountReducer from '../screens/CVETransaction/screens/EnterAmount/reducer';
import realmReducer from '../utils/realm/redux/reducer';

export default combineReducers({
	realm: realmReducer,
	form: formReducer,
	screens: combineReducers({
		home: homeReducer,
		cveTransaction: cveTransactionReducer,
		enterAmount: enterAmountReducer,
		viewTransactions: viewTransactionsReducer,
		cveCategory: cveCategoryReducer,
	}),
});
