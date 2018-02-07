import * as React from "react";
import { connect } from "react-redux";
import Home from "./components/Home";
import { createStructuredSelector } from 'reselect';
import { jarsSelector } from '../../services/redux/jar/selectors';

export interface Props {
	navigation: any;
	jars: Array<any>
}

export interface State {}

class HomeContainer extends React.PureComponent<Props, State> {

	render() {
		const { navigation, jars } = this.props;
		return <Home navigation={navigation} jars={jars} />;
	}
}

const mapStateToProps = createStructuredSelector({
	jars: jarsSelector,
});

export default connect(mapStateToProps)(HomeContainer);
