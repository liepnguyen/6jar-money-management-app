import * as React from "react";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import SelectJar from "./components/SelectJar";
import { jarsSelector } from '../../../../services/redux/jar/selectors';

export interface Props {
	navigation: any,
	onJarSelected: Function,
	jars: Array<any>,
}

export interface State {}

class SelectJarContainer extends React.PureComponent<Props, State> {
	componentWillMount() {
		this.props = {
      ...this.props,
      ...this.props.navigation.state.params
    }
	}

	handleCategorySelected = (selectedCategory) => {
		const { onJarSelected } = this.props;
		onJarSelected(selectedCategory);
	}

	render() {
		const { navigation, jars } = this.props;
		return <SelectJar
			navigation={navigation}
			onJarSelected={this.handleCategorySelected}
			jars={jars}
		/>;
	}
}

const mapStateToProps = createStructuredSelector({
	jars: jarsSelector,
});

export default connect(mapStateToProps)(SelectJarContainer);
