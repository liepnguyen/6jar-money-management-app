import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import JarAdjustment from './components/JarAdjustment';
import { jarsSelector } from '../../shared/redux/selectors/jarSelectors';
import { changeIncomePercentage } from './actions';

export interface Props {
  jars: Array<any>;
  changeIncomePercentage: (jarId: string, newIncomePercentage: number) => void;
}
export interface State {
}
class JarAdjustmentScreen extends React.PureComponent<Props, State> {
  handleJarIncomePercentageChanged = (jarId: string, newIncomePercentage: number) => {
    this.props.changeIncomePercentage(jarId, newIncomePercentage);
  }

  render() {
    const { jars } = this.props;
    return (
      <JarAdjustment
        jars={jars}
        onJarIncomePercentageChanged={this.handleJarIncomePercentageChanged}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  jars: jarsSelector,
});

function bindAction(dispatch) {
	return {
		changeIncomePercentage: (jarId: string, newIncomePercentage: number) => { dispatch(changeIncomePercentage.start({ jarId, newIncomePercentage })); },
	};
}

export default connect(mapStateToProps, bindAction)(JarAdjustmentScreen);