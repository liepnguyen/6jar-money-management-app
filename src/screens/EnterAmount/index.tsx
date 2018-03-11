import * as React from "react";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import EnterAmount from "./components/EnterAmount";
import { displayTextSelector, hasFinalResultSelector, finalResultSelector } from './selectors';
import { nofityButtonPress, initCalculator } from './actions';

export interface Props {
	navigation: any,
	displayText: string,
	notifyButtonPressEvent: Function,
	hasFinalResult: boolean;
	finalResult: number,
	onAmountEntered: Function,
	initCalculator: Function,
}
export interface State {}
class EnterAmountContainer extends React.PureComponent<Props, State> {

	componentWillMount() {
		const { navigation: { state: { params: { value } } } } = this.props;
		this.props.initCalculator({ value });
	}

	handleButtonPress = (buttonValue) => {
		this.props.notifyButtonPressEvent(buttonValue);
	}

	handleOkButtonPress = () => {
		const { navigation: { state: { params: { onAmountEntered } } }, finalResult, navigation } = this.props;
		onAmountEntered(finalResult);
		navigation.goBack();
	}

	render() {
		const { navigation, displayText, hasFinalResult } = this.props;
		return <EnterAmount
			navigation={navigation}
			displayText={displayText}
			onButtonPress={this.handleButtonPress}
			hasFinalResult={hasFinalResult}
			onOkButtonPress={this.handleOkButtonPress}			
		/>;
	}
}

const mapStateToProps = createStructuredSelector({
	displayText: displayTextSelector,
	hasFinalResult: hasFinalResultSelector,
	finalResult: finalResultSelector
});

function bindAction(dispatch) {
	return {
		notifyButtonPressEvent: (buttonValue) => { dispatch(nofityButtonPress(buttonValue)); },
		initCalculator: (initialValue) => { dispatch(initCalculator(initialValue)); },
	};
}

export default connect(mapStateToProps, bindAction)(EnterAmountContainer);