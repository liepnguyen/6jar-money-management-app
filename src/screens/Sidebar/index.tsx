import * as React from "react";
import Sidebar from "./components/Sidebar";
export interface Props {
	navigation: any;
}
export interface State {}
export default class SidebarContainer extends React.PureComponent<Props, State> {
	render() {
		return <Sidebar navigation={this.props.navigation} />;
	}
}
