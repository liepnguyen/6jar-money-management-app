import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../containers/Home/reducer";
import addOrEditTransactionReducer from "../containers/AddOrEditTransaction/reducer";

export default combineReducers({
	form: formReducer,
	home: homeReducer,
	addOrEditTransaction: addOrEditTransactionReducer,
});
