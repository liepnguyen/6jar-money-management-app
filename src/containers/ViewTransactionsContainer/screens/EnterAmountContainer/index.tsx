import * as React from "react";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import EnterAmount from "./components/EnterAmount";
import { displayTextSelector } from './selectors';
import { nofityButtonPress } from './actions';

export interface Props {
	navigation: any,
	displayText: string,
	notifyButtonPressEvent: Function,
}
export interface State {}
class EnterAmountContainer extends React.Component<Props, State> {
	handleButtonPress = (buttonType) => {
		this.props.notifyButtonPressEvent(buttonType);
	}

	render() {
		const { navigation, displayText } = this.props;
		return <EnterAmount
			navigation={this.props.navigation}
			displayText={displayText}
			onButtonPress={this.handleButtonPress}
		/>;
	}
}

const mapStateToProps = createStructuredSelector({
	displayText: displayTextSelector
});

function bindAction(dispatch) {
	return {
		notifyButtonPressEvent: (buttonType) => { dispatch(nofityButtonPress(buttonType)); },
	};
}

export default connect(mapStateToProps, bindAction)(EnterAmountContainer);