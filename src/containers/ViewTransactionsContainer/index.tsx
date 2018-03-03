import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import ViewTransactions from "./components/ViewTransactions";
import { tabsSelector, filterSelector } from './selectors';
import { loadTransactionToViewOrEdit, changeFilter } from './actions';

function bindAction(dispatch) {
	return {
		loadTransactionToViewOrEdit: (transaction) => { dispatch(loadTransactionToViewOrEdit.execute(transaction)); },
		changeFilter: (filter) => { dispatch(changeFilter.execute(filter)); }
	};
}

const mapStateToProps = createStructuredSelector({
	tabs: tabsSelector,
	filter: filterSelector,
});

export default connect(mapStateToProps, bindAction)(ViewTransactions);
