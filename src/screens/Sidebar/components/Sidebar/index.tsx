import * as React from "react";
import { Text, Container, List, ListItem, Content, Icon } from "native-base";
import { NavigationActions } from "react-navigation";

const routes = [
	{
		route: "Home",
		caption: "Dashboard",
		icon: "md-apps"
	},
	{
		route: "ViewTransactions",
		caption: "Transactions",
		icon: "md-list"
	},
	{
		route: "Categories",
		caption: "Categories",
		icon: "md-cube"
	},
	{
		route: "Statistics",
		caption: "Statistics",
		icon: "md-stats"
	},
	{
		route: "Settings",
		caption: "Settings",
		icon: "md-settings"
	},
	{
		route: "HelpAndAbout",
		caption: "Help & About",
		icon: "md-help"
	},
];

export interface Props {
	navigation: any;
}
export interface State { }
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});
export default class Sidebar extends React.PureComponent<Props, State> {
	render() {
		return (
			<Container>
				<Content>
					<List
						style={{ marginTop: 40 }}
						dataArray={routes}
						renderRow={data => {
							return (
								<ListItem
									button
									onPress={() => {
										data.route === "Login"
											? this.props.navigation.dispatch(resetAction)
											: this.props.navigation.navigate(data.route);
									}}
								>
									<Icon
										active
										name={data.icon}
										style={{ color: "#777", fontSize: 26, width: 30 }}
									/>
									<Text>{data.caption}</Text>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}
