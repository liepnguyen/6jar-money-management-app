import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import ViewTransactions from "./components/ViewTransactions";
import { filterSelector, filteredTransactionByDateSelector } from './selectors';

export interface Props {
	navigation: any;
	transactionFilter: any
	transactionsByDate: any
}
export interface State {}
class ViewTransactionsContainer extends React.PureComponent<Props, State> {
	
	render() {
		const { transactionFilter, transactionsByDate } = this.props;
		return <ViewTransactions
			navigation={this.props.navigation}
			filter={transactionFilter}
			transactionsByDate={transactionsByDate}
		/>;
	}
}

function bindAction(dispatch) {
	return {
	};
}

const mapStateToProps = createStructuredSelector({
	transactionFilter: filterSelector,
	transactionsByDate: filteredTransactionByDateSelector,
});
export default connect(mapStateToProps, bindAction)(ViewTransactionsContainer);
