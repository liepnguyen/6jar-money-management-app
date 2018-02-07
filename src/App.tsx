import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import Login from "./containers/LoginContainer";
import Home from "./containers/HomeContainer";
import BlankPage from "./containers/BlankPageContainer";
import Sidebar from "./containers/SidebarContainer";
import AddOrEditTransaction from "./containers/AddOrEditTransactionContainer";
import ViewTransactions from "./containers/ViewTransactionsContainer";
import {
	SelectCategoryContainer,
	SelectJarContainer,
	EnterAmountContainer
} from "./containers/AddOrEditTransactionContainer/screens";

const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		drawerWidth: deviceWidth - 50,
		drawerPosition: "left",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = StackNavigator(
	{
		Login: { screen: Login },
		BlankPage: { screen: BlankPage },
		Drawer: { screen: Drawer },
		AddOrEditTransaction: { screen: AddOrEditTransaction },
		ViewTransactions: { screen: ViewTransactions },
		SelectCategory: { screen: SelectCategoryContainer },
		EnterAmount: { screen: EnterAmountContainer },
		SelectJar: { screen: SelectJarContainer }
	},
	{
		initialRouteName: "Login",
		headerMode: "none",
	}
);

export default () => (
	<Root>
		<App />
	</Root>
);
