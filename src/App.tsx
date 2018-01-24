import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import Login from "./containers/Login";
import Home from "./containers/Home";
import BlankPage from "./containers/BlankPage";
import Sidebar from "./containers/Sidebar";
import AddOrEditTransaction from "./containers/AddOrEditTransaction";
import SelectCategory from "./containers/SelectCategory";
import EnterAmount from "./containers/EnterAmount";

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
		SelectCategory: { screen: SelectCategory },
		EnterAmount: { screen: EnterAmount },
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
