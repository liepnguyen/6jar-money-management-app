import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import ViewTransactions from "./components/ViewTransactions";
import { tabsSelector, filterSelector } from './selectors';
import { changeFilter } from './actions';
import { SCREEN_NAMES, CVE_SCREEN_MODES } from '../../constants';

export interface Props {
	navigation: any;
	tabs: Array<any>;
	filter: any;
	changeFilter: (filter: any) => void;
}
export interface State {
}
class ViewTransactionsScreen extends React.PureComponent<Props, State> {
	handleAddNewTransaction = () => {
		const { navigation } = this.props;
		navigation.navigate(SCREEN_NAMES.CVE_TRANSACTION, { mode: CVE_SCREEN_MODES.NEW });
	}

	handleGoBack = () => {
		const { navigation } = this.props;
		navigation.goBack();
	}

	handleTransactionItemSelected = (transaction) => {
		const { navigation } = this.props;
		navigation.navigate(SCREEN_NAMES.CVE_TRANSACTION, { transaction, mode: CVE_SCREEN_MODES.VIEW });
	}

	render() {
		const { tabs, filter, changeFilter } = this.props;
		return (
			<ViewTransactions
				tabs={tabs}
				filter={filter}
				onFilterChanged={changeFilter}
				onAddNewTransactionButtonPressed={this.handleAddNewTransaction}
				onGoBack={this.handleGoBack}
				onTransactionItemSelected={this.handleTransactionItemSelected}
			/>
		)
	}
}

function bindAction(dispatch) {
	return {
		changeFilter: (filter) => { dispatch(changeFilter.start(filter)); }
	};
}

const mapStateToProps = createStructuredSelector({
	tabs: tabsSelector,
	filter: filterSelector,
});

export default connect(mapStateToProps, bindAction)(ViewTransactionsScreen);
