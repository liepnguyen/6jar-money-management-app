import * as React from "react";
import { connect } from "react-redux";
import Home from "./components/Home";
import { createStructuredSelector } from 'reselect';
import { jarsSelector, jarReportSelector } from '../../services/redux/jar/selectors';

export interface Props {
	navigation: any;
	jars: Array<any>;
	report: any
}

export interface State {}

class HomeContainer extends React.PureComponent<Props, State> {

	render() {
		const { navigation, jars, jarReport } = this.props;
		return <Home navigation={navigation} jars={jars} report={jarReport} />;
	}
}

const mapStateToProps = createStructuredSelector({
	jars: jarsSelector,
	jarReport: jarReportSelector,
});

export default connect(mapStateToProps)(HomeContainer);
