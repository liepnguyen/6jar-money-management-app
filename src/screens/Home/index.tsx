import * as React from "react";
import { connect } from "react-redux";
import Home from "./components/Home";
import { createStructuredSelector } from 'reselect';
import { jarsSelector, jarReportSelector } from '../../shared/redux/selectors/jarSelectors';
import { SCREEN_NAMES, CVE_SCREEN_MODES } from '../../constants';

export interface Props {
	navigation: any,
	jars: Array<any>,
	jarReport: any,
	transactions: any,
}

export interface State { }

class HomeContainer extends React.PureComponent<Props, State> {
	handleAddTransactionButtonPressed = () => {
		const { navigation } = this.props;
		navigation.navigate(SCREEN_NAMES.CVE_TRANSACTION, { mode: CVE_SCREEN_MODES.NEW });
	}

	handleViewTransactionsButtonPressed = () => {
		const { navigation } = this.props;
		navigation.navigate(SCREEN_NAMES.VIEW_TRANSACTIONS);
	}

	handleMenuButtonPressed = () => {
		const { navigation } = this.props;
		navigation.navigate(SCREEN_NAMES.DRAWER_OPEN);
	}

	render() {
		const { jars, jarReport } = this.props;
		return <Home
			jars={jars}
			report={jarReport}
			onAddTransactionButtonPressed={this.handleAddTransactionButtonPressed}
			onViewTransactionsButtonPressed={this.handleViewTransactionsButtonPressed}
			onMenuButtonPressed={this.handleMenuButtonPressed}
		/>;
	}
}

const mapStateToProps = createStructuredSelector({
	jars: jarsSelector,
	jarReport: jarReportSelector,
});

export default connect(mapStateToProps)(HomeContainer);
